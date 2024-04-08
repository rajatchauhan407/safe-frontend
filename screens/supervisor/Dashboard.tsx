import React, { useEffect, useState } from "react";
import { useNavigation, Link, RouteProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import {
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  get,
  set,
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
import { AppDispatch, RootState } from "../../lib/store";
import { BACKEND_BASE_URL, LOCAL_BASE_URL } from "../../config/api";
import useFetch from "../../hooks/useFetch";
import { IAlert } from "../../shared/interfaces/alert.interface";
import AddUserIcon from "../../assets/icons/addUser";
import AlertMessage from "../../components/common/alertMessage";
import CancelAlertModal from "../../components/common/cancelAlertModal";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../../types/navigationTypes";
import useRequest from "../../hooks/useRequest";
import { reviveAlert } from "../../lib/slices/authSlice";
type DashboardProps = {
  route: RouteProp<RootStackParamList, "Dashboard">;
};

const Dashboard: React.FC<DashboardProps> = ({ route }) => {
  // const [userName, setUserName] = useState("David");
  const [siteLocation, setSiteLocation] = useState("");
  const [currentAlertType, setCurrentAlertType] = useState<
    "none" | "accident" | "evacuation" | "sos"
  >("none");
  const [isAlert, setIsAlert] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);  
  const { isAuthenticated, status, user,dismissSupervisorAlert } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
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

// const isFocused = useIsFocused();
  const getAlert = async () => {
    // console.log("Fetching alert data")
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



  // useEffect(() => {
  //   if(isFocused){
  //     console.log('isfocused working');
  //     (async () => {
  //       await getAlert();
  //     })();
  //   }
  // },[isFocused])

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

    
    websocketService.subscribeToEvent("alert", (res) => {
      dispatch(reviveAlert());
    console.log("Alert received>> ", res);
      if (res === true) {
        getAlert();
        setIsAlert(true);
      }
      // console.log("Alert data>> ", data);
      // setData(data);
    });
  }, []);



  /* Use this to change alert type */
  useEffect(() => {
    // console.log("Alert data>> ", data);
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

  const [showCancelAlert, setShowCancelAlert] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { alertSent } = route.params;
      setShowCancelAlert(alertSent);
    }
  }, [route.params]);

  return (
    <>
      <ScrollView  style={{ backgroundColor: '#F8F8FF' }}>
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
          <Box mb={"$2"} pl={"$3"}>
            <Text>
              <Typography size="md" bold>{`Hi, ${userName}\n`}</Typography>
              <Typography size="2xl" bold>
                Prioritize safety!
              </Typography>
            </Text>
          </Box>

          {/* LOCATION */}
          <LocationComponent siteLocation={siteLocation} />

          {/* WORKERS CHECKED IN */}
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
        { !dismissSupervisorAlert && data && !data.resolved && (
          <DrawerSupervisor
            alertType={currentAlertType} /* alertType="sos" */
            alertData={data}
            isAlert={isAlert}
          />
        )}
      </Box>

      {/* CANCELED ALERT NOTIFICATION */}
      {showCancelAlert && (
        <Box position="absolute" top={0} right={0} left={0}>
          <AlertMessage
            backgroundColor="$neutral"
            text="Your alert has been cancelled!"
            textColor="#ffffff"
            iconColor="#ffffff"
          />
        </Box>
      )}
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
