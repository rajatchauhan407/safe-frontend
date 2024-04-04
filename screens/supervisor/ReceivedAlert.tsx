import React, { useState } from "react";
import { Box, ScrollView } from "@gluestack-ui/themed";
import Typography from "../../components/common/typography";
import ScreenLayout from "../../components/layout/screenLayout";
import AlertReceived from "../../components/supervisor/alertReceived";

const ReceivedAlertDetails: React.FC<any> = ({ route }) => {
  const [accidentLocation, setAccidentLocation] = useState(
    "Zone 3 - Building B"
  );
  const { alertData } = route.params;
  console.log("ReceivedAlertDetails: alertData: ", alertData)
  return (
    <>
      <ScrollView style={{ backgroundColor: '#F8F8FF' }}>
        <ScreenLayout>
          {/* REPORTED BY */}
          <Box>
            <Typography>Reported by:</Typography>
            <Typography bold>Sam Smith (Electrician)</Typography>
          </Box>

          {/* EMERGENCY DETAILS */}
          <AlertReceived
            type={
              alertData.degreeOfEmergency === 1 ||
              alertData.degreeOfEmergency === 2
                ? "accident"
                : "evacuation"
            } /* "evacuation" */ //testing
            location={alertData.location}
            emergency={alertData.emergencyType}
            level={alertData.degreeOfEmergency}
            workersInjured={alertData.workersInjured}
            reportedFor={alertData.reportingFor}
            needAssistance={alertData.assistance}
            constructionSiteId={alertData.constructionSiteId}
            imageUrl={alertData.imageUrl}
          />
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

export default ReceivedAlertDetails;
