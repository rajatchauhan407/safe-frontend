import React, { useState } from "react";
import { Box, ScrollView } from "@gluestack-ui/themed";
import Typography from "../../components/common/typography";
import ScreenLayout from "../../components/layout/screenLayout";
import AlertReceived from "../../components/supervisor/alertReceived";

const ReceivedAlertDetails: React.FC = () => {
  const [accidentLocation, setAccidentLocation] = useState(
    "Zone 3 - Building B"
  );

  return (
    <ScreenLayout>
      <ScrollView h="100%" w="100%">
        {/* REPORTED BY */}
        <Box>
          <Typography>Reported by:</Typography>
          <Typography bold>Sam Smith (Electrician)</Typography>
        </Box>

        {/* EMERGENCY DETAILS */}
        <AlertReceived
          type="accident" /* "evacuation" */ //testing
          location={accidentLocation}
          emergency={"Struck by hazard"}
          level={2}
          workersInjured={3}
          reportedFor={"Other"}
          needAssistance={true}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default ReceivedAlertDetails;
