import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  HStack,
  ScrollView,
  Textarea,
  TextareaInput,
  VStack,
  View,
} from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import Typography from "../../components/common/typography";
import GroupButton from "../../components/common/groupButton";
import { TouchableOpacity, StyleSheet } from "react-native";
import FallIcon from "../../assets/icons/fall";
import FireHazardIcon from "../../assets/icons/fireHazard";
import ElectricIcon from "../../assets/icons/electric";
import InjuredIcon from "../../assets/icons/injured";
import SpaceIcon from "../../assets/icons/space";
import DangerIcon from "../../assets/icons/danger";
import CommonButton from "../../components/common/button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import { getItem } from "../../lib/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { BACKEND_BASE_URL, LOCAL_BASE_URL } from "../../config/api";
import useFetch from "../../hooks/useFetch";

// import ActSheet from "../../components/common/actionSheet";

interface EmergencyItem {
  text: string;
  icon: React.FC<any>;
}

const Alert: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedButton, setSelectedButton] = useState<
    "One Whistle" | "Evacuation" | null
  >(null);
  const [reportingFor, setReportingFor] = useState<"Myself" | "OtherWorker">(
    "Myself"
  );
  const [numWorkersInjured, setNumWorkersInjured] = useState(0);
  const [reportType, setReportType] = useState<string | null>(null);
  const [emergencyText, setEmergencyText] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, error, fetchData } = useFetch(
    `${BACKEND_BASE_URL}/alert`,
    "POST"
  );

  useEffect(() => {
    const retrieveToken = async () => {
      const token = await getItem("token");
      const userData = await getItem("user");
      // console.log(token);
      // console.log(userData);
    };
    retrieveToken();
  }, []);

  /* Report for button variables---------------------- */

  /* useEffect(() => {
    if (type === "accident") {
      setSelectedButton("One Whistle");
    } else if (type === "evacuation") {
      setSelectedButton("Evacuation");
    }
  }, [type]); */

  const handleEmergencyTypeSelect = (action: "One Whistle" | "Evacuation") => {
    setSelectedButton(action);
  };

  /* Type of alert to report variables ----------------*/

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

  /* Send alert variables ------------------------- */

  const sendAlert = async () => {
    console.log("Sending alert");
    console.log("Reporting for:", reportingFor);
    console.log("Number of workers injured:", numWorkersInjured);
    console.log("Report type:", reportType);
    // console.log('Other emergency type:', otherEmergencyType);

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
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertData),
    };
    await fetchData(options);
  };

  /* Cancel Alert -------------------------- */

  const handleCancelAlert = () => {
    navigation.navigate("Dashboard" as never);
  };

  return (
    <>
      <ScrollView>
        <ScreenLayout>
          <VStack space="2xl">
            {/* FIELD 1 - REPORT FOR */}
            <VStack space="sm">
              <Typography bold>Select type of emergency</Typography>
              <GroupButton
                onSelect={handleEmergencyTypeSelect}
                action={"One Whistle"}
              />
            </VStack>

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
                    <FormControl mt={"$2"}>
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

            {/* SEND REPORT */}
            <FormControl>
              <VStack space="md">
                <Typography textAlign="center" color="#D0080F" bold>
                  All the above fields are required
                </Typography>
                <CommonButton
                  variant="rounded"
                  isDisabled={!(numWorkersInjured >= 0 && reportType)}
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

export default Alert;
