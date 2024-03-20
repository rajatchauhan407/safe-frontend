import { Box, ScrollView } from "@gluestack-ui/themed";
import React from "react";
import Typography from "../../components/common/typography";
import ScreenLayout from "../../components/layout/screenLayout";

const ReceivedAlertDetails: React.FC = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <Box>
          <Typography>Hi from Alert Details</Typography>
        </Box>
      </ScrollView>
    </ScreenLayout>
  );
};

export default ReceivedAlertDetails;
