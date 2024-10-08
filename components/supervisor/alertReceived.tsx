import React, { useState, useEffect } from "react";
import { VStack, Box, HStack, Image, ButtonText } from "@gluestack-ui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Typography from "../common/typography";
import LocationIcon from "../../assets/icons/location";
import AlertButton from "../common/alertButton";
import CommonButton from "../common/button";
import FallIcon from "../../assets/icons/fall";
import FireHazardIcon from "../../assets/icons/fireHazard";
import ElectricIcon from "../../assets/icons/electric";
import InjuredIcon from "../../assets/icons/injured";
import SpaceIcon from "../../assets/icons/space";
import DangerIcon from "../../assets/icons/danger";
import LocationComponent from "./Location";
import GroupButton from "../common/groupButton";
import SMSModal from "./SMSModal";
import {
  BACKEND_BASE_URL,
  BACKEND_ORIGIN_LOCAL,
  LOCAL_BASE_URL,
} from "../../config/api";
// import useFetch from "../../hooks/useFetch";
import useRequest from "../../hooks/useRequest";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { IUser } from "../../shared/interfaces/user.interface";
import CancelAlertModal from "../common/cancelAlertModal";
import { RootStackParamList } from "../../types/navigationTypes";
import { dismissAlert } from "../../lib/slices/authSlice";

interface AlertReceivedProps {
  type: "accident" | "evacuation";
  emergency: string;
  location: string;
  level: number;
  workersInjured: number;
  reportedFor: string;
  needAssistance: boolean;
  constructionSiteId: string;
  imageUrl?: string;
}

interface EmergencyItem {
  text: string;
  icon: React.FC<any>; // Change iconName to icon
}

const AlertReceived: React.FC<AlertReceivedProps> = ({
  type,
  emergency,
  location,
  level,
  workersInjured,
  reportedFor,
  needAssistance,
  constructionSiteId,
  imageUrl,
}) => {
  const [selectedButton, setSelectedButton] = useState<
    "One Whistle" | "Evacuation" | null
  >(null);
  const { user,token } = useSelector((state: RootState) => state.auth);
  const [onEvacuation, setOnEvacuation] = useState<boolean | null>(null);
  const { data, isLoading, error, fetchData }: any = useRequest(
    `${BACKEND_BASE_URL}/alert-worker`,
    "POST"
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // console.log(type);
  // console.log(imageUrl);
  // useEffect(() => {
  //   if (type === "accident") {
  //     setSelectedButton("One Whistle");
  //   } else if (type === "evacuation") {
  //     setSelectedButton("Evacuation");
  //   }
  // }, [type]);

  const handleEmergencyTypeSelect = (action: "One Whistle" | "Evacuation") => {
    setSelectedButton(action);
    if (action === "Evacuation") {
      setOnEvacuation(true); 
    } else {
      setOnEvacuation(false);
    }
  };
  console.log(data);
  // const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [openSMS, setOpenSMS] = useState(false);

  const handleIncidentPress = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      withCredentials: true,
      body: JSON.stringify({
        constructionSiteId,
        supervisorId: (user as IUser)._id,
        action: selectedButton==="One Whistle" ? "accident" : "evacuation",
      }),
    };
    console.log(options);
    await fetchData(options);
    
    dispatch(dismissAlert())
    // navigation.navigate({ name: "Dashboard",params: { alertSent: null } });
    setOpenSMS(true);
  };

  const navigateToSafeZone = () => {
    // Navigate to safe zone screen
    // navigation.navigate('SafeZoneScreen');
  };

  const [cancelAlert, setCancelAlert] = useState(false);

  const emergencies: EmergencyItem[] = [
    { text: "A worker fell", icon: FallIcon },
    { text: "Fire hazard", icon: FireHazardIcon },
    { text: "Electrical hazard", icon: ElectricIcon },
    { text: "Injury", icon: InjuredIcon },
    { text: "Confined spaces", icon: SpaceIcon },
    { text: "Struck by hazard", icon: DangerIcon },
  ];

  const selectedEmergency = emergencies.find((item) => item.text === emergency);

  return (
    <VStack space="md">
      {/* DETAILS */}
      <VStack
        mt={15}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <BoxWithIcon
          icon={selectedEmergency?.icon || DangerIcon}
          text={emergency}
          type={type}
        />
        <BoxWithNumber number={level} text={`Level`} type={type} />
        <BoxWithNumber
          number={workersInjured}
          text={`Workers Injured`}
          type={type}
        />
      </VStack>
      <HStack space="xs">
        <Box flex={1}>
          <BoxWithText
            boxTitle={`Reported for`}
            text={reportedFor}
            type={type}
          />
        </Box>
        <Box flex={1}>
          <BoxWithText
            boxTitle={`Need assistance?`}
            text={needAssistance ? "Yes" : "No"}
            type={type}
          />
        </Box>
      </HStack>

      {/* ALERT LOCATION */}
      <Box mt={10}>
        <Typography>Emergency Location:</Typography>
          <HStack mt={5} mb={5} alignItems="center">
            <LocationIcon size={18} color={""} focussed={false} />
              <Typography bold size="lg" pl={5}>
                {location}
              </Typography>
          </HStack>
      </Box>

      {/* IMAGE REPORT */}
      {imageUrl ? (
        <Image
          size="2xl"
          w={"$full"}
          h={400}
          borderRadius={10}
          source={{
            uri: imageUrl,
          }}
          alt={`${emergency} example`}
        />
      ) : (
        null
        // <Box w={"$full"} h={50} justifyContent="center">
        //   <Typography textAlign="left">No image was sent with the report</Typography>
        // </Box>
      )}

      {/* EMERGENCY TYPE */}
      <Box mt={10} mb={"$1"}>
        <Typography bold>Select the type of emergency</Typography>
      </Box>
      <GroupButton
        onSelect={handleEmergencyTypeSelect}
        action={"One Whistle"}
      />

      <Box mb="$4">
        {selectedButton === "One Whistle" && (
          <AlertButton
            user="supervisor"
            emergency="oneWhistle"
            onPress={handleIncidentPress}
          />
        )}

        {selectedButton === "Evacuation" && (
          <AlertButton
            user="supervisor"
            emergency="threeWhistles"
            onPress={handleIncidentPress}
          />
        )}
      </Box>

      {/* SMS MODAL */}
      <SMSModal showModal={openSMS} setShowModal={setOpenSMS} onEvacuation={onEvacuation} />

      {/* testing */}
      {/* <AlertButton
        user="supervisor" // "worker"
        emergency="oneWhistle" // "evacuation"
        onPress={handleIncidentPress}
      /> */}

      {/* CANCEL ALERT */}
      <CommonButton variant="text" onPress={() => setCancelAlert(true)}>
        <ButtonText textDecorationLine="underline" size="md">
          <Typography size="lg">Cancel Alert</Typography>
        </ButtonText>
      </CommonButton>

      {/* CANCEL ALERT MODAL */}
      <CancelAlertModal showModal={cancelAlert} setShowModal={setCancelAlert} />
    </VStack>
  );
};

