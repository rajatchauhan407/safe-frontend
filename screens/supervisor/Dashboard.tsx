import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Box, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import LocationIcon from "../../assets/icons/location";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertSimulationCard from "../../components/common/alertSimulation";
import NumOfWorkers from "../../components/common/NumOfWorkers";
import DrawerSupervisor from "../../components/supervisor/Drawer";
import ScreenLayout from "../../components/layout/screenLayout";
import Typography from "../../components/common/typography";
import websocketService from "../../services/websocket.service";
import LocationComponent from "../../components/supervisor/Location";
import SafeZoneWorkers from "../../components/common/safeZoneWorkers";
import { useSelector} from "react-redux";
import { RootState} from "../../lib/store";
import { BACKEND_BASE_URL } from "../../config/api";

const Dashboard: React.FC = () => {
  // const [userName, setUserName] = useState("David");
  const [siteLocation, setSiteLocation] = useState("");
  const [currentAlertType, setCurrentAlertType] = useState<
    "none" | "accident" | "evacuation" | "sos"
  >("none");

  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.auth
  );
  let userName = "";
  let siteId="";
  if (user) {
    siteId = user.constructionSiteId || "";
    console.log("logged in user>> " + user._id);   
    userName = `${user.firstName} ${user.lastName}`;
  } 

  useEffect(() => {
      const getSite = async () => {
      try {
        const siteInfo = {
          siteId : siteId
        }
        const res = await fetch(`${BACKEND_BASE_URL}/sitename`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(siteInfo),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        console.log("site name data>> "+data)
        if (data) {
          setSiteLocation(data)    
        } 
      } 
      catch (error) {
        //Error while connecting with backend
        console.error('Error:', error);
      }
    };

    getSite();
  }, []);

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
        <LocationComponent siteLocation={siteLocation} />

        {/* WORKERS CHECKED IN */}
        {/* <NumOfWorkers totalCheckedIn={30} totalExpected={34} /> */}
        <NumOfWorkers seeAll={true} />

        {/* IN SAFE ZONE */}
        <Box mt="$5">
          <SafeZoneWorkers seeAll={true} />
        </Box>

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
      <Box style={styles.drawer}>
        <DrawerSupervisor alertType={currentAlertType} />
      </Box>
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
