import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, ScrollView, Text, View } from "react-native";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertButton from "../../components/common/alertButton";
import AlertSimulationCard from "../../components/common/alertSimulation";
import NumOfWorkers from "../../components/common/NumOfWorkers";

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState("Liam");
  const [siteLocation, setSiteLocation] = useState("Site A");

  const navigation = useNavigation();

  const handleIncidentPress = () => {
    navigation.navigate("Alert Details");
  };

  return (
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
        <NumOfWorkers totalCheckedIn={30} totalExpected={34} />

        <View style={{ height: 20 }} />

        {/* CARDS */}
        <View style={styles.container}>
          <View style={styles.column}>
            <CommonDaysAccidentCard layout={"column"} daysWithoutAccident={0} />
          </View>
          <View style={styles.column}>
            <AlertSimulationCard layout={"column"} daysWithoutAccident={0} />
          </View>
        </View>

        <View style={{ height: 20 }} />

        {/* ALERT BUTTON */}
        <View>
          <AlertButton
            level={0}
            userType="supervisor"
            onPress={handleIncidentPress}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    padding: 24,
  },
  greeting: {
    fontSize: 16,
  },
  buildingText: {
    fontSize: 24,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
});