interface BoxWithIconProps {
  icon: React.FC<any>;
  text: string;
  type: "accident" | "evacuation";
}

const BoxWithIcon: React.FC<BoxWithIconProps> = ({
  icon: IconComponent,
  text,
  type,
}) => {
  const iconColor = type === "accident" ? "#FD9201" : "#D0080F";
  return (
    <VStack
      space="sm"
      width={110}
      height={110}
      style={{ alignItems: "center", justifyContent: "center" }}
      p={10}
      borderWidth={2}
      borderColor="#C7C7C7"
      borderRadius={22}
    >
      <IconComponent size={34} color={iconColor} />
      <Typography textAlign="center" bold>
        {text}
      </Typography>
    </VStack>
  );
};

interface BoxWithNumberProps {
  number: number;
  text: string;
  type: "accident" | "evacuation";
}

const BoxWithNumber: React.FC<BoxWithNumberProps> = ({
  number,
  text,
  type,
}) => {
  const textColor = type === "accident" ? "#FD9201" : "#D0080F";
  return (
    <VStack style={{ alignItems: "center" }}>
      <Box
        style={{ alignItems: "center", justifyContent: "center" }}
        p={10}
        width={110}
        height={110}
        borderWidth={2}
        borderColor="#C7C7C7"
        borderRadius={22}
      >
        <Typography size={"3xl"} color={textColor} bold>
          {number}
        </Typography>
        <Typography textAlign="center">{text}</Typography>
      </Box>
    </VStack>
  );
};

interface BoxWithTextProps {
  boxTitle: string;
  text: string;
  type: "accident" | "evacuation";
}

const BoxWithText: React.FC<BoxWithTextProps> = ({ boxTitle, text, type }) => {
  const textColor = type === "accident" ? "#FD9201" : "#D0080F";
  return (
    <VStack>
      <Box
        style={{ alignItems: "center", justifyContent: "center" }}
        p={15}
        w={"$full"}
        height={80}
        borderWidth={2}
        borderColor="#C7C7C7"
        borderRadius={22}
      >
        <Typography textAlign="center">{boxTitle}</Typography>
        <Typography textAlign="center" size={"xl"} bold>
          {text}
        </Typography>
      </Box>
    </VStack>
  );
};

export default AlertReceived;
