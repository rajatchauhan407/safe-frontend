import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, ScrollView, Text } from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import NumOfWorkers from "../../components/common/NumOfWorkers";
import Drawer from "../../components/common/Drawer";
import CheckedInList from "../../components/supervisor/CheckedInList";
import LocationComponent from "../../components/supervisor/Location";
import SafeZoneWorkers from "../../components/common/safeZoneWorkers";
import SafeZoneList from "../../components/supervisor/SafeZoneList";

const SafeZone: React.FC = () => {
  const [siteLocation, setSiteLocation] = useState("Richmond, BC");
  const [currentAlertType, setCurrentAlertType] = useState<
    "none" | "accident" | "evacuation" | "sos"
  >("none");

  return (
    <ScreenLayout>
      <ScrollView>
        {/* LOCATION */}
        <LocationComponent siteLocation={siteLocation} />

        {/* WORKERS CHECKED IN */}
        <SafeZoneWorkers seeAll={false} />

        {/* LIST OF WORKERS */}
        <SafeZoneList />
      </ScrollView>

      {/* DRAWER */}
      <Box style={styles.drawer}>
        <Drawer alertType={currentAlertType} />
      </Box>
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

export default SafeZone;
