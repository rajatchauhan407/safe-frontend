import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import NumOfWorkers from "../../components/common/NumOfWorkers";
import Drawer from "../../components/common/Drawer";
import CheckedInList from "../../components/supervisor/CheckedInList";
import LocationIcon from "../../assets/icons/location";
import Typography from "../../components/common/typography";
import LocationComponent from "../../components/supervisor/Location";

const CheckedIn: React.FC = () => {
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
        <NumOfWorkers />

        {/* LIST OF WORKERS */}
        <CheckedInList />
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

export default CheckedIn;
