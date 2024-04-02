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
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import FallIcon from "../../assets/icons/fall";
import FireHazardIcon from "../../assets/icons/fireHazard";
import ElectricIcon from "../../assets/icons/electric";
import InjuredIcon from "../../assets/icons/injured";
import SpaceIcon from "../../assets/icons/space";
import DangerIcon from "../../assets/icons/danger";
import ExplosionIcon from "../../assets/icons/explosion";
import WeatherIcon from "../../assets/icons/weather";
import CommonButton from "../../components/common/button";
import AlertButton from "../../components/common/alertButton";
import SMSModal from "../../components/supervisor/SMSModal";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import { getItem } from "../../lib/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { BACKEND_BASE_URL, LOCAL_BASE_URL } from "../../config/api";
import useRequest from "../../hooks/useRequest";

// import ActSheet from "../../components/common/actionSheet";

interface EmergencyItem {
  text: string;
  icon: React.FC<any>;
}

const Alert: React.FC = () => {
  
  const user = useSelector((state: RootState) => state.auth.user);
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
  // const [emergencyType, setEmergencyType] = useState<string | null>(null);r
  const { data, isLoading, error, fetchData } = useRequest(
    `${LOCAL_BASE_URL}/supervisor-alert`,
    "POST"
  );
  const [openSMS, setOpenSMS] = useState(false);

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

  const handleEmergencyTypeSelect = (action: "One Whistle" | "Evacuation") => {
    setSelectedButton(action);
    setReportType(null);
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

  const evacuationEmergencies: EmergencyItem[] = [
    { text: "Fire hazard", icon: FireHazardIcon },
    { text: "Gas explosion", icon: ExplosionIcon },
    { text: "Weather", icon: WeatherIcon },
  ];

  const chunkedEmergencies = chunkArray(emergencies, 3);
  const chunkedEvacuationEmergencies = chunkArray(evacuationEmergencies, 3);

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
    const selectedStyle: ViewStyle = {
      backgroundColor: isSelected
        ? selectedButton === "One Whistle"
          ? "#FD9201"
          : "#D0080F"
        : "transparent",
      borderColor: isSelected
        ? selectedButton === "One Whistle"
          ? "#FD9201"
          : "#D0080F"
        : "transparent",
    };
    return (
      <TouchableOpacity
        onPress={() => handleEmergencySelection(text)}
        style={[styles.boxContainer, isSelected ? selectedStyle : null]}
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
          <Typography
            textAlign="center"
            bold
            style={{
              color:
                isSelected && selectedButton === "Evacuation"
                  ? "#ffffff"
                  : "#1E1E1E",
            }}
          >
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
      },
      responseAction:{
        supervisorId: user ? user.userId : null,
        actionType:selectedButton
      },
      // to be updated
      // reportingFor,
      emergencyText: emergencyText,
      workersInjured: numWorkersInjured,
    };
    console.log(alertData);
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertData),
    };
    await fetchData(options);

    // setOpenSMS(true);
  };

  /* Cancel Alert -------------------------- */

  const handleCancelAlert = () => {
    navigation.navigate("Dashboard" as never);
    setNumWorkersInjured(0);
    setReportType(null);
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
                action={selectedButton || "One Whistle"}
              />
            </VStack>

            {/* FIELD 2 - NUMBER OF WORKERS INJURED */}
            <FormControl>
              <VStack space="md">
                <Typography bold>Number of workers injured*</Typography>
                <View flexDirection="row" alignItems="center">
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => setNumWorkersInjured(numWorkersInjured - 1)}
                  >
                    <Typography bold>-</Typography>
                  </TouchableOpacity>
                  <View
                    minWidth={80}
                    h={40}
                    borderRadius={"$full"}
                    borderWidth={2}
                    borderColor="#000"
                    alignItems="center"
                    justifyContent="center"
                    mr={8}
                  >
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
                  {selectedButton === "One Whistle" &&
                    // Render chunkedEmergencies if "One Whistle" is selected
                    chunkedEmergencies.map(
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
                  {selectedButton === "Evacuation" &&
                    // Render chunkedEvacuationEmergencies if "Evacuation" is selected
                    chunkedEvacuationEmergencies.map(
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
                  All the above fields are required*
                </Typography>
                {selectedButton === "Evacuation" && (
                  <AlertButton
                    user="worker"
                    emergency={"evacuation"}
                    isDisabled={!(numWorkersInjured >= 0 && reportType)}
                    onPress={sendAlert}
                  />
                )}
                {selectedButton === "One Whistle" && (
                  <AlertButton
                    user="supervisor"
                    emergency={"oneWhistle"}
                    isDisabled={!(numWorkersInjured >= 0 && reportType)}
                    onPress={sendAlert}
                  />
                )}

                <CommonButton
                  variant="underline"
                  action="primary"
                  onPress={handleCancelAlert}
                >
                  Cancel Alert
                </CommonButton>
              </VStack>
            </FormControl>

            {/* SMS MODAL */}
            <SMSModal showModal={openSMS} setShowModal={setOpenSMS} />
          </VStack>
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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

  boxContainer: {
    borderWidth: 2,
    borderColor: "#C7C7C7",
    borderRadius: 22,
  },
});

function chunkArray(arr: any[], size: number) {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );
}

export default Alert;
