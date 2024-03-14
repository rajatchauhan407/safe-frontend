import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, ScrollView, Text, View } from "react-native";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertButton from "../../components/common/alertButton";
import AlertSimulationCard from "../../components/common/alertSimulation";
import NumOfWorkers from "../../components/common/NumOfWorkers";
import Drawer from "../../components/common/Drawer";
import websocketService from "../../services/websocket.service";

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState("Liam");
  const [siteLocation, setSiteLocation] = useState("Site A");
  const [currentAlertText, setCurrentAlertText] = useState(
    "Great! There’s no alert report."
  );

  const navigation = useNavigation();

  const handleIncidentPress = () => {
    // navigation.navigate("Alert Details");
  };

  useEffect(() => {
    websocketService.connect();

    console.log("Connected to websocket");
    websocketService.subscribeToEvent("alert", (data) => {
      console.log(data);
    });

    return () => {
      websocketService.disconnect();
    };
  });

  /* Use this for alert texts different than default */
  useEffect(() => {
    setCurrentAlertText("Hi");
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.page}>
          {/* GREETING */}
          <Text>
            <Text style={styles.greeting}>{`Hi, ${userName}\n`}</Text>
            <Text style={styles.buildingText}>Let's start building</Text>
          </Text>

          <View style={{ height: 20 }} />

          {/* LOCATION */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Image source={userLocationIcon} style={{ width: 30, height: 30 }} /> */}
            <Text>{siteLocation}</Text>
          </View>

          <View style={{ height: 20 }} />

          {/* WORKERS CHECKED IN */}
          {/* <NumOfWorkers totalCheckedIn={30} totalExpected={34} /> */}
          <NumOfWorkers totalCheckedIn={0} totalExpected={0} />

          <View style={{ height: 20 }} />

          {/* CARDS */}
          <View style={styles.cardContainer}>
            <View style={styles.column}>
              <CommonDaysAccidentCard
                layout={"column"}
                daysWithoutAccident={0}
              />
            </View>
            <View style={styles.column}>
              <AlertSimulationCard layout={"column"} daysWithoutAccident={0} />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* DRAWER */}
      <View style={styles.drawer}>
        <Drawer alertText={currentAlertText} />
      </View>
    </View>
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
