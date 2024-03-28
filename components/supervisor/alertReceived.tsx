import React, { useState, useEffect } from "react";
import { VStack, Box, HStack, Image, ButtonText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Typography from "../common/typography";
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
import useFetch from "../../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { IUser } from "../../shared/interfaces/user.interface";
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
  imageUrl
}) => {
  const [selectedButton, setSelectedButton] = useState<
    "One Whistle" | "Evacuation" | null
  >(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, error, fetchData }: any = useFetch(
    `${BACKEND_BASE_URL}/alert-worker`,
    "POST"
  );
  // console.log(type);
  // console.log(imageUrl);
  useEffect(() => {
    if (type === "accident") {
      setSelectedButton("One Whistle");
    } else if (type === "evacuation") {
      setSelectedButton("Evacuation");
    }
  }, [type]);

  const handleEmergencyTypeSelect = (action: "One Whistle" | "Evacuation") => {
    setSelectedButton(action);
  };
  console.log(data);
  const navigation = useNavigation();

  const [openSMS, setOpenSMS] = useState(false);

  const handleIncidentPress = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify({
        constructionSiteId,
        supervisorId: (user as IUser)._id,
        action: selectedButton,
      }),
    };
    console.log(options);
    await fetchData(options);

    setOpenSMS(true);
  };

  const navigateToSafeZone = () => {
    // Navigate to safe zone screen
    // navigation.navigate('SafeZoneScreen');
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back to the previous screen (dashboard)
  };

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
      <LocationComponent siteLocation={location} />

      {/* IMAGE REPORT */}
      {imageUrl && <Image
        size="2xl"
        w={"$full"}
        borderRadius={10}
        source={{
          uri: imageUrl,
        }}
        alt={`${emergency} example`}
      />}

      {/* EMERGENCY TYPE */}
      <Box mb={"$3"}>
        <Typography bold>Select type of emergency</Typography>
      </Box>
      <GroupButton
        onSelect={handleEmergencyTypeSelect}
        action={"One Whistle"}
      />

      <Box mb="$4">
        {selectedButton === "One Whistle" && (
          <AlertButton
            user="supervisor"
            emergency={type === "accident" ? "oneWhistle" : type}
            onPress={handleIncidentPress}
          />
        )}

        {selectedButton === "Evacuation" && (
          <AlertButton
            user="worker"
            emergency={type}
            onPress={handleIncidentPress}
          />
        )}
      </Box>

      {/* SMS MODAL */}
      <SMSModal showModal={openSMS} setShowModal={setOpenSMS} />

      {/* testing */}
      {/* <AlertButton
        user="supervisor" // "worker"
        emergency="oneWhistle" // "evacuation"
        onPress={handleIncidentPress}
      /> */}

      {/* CANCEL ALERT */}
      <CommonButton variant="text" onPress={handleCancel}>
        <ButtonText textDecorationLine="underline" size="md">
          <Typography size="lg">Cancel Alert</Typography>
        </ButtonText>
      </CommonButton>
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
