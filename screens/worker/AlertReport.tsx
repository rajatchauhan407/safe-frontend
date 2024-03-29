import React, { useState, useEffect, useRef } from "react";
import {
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  CircleIcon,
  FormControl,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  Textarea,
  TextareaInput,
  ScrollView,
  Button,
  Box,
} from "@gluestack-ui/themed";
import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import Typography from "../../components/common/typography";
import CommonButton from "../../components/common/button";
import FallIcon from "../../assets/icons/fall";
import FireHazardIcon from "../../assets/icons/fireHazard";
import ElectricIcon from "../../assets/icons/electric";
import InjuredIcon from "../../assets/icons/injured";
import SpaceIcon from "../../assets/icons/space";
import DangerIcon from "../../assets/icons/danger";
import ScreenLayout from "../../components/layout/screenLayout";
import { BACKEND_BASE_URL, LOCAL_BASE_URL } from "../../config/api";
import useFetch from "../../hooks/useFetch";
import { Camera, CameraType } from "expo-camera";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import * as FileSystem from 'expo-file-system';
import useRequest from "../../hooks/useRequest";

interface EmergencyItem {
  text: string;
  icon: React.FC<any>;
}

const AlertReport: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [reportingFor, setReportingFor] = useState<"Myself" | "OtherWorker">(
    "Myself"
  );
  const [numWorkersInjured, setNumWorkersInjured] = useState(0);
  const [reportType, setReportType] = useState<string | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState(2);
  const [needAssistance, setNeedAssistance] = useState<
    "true" | "false" | undefined
  >(undefined);
  const [showAssistanceForm, setShowAssistanceForm] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [emergencyText, setEmergencyText] = useState("");
  const [photo, setPhoto] = useState<any>("");

  const { data, isLoading, error, fetchData } = useRequest(
    `${LOCAL_BASE_URL}/alert`,
    "POST"
  );
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log('user>>', user);
  /*** send alert for the app ****/
  const sendAlert = async () => {
    // console.log("Sending alert");
    // console.log("Reporting for:", reportingFor);
    // console.log("Number of workers injured:", numWorkersInjured);
    // console.log("Report type:", reportType);
    // console.log('Other emergency type:', otherEmergencyType);
    // console.log("Urgency level:", urgencyLevel);
    // console.log("Need assistance:", needAssistance);

    let imageData;

    const alertData = {
      role: user ? user.role : null,
      userId: user ? user.userId : null,
      constructionSiteId: user ? user.constructionSiteId : null,
      reportingFor,
      emergencyType: reportType,
      alertLocation: {
        type: "Point",
        coordinates: [0, 0], // to be updated
      }, // to be updated
      // reportingFor,
      emergencyText: emergencyText,
      workersInjured: numWorkersInjured,
      degreeOfEmergency: urgencyLevel,
      assistance: needAssistance,
    };
    // Object.keys(alertData).forEach((key) => {
    //   formData.append(key, (alertData as any)[key] as string);
    // });
    if (photo) {
      const uriParts = photo.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const fileData = await FileSystem.readAsStringAsync(photo, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const base64Image = `data:image/${fileType};base64,${fileData}`;
      // console.log("fileData>>", fileData);
      imageData = base64Image;
      
    }
    // console.log("formdata>>", alertData);
    const options = {
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...alertData, photo: photo?imageData:null}),
    };
    await fetchData(options);
  };

  useEffect(() => {
    // Request camera permission on component mount
    requestPermission();
  }, []);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 0.5, // Adjust quality as needed (0 to 1)
        skipProcessing: false, // Skip processing rotation and scaling
      };
      const photo = await cameraRef.current.takePictureAsync(options);
      setPhoto(photo.uri);
      // console.log(photo);
    }
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const emergencies: EmergencyItem[] = [
    { text: "A worker fell", icon: FallIcon },
    { text: "Fire hazard", icon: FireHazardIcon },
    { text: "Electrical hazard", icon: ElectricIcon },
    { text: "Injury", icon: InjuredIcon },
    { text: "Confined spaces", icon: SpaceIcon },
    { text: "Struck by hazard", icon: DangerIcon },
  ];

  const chunkedEmergencies = chunkArray(emergencies, 3);

  const handleEmergencySelection = (text: string) => {
    setReportType((prevReportType) => {
      return prevReportType === text ? null : text;
    });
  };

  const handleChangeUrgency = (value: number) => {
    setUrgencyLevel(value);
  };

  const getTrackColor = () => {
    switch (urgencyLevel) {
      case 1:
        return "#FFC24B";
      case 2:
        return "$highlight";
      case 3:
        return "$alert";
      default:
        return "$neutral";
    }
  };

  const getThumbColor = () => {
    switch (urgencyLevel) {
      case 1:
        return "#FFC24B";
      case 2:
        return "$highlight";
      case 3:
        return "$alert";
      default:
        return "$neutral";
    }
  };

  const BoxIconWithText: React.FC<{ icon: React.FC<any>; text: string }> = ({
    icon: IconComponent,
    text,
  }) => {
    const isSelected = reportType === text;
    return (
      <TouchableOpacity
        onPress={() => handleEmergencySelection(text)}
        style={[styles.boxContainer, isSelected ? styles.selectedBox : null]}
      >
        <VStack
          space="sm"
          width={110}
          height={110}
          style={{ alignItems: "center", justifyContent: "center" }}
          p={10}
          borderRadius={22}
        >
          <IconComponent size={34} color="#1E1E1E" />
          <Typography textAlign="center" bold>
            {text}
          </Typography>
        </VStack>
      </TouchableOpacity>
    );
  };

  const handleAssistanceSelection = (value: "true" | "false") => {
    setNeedAssistance(value);
    if (value === "true") {
      setShowAssistanceForm(true);
    } else {
      setShowAssistanceForm(false);
    }
  };

  const AssistanceForm = () => {
    return (
      <FormControl>
        <VStack space="md">
          <Typography bold>Photo of Incident Location (Optional)</Typography>
          <CommonButton
            variant="rounded"
            action="positive"
            showIcon={true}
            buttonTextSize={18}
            onPress={() => setShowCamera(true)}
          >
            Take a Photo
          </CommonButton>
          {/* Render camera if showCamera state is true */}
          {showCamera && (
            <Camera style={{ flex: 1 }} ref={cameraRef} type={cameraType}>
              <TouchableOpacity
                onPress={handleCameraClose}
                style={{ alignSelf: "flex-end", marginRight: 16 }}
              >
                <Typography bold style={{ color: "white" }}>
                  Close Camera
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTakePhoto}
                style={{ alignSelf: "center", marginBottom: 16 }}
              >
                <Typography bold style={{ color: "white" }}>
                  Take Picture
                </Typography>
              </TouchableOpacity>
            </Camera>
          )}
        </VStack>
      </FormControl>
    );
  };

  const handleCancelAlert = () => {
    navigation.navigate("Dashboard" as never);
  };

  return (
    <>
      <ScrollView>
        <ScreenLayout>
          <VStack space="2xl">
            {/* FIELD 1 - REPORT FOR */}
            <FormControl>
              <RadioGroup value={reportingFor} onChange={setReportingFor}>
                <VStack space="md">
                  <Typography bold>I am reporting for*</Typography>
                  <HStack space="2xl">
                    <Radio size="lg" value="Myself">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>Myself</Typography>
                    </Radio>
                    <Radio size="lg" value="Other worker">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>Other worker</Typography>
                    </Radio>
                  </HStack>
                </VStack>
              </RadioGroup>
            </FormControl>

            {/* FIELD 2 - NUMBER OF WORKERS INJURED */}
            <FormControl>
              <VStack space="md">
                <Typography bold>Number of workers injured*</Typography>
                <View style={styles.numberInputContainer}>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => setNumWorkersInjured(numWorkersInjured - 1)}
                  >
                    <Typography bold>-</Typography>
                  </TouchableOpacity>
                  <View style={styles.numberDisplay}>
                    <Typography bold>{numWorkersInjured}</Typography>
                  </View>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => setNumWorkersInjured(numWorkersInjured + 1)}
                  >
                    <Typography bold>+</Typography>
                  </TouchableOpacity>
                </View>
              </VStack>
            </FormControl>

            {/* FIELD 3 - REPORT TYPE */}
            <FormControl>
              <VStack space="md">
                <Typography bold>I am reporting about*</Typography>
                <VStack space="xs">
                  {chunkedEmergencies.map(
                    (chunk: EmergencyItem[], index: number) => (
                      <HStack key={index} space="lg">
                        {chunk.map(
                          (emergency: EmergencyItem, innerIndex: number) => (
                            <Box
                              flex={1}
                              justifyContent="center"
                              alignItems="center"
                              key={innerIndex}
                            >
                              <BoxIconWithText
                                key={innerIndex}
                                icon={emergency.icon}
                                text={emergency.text}
                              />
                            </Box>
                          )
                        )}
                      </HStack>
                    )
                  )}
                  {/* Render Textarea if no emergency is selected */}
                  {reportType === null && (
                    <FormControl>
                      <Typography bold>Describe the emergency*</Typography>
                      <Textarea>
                        <TextareaInput
                          value={emergencyText}
                          onChange={(e: any) =>
                            setEmergencyText(e.target.value)
                          }
                        />
                      </Textarea>
                    </FormControl>
                  )}
                </VStack>
              </VStack>
            </FormControl>

            {/* FIELD 4 - DEGREE OF URGENCY */}
            <FormControl>
              <Typography bold>Select degree of urgency*</Typography>
              <HStack space="lg" p={25}>
                <Slider
                  step={1}
                  maxValue={3}
                  minValue={1}
                  size="lg"
                  defaultValue={urgencyLevel}
                  onChange={handleChangeUrgency}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg={getTrackColor()} />
                  </SliderTrack>
                  <SliderThumb
                    bg={getThumbColor()}
                    p="$1"
                    width={40}
                    height={40}
                    $active-outlineColor={getThumbColor()}
                  >
                    <Typography
                      textAlign="center"
                      color="white"
                      size="2xl"
                      bold
                    >
                      {urgencyLevel}
                    </Typography>
                  </SliderThumb>
                </Slider>
              </HStack>
            </FormControl>

            {/* FIELD 5 - NEED ASSISTANCE */}
            <FormControl>
              <RadioGroup
                value={needAssistance}
                onChange={handleAssistanceSelection}
              >
                <VStack space="md">
                  <Typography bold>
                    Do you need assistance on the spot?*
                  </Typography>
                  <HStack space="2xl">
                    <Radio size="lg" value="true">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>Yes</Typography>
                    </Radio>
                    <Radio size="lg" value="false">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>No</Typography>
                    </Radio>
                  </HStack>
                </VStack>
              </RadioGroup>
            </FormControl>
            {showAssistanceForm && <AssistanceForm />}

            {/* SEND REPORT */}
            <FormControl>
              <VStack space="md">
                <Typography textAlign="center" color="#D0080F" bold>
                  All the above fields are required
                </Typography>
                <CommonButton
                  variant="rounded"
                  isDisabled={
                    !(
                      numWorkersInjured >= 0 &&
                      reportType &&
                      urgencyLevel !== null &&
                      (needAssistance === "true" || needAssistance === "false")
                    )
                  }
                  onPress={sendAlert}
                >
                  Send Alert
                </CommonButton>
                <CommonButton
                  variant="underline"
                  action="primary"
                  onPress={handleCancelAlert}
                >
                  Cancel Alert
                </CommonButton>
              </VStack>
            </FormControl>
          </VStack>
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  numberDisplay: {
    minWidth: 80,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  numberText: {
    fontSize: 16,
  },
  boxContainer: {
    borderWidth: 2,
    borderColor: "#C7C7C7",
    borderRadius: 22,
  },
  selectedBox: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});

function chunkArray(arr: any[], size: number) {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );
}

export default AlertReport;
