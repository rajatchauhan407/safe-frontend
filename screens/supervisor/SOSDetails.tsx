import React, { useState, useEffect } from "react";
import { Box, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import Typography from "../../components/common/typography";
import LocationComponent from "../../components/supervisor/Location";
import CommonButton from "../../components/common/button";
import SMSModal from "../../components/supervisor/SMSModal";
import MapComponent, { LatLng } from "../../components/common/map";

const SOSDetails: React.FC = () => {
  const [siteLocation, setSiteLocation] = useState("100 W 49th Ave, Vancouver");
  const SOSLocation: LatLng = { latitude: 12.345, longitude: 67.89 }; // Set type for SOSLocation
  const [openSMS, setOpenSMS] = useState(false);

  const handleSMS = () => {
    setOpenSMS(true);
  };

  return (
    <>
      <ScrollView>
        <ScreenLayout>
          <VStack space="lg">
            {/* LOCATION */}
            <LocationComponent siteLocation={siteLocation} />

            {/* MAP */}
            <MapComponent location={SOSLocation} />

            {/* TIME STAMP */}
            <HStack>
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
            <CommonButton variant="rounded" action="sos" onPress={handleSMS}>
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
