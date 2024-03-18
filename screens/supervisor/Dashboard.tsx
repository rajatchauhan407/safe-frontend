import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Box, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import LocationIcon from "../../assets/icons/location";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertSimulationCard from "../../components/common/alertSimulation";
import NumOfWorkers from "../../components/common/NumOfWorkers";
import Drawer from "../../components/common/Drawer";
import ScreenLayout from "../../components/layout/screenLayout";
import Typography from "../../components/common/typography";
import websocketService from "../../services/websocket.service";
// import ActSheet from "../../components/common/actionSheet";
const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState("David");
  const [siteLocation, setSiteLocation] = useState("Richmond, BC");
  const [currentAlertType, setCurrentAlertType] = useState<
    "none" | "accident" | "evacuation" | "sos"
  >("none");

  useEffect(() => {
    websocketService.connect();

    console.log("Connected to websocket");
    websocketService.subscribeToEvent("alert", (data) => {
      console.log(data);
      setCurrentAlertType(data.alertType);
    });

    return () => {
      websocketService.disconnect();
    };
  });

  /* Use this to change alert type */
  useEffect(() => {
    setCurrentAlertType("sos");
  }, []);

  return (
    <Box w="$full" h="$full">
      {/* <ScrollView> */}
      <ScreenLayout>
        {/* GREETING */}
        <Text>
          <Typography size="md" bold>{`Hi, ${userName}\n`}</Typography>
          <Typography size="2xl" bold>
            Let's start building!
          </Typography>
        </Text>

        {/* LOCATION */}
        <HStack mt="$2" mb="$3" alignItems="center">
          <LocationIcon size={13} color={""} focussed={false} />
          <Typography size="md" pl={5}>
            {siteLocation}
          </Typography>
        </HStack>

        {/* WORKERS CHECKED IN */}
        {/* <NumOfWorkers totalCheckedIn={30} totalExpected={34} /> */}
        <NumOfWorkers />

        {/* CARDS */}
        <HStack space="md" mt={"$5"}>
          <Box flex={1}>
            <CommonDaysAccidentCard layout={"column"} daysWithoutAccident={0} />
          </Box>
          <Box flex={1}>
            <AlertSimulationCard layout={"column"} daysWithoutAccident={0} />
          </Box>
        </HStack>
      </ScreenLayout>
      {/* </ScrollView> */}

      {/* DRAWER */}
      <View style={styles.drawer}>
        <Drawer alertType={currentAlertType} />
        {/* <ActSheet /> */}
      
      </View>
    </Box>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    padding: 24,
    flex: 1,
  },
  greeting: {
    fontSize: 16,
  },
  buildingText: {
    fontSize: 24,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});
