import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, ScrollView, Text } from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import NumOfWorkers from "../../components/common/NumOfWorkers";
import Drawer from "../../components/common/Drawer";
import CheckedInList from "../../components/supervisor/CheckedInList";

const CheckedIn: React.FC = () => {
  const [siteLocation, setSiteLocation] = useState("Richmond, BC");
  const [currentAlertText, setCurrentAlertText] = useState(
    "Great! There’s no alert report."
  );

  /* Use this for alert texts different than default */
  /* useEffect(() => {
    setCurrentAlertText("Hi");
  }, []); */

  return (
    <ScreenLayout>
      <ScrollView>
        {/* LOCATION */}
        <Box mx="$3" mb="$3">
          {/* Icon missing here */}
          <Text>{siteLocation}</Text>
        </Box>

        {/* WORKERS CHECKED IN */}
        <NumOfWorkers totalCheckedIn={30} totalExpected={34} />

        {/* LIST OF WORKERS */}
        <CheckedInList />
      </ScrollView>
      {/* <Box style={styles.drawer}>
        <Drawer alertText={currentAlertText} />
      </Box> */}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});

export default CheckedIn;
