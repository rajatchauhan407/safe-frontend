import React, { useEffect, useState } from "react";
import { useNavigation, Link } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import {
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  get,
} from "@gluestack-ui/themed";
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
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { BACKEND_BASE_URL, LOCAL_BASE_URL } from "../../config/api";
import useFetch from "../../hooks/useFetch";
import { IAlert } from "../../shared/interfaces/alert.interface";
import AddUserIcon from "../../assets/icons/addUser";

const Dashboard: React.FC = () => {
  // const [userName, setUserName] = useState("David");
  const [siteLocation, setSiteLocation] = useState("");
  const [currentAlertType, setCurrentAlertType] = useState<
    "none" | "accident" | "evacuation" | "sos"
  >("none");
  const [isAlert, setIsAlert] = useState(false);

  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.auth
  );
  let userName = "";
  let siteId = "";
  if (user) {
    siteId = user.constructionSiteId || "";
    console.log("logged in user>> " + user._id);
    userName = `${user.firstName} ${user.lastName}`;
  }

  const { data, isLoading, error, fetchData }: any = useFetch(
    `${BACKEND_BASE_URL}/alert?constructionSiteId=${siteId}`,
    "GET"
  );
  const getAlert = async () => {
    await fetchData({
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
  };
  useEffect(() => {
    getAlert();
  }, []);

  useEffect(() => {
    const getSite = async () => {
      try {
        const siteInfo = {
          siteId: siteId,
        };
        const res = await fetch(`${BACKEND_BASE_URL}/sitename`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(siteInfo),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        console.log("site name data>> " + data);
        if (data) {
          setSiteLocation(data);
        }
      } catch (error) {
        //Error while connecting with backend
        console.error("Error:", error);
      }
    };

    getSite();
  }, []);

  useEffect(() => {
    websocketService.connect();

    console.log("Connected to websocket");

    websocketService.subscribeToEvent("alert", (data) => {
      fetchData({
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
      // setData(data);
      // setCurrentAlertType(data.alertType);
    });

    // return () => {
    //   websocketService.disconnect();
    // };
  }, []);

  /* Use this to change alert type */
  useEffect(() => {
    console.log("Alert data>> ", data);
    if (data) {
      if (data.degreeOfEmergency === 1 || data.degreeOfEmergency === 2) {
        setCurrentAlertType("accident");
      } else if (data.degreeOfEmergency === 3) {
        setCurrentAlertType("evacuation");
      } else {
        setCurrentAlertType("sos");
      }
    }
  }, [data]);

  const navigation = useNavigation();
  const hanldeAddNewUser = () => {
    navigation.navigate("Add User" as never);
  };

  return (
    <>
      <ScrollView>
        <ScreenLayout>
          {/* TEMPORARY ADD USER BUTTON ---- DO NOT DELETE */}
          {/* <Button
            borderRadius="$full"
            w="$16"
            h="$16"
            bg="$transparent"
            alignSelf="flex-end"
            onPress={hanldeAddNewUser}
          >
            <AddUserIcon size={30} focussed={false} color="#FD9201" />
          </Button> */}

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
              <CommonDaysAccidentCard
                layout={"column"}
                daysWithoutAccident={0}
              />
            </Box>
            <Box flex={1}>
              <AlertSimulationCard layout={"column"} daysWithoutAccident={0} />
            </Box>
          </HStack>
        </ScreenLayout>
      </ScrollView>

      {/* DRAWER */}
      <Box style={styles.drawer}>
        {data && (
          <DrawerSupervisor
            alertType={currentAlertType} /* alertType="sos" */
            alertData={data}
          />
        )}
      </Box>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});
