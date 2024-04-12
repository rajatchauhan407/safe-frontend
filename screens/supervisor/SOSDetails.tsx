import React, { useState, useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, HStack, ScrollView, VStack, View } from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import SucessIcon from "../../assets/icons/sucess";
import Typography from "../../components/common/typography";
import LocationComponent from "../../components/supervisor/Location";
import CommonButton from "../../components/common/button";
import MapComponent, { LatLng } from "../../components/common/map";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { dismissAlert } from "../../lib/slices/authSlice";
import CustomModal from "../../components/common/modal";
import { RootStackParamList } from "../../types/navigationTypes";

const SOSDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [siteLocation, setSiteLocation] = useState("100 W 49th Ave, Vancouver");
  const SOSLocation: LatLng = {
    latitude: 49.225105402346955,
    longitude: -123.10749431593648,
  }; // Set type for SOSLocation

  const handleSMS = () => {
    dispatch(dismissAlert());
    setIsOpen(true);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <ScrollView style={{ backgroundColor: '#F8F8FF' }}>
        <ScreenLayout>
          <VStack space="lg">
            {/* LOCATION */}
            <LocationComponent siteLocation={siteLocation} />

            {/* MAP */}
            <Box w={"$full"} h={"$80"} borderRadius={20} softShadow="3">
              <MapComponent location={SOSLocation} />
            </Box>

            {/* TIME STAMP */}
            <HStack>
              {/* <MapComponent location={SOSLocation} /> */}
              <Typography bold>01/01/2024</Typography>
              <Typography bold> - </Typography>
              <Typography bold>9:00 a.m.</Typography>
            </HStack>

            {/* REPORTED BY */}
            <Box>
              <HStack>
                <Typography>Reporter name: </Typography>
                <Typography bold>Sam Smith</Typography>
              </HStack>
              <HStack>
                <Typography>Role: </Typography>
                <Typography bold>Electrician</Typography>
              </HStack>
            </Box>

            {/* SMS */}
            <CommonButton
              variant="rounded"
              action="negative"
              onPress={handleSMS}
            >
              Send SMS to First Aid Team
            </CommonButton>

            {/* SMS CONFIRMATION MODAL */}
            <CustomModal
            isOpen={isOpen}
            onClose={closeModal}
            icon={<SucessIcon color={"#00AE8C"} size={60} focussed={false} />}
            title="SMS Alert Sent!"
            description="Your alert to on-site first aid workers has been successfully sent."
            buttonText="Go to Dashboard"
            buttonAction={() => {
              setIsOpen(false);
              navigation.navigate("Dashboard" as never);
            }}
          />
          </VStack>
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

export default SOSDetails;
