import React, { useState, useEffect } from "react";
import { Box, HStack, ScrollView, VStack, View } from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import Typography from "../../components/common/typography";
import LocationComponent from "../../components/supervisor/Location";
import CommonButton from "../../components/common/button";
import SMSModal from "../../components/supervisor/SMSModal";
import MapComponent, { LatLng } from "../../components/common/map";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { dismissAlert } from "../../lib/slices/authSlice";
const SOSDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [siteLocation, setSiteLocation] = useState("100 W 49th Ave, Vancouver");
  const SOSLocation: LatLng = {
    latitude: 49.225105402346955,
    longitude: -123.10749431593648,
  }; // Set type for SOSLocation
  const [openSMS, setOpenSMS] = useState(false);

  const handleSMS = () => {
    dispatch(dismissAlert());
    setOpenSMS(true);
  };

  return (
    <>
      <ScrollView>
        <ScreenLayout>
          <VStack space="lg" h={"$full"}>
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

            {/* SMS MODAL */}
            <SMSModal showModal={openSMS} setShowModal={setOpenSMS} />
          </VStack>
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

export default SOSDetails;
