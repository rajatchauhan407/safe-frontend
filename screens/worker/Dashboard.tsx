import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import CommonButton from "../../components/common/button";
import CommonCard from "../../components/common/card";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertButton from "../../components/common/alertButton";
import DrawerWorker from "../../components/worker/drawer";
import WorkerSafeZone from "../../components/worker/safeZone";
import * as Location from "expo-location";
import { BACKEND_BASE_URL, LOCAL_BASE_URL } from "../../config/api";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { Box, VStack, Text, set } from "@gluestack-ui/themed";
import AlertMessage from "../../components/common/alertMessage";
import Typography from "../../components/common/typography";
import ScreenLayout from "../../components/layout/screenLayout";
import LocationIcon from "../../assets/icons/location";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import websocketService from "../../services/websocket.service";
import useFetch from "../../hooks/useFetch";
import { ScrollView } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";

type DashboardProps = {
  route: RouteProp<RootStackParamList, "Dashboard">;
};

const Dashboard: React.FC<DashboardProps> = ({ route }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [siteLocation, setSiteLocation] = useState("");
  const [checkInTime, setCheckInTime] = useState(""); 
  const [isInSiteZone, setIsInSiteZone] = useState(true);
  const [checkInErrorMessage, setCheckInErrorMessage] = useState("");
  const [currentAlertType, setCurrentAlertType] = useState<
    "none" | "accident" | "evacuation"
  >("none");
  const [alertSent, setAlertSent] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if(route.params){
      const {alertSent} = route.params;
      setAlertSent(alertSent);
    }
  }, [route.params]);

  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.auth
  );
  let siteId = "";
  let userId = "";
  let userName = "";
  if (user) {
    console.log("logged in user>> " + user._id);
    userId = user._id;
    siteId = user.constructionSiteId || "";
    userName = `${user.firstName} ${user.lastName}`;
  }

  const { data, isLoading, error, fetchData }: any = useFetch(
    `${BACKEND_BASE_URL}/alert-worker?constructionSiteId=${siteId}`,
    "GET"
  );

  useEffect(() => {
    websocketService.connect();

    console.log("Connected to websocket");
    websocketService.subscribeToEvent("alertWorker", (data) => {
      console.log(data);
      if (data === true) {
        fetchData({
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });
        console.log("Alert received working to sucscription");
      setOpenDrawer(true);
      }
    });
    console.log(data);
    // return () => {
    //   websocketService.disconnect();
    // };
  },[]);

  /* Use this to change alert type */
  useEffect(() => {
    setCurrentAlertType("evacuation");
  }, []);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workerInfo = {
          workerId: userId,
        };
        const res = await fetch(`${BACKEND_BASE_URL}/workerstatus`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(workerInfo),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        if (data.data) {
          if (data.data[0].checkType === "check-in") {
            console.log("user is already checked in");
            let formattedTime = new Date(
              data.data[0].timeStamp
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            console.log(formattedTime);
            setIsCheckedIn(true);
            setCheckInTime(formattedTime);
          }
        }
      } catch (error) {
        //Error while connecting with backend
        console.error("Error:", error);
      }
    };

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

    fetchData();
    getSite();
  }, []);

  const getLocation = async (): Promise<Location.LocationObject | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return null;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      return location;
    } catch (error) {
      return null;
    }
  };

  const handleCheckInToggle = async () => {
    if (!isCheckedIn) {
      getLocation()
        .then(async (location) => {
          if (location) {
            console.log("Received location:", location);

            //Actual Location of the device
            // const checkInInfo = {
            //   siteId: siteId,
            //   workerId: userId,
            //   location: {
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude
            //   }
            // };

            //To simulate check-in successful during demo
            const checkInInfo = {
              siteId: siteId,
              workerId: userId,
              location: {
                latitude: 49.28300315023338,
                longitude: -123.12037620096916,
              },
            };

            try {
              const res = await fetch(`${BACKEND_BASE_URL}/checkin`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(checkInInfo),
                headers: {
                  "Content-type": "application/json",
                },
              });
              const data = await res.json();
              console.log(data);
              if (data.data) {
                if (data.data.message === "check in successful") {
                  let formattedTime = new Date(
                    data.data.time
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                  setIsCheckedIn(true);
                  setCheckInTime(formattedTime);
                } else if (
                  data.data.message === "Please be on site while check-in"
                ) {
                  setIsInSiteZone(false);
                  setCheckInErrorMessage(
                    "You are not in the site zone. Please reach the location to check in."
                  );
                  setCheckInTime("");
                  setIsCheckedIn(false);
                }
              } else {
                console.log(data.error.details);
                setIsInSiteZone(false);
                setCheckInErrorMessage(data.error.details);
                setCheckInTime("");
                setIsCheckedIn(false);
              }
            } catch (error) {
              //Error while connecting with backend
              console.error("Error:", error);
              setIsInSiteZone(false);
              setCheckInErrorMessage(
                "Unable to check-in - Something went wrong"
              );
              setCheckInTime("");
              setIsCheckedIn(false);
            }
          } else {
            setIsInSiteZone(false);
            setCheckInErrorMessage(
              "Please grant permission to access your location."
            );
            setCheckInTime("");
            setIsCheckedIn(false);
            console.log("Location permission not granted or error occurred.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Check-out process
      setIsCheckedIn(false);
      const checkOutInfo = {
        siteId: siteId,
        workerId: userId,
      };
      try {
        const res = await fetch(`${BACKEND_BASE_URL}/checkout`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(checkOutInfo),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        if (data.data) {
          console.log(data.data.message);
          if (data.data.message === "check out successful") {
            setCheckInTime("");
          }
        } else {
          console.log(data.error.details);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const getStatusText = () => {
    return isCheckedIn ? `Checked-in at ${checkInTime}` : "Off-site";
  };

  const CommonButtonContent = () => (
    <Box style={{ width: "100%" }}>
      <CommonButton
        variant="fill"
        isCheckIn={isCheckedIn}
        onPress={handleCheckInToggle}
        buttonTextSize={24}
      >
        {isCheckedIn ? "Check Out" : "Check In"}
      </CommonButton>
    </Box>
  );

  const handleIncidentPress = () => {
    navigation.navigate("Emergency Report" as never);
  };

  const GreetingSection = () => (
    <Text>
      <Typography size="md" bold>{`Hi, ${userName}\n`}</Typography>
      <Typography size="2xl" bold>
        Work smart, stay safe!
      </Typography>
    </Text>
  );

  const LocationSection = () => (
    <Box mt={10} mb={5} style={{ flexDirection: "row", alignItems: "center" }}>
      <LocationIcon size={13} color={""} focussed={false} />
      <Typography size="md" pl={5}>
        {siteLocation}
      </Typography>
    </Box>
  );

  const CheckInAlertMessage = () =>
    !isInSiteZone && (
      <Box>
        <AlertMessage
          backgroundColor="#D0080F"
          textColor="#ffffff"
          iconColor="#ffffff"
          text={checkInErrorMessage}
        />
      </Box>
    );

    const AlertSentMessage = () =>
      <Box>
        <AlertMessage
          backgroundColor="#00AE8C"
          textColor="#1E1E1E"
          iconColor="#1E1E1E"
          text="Your emergency has been reported"
        />
      </Box>;

  const TooltipSOS = () => {
    const [fadeAnim] = useState(new Animated.Value(0));

    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust duration as needed
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => fadeOut(), 5000);
      });
    };

    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
      if (isCheckedIn) {
        fadeIn();
      } else {
        fadeOut();
      }
    }, [isCheckedIn]);

    return (
      <Animated.View
        style={{
          ...styles.tooltip,
          opacity: fadeAnim,
        }}
      >
        <Typography textAlign={"center"} bold>
          Hold SOS button for 3 seconds to activate an SOS for help
        </Typography>
      </Animated.View>
    );
  };

  return (
    <>
    <ScrollView  style={{ backgroundColor: '#F8F8FF' }}>
      <CheckInAlertMessage />
      {alertSent && <AlertSentMessage />}
      <ScreenLayout>
        <VStack space="sm" reversed={false}>
          <GreetingSection />
          <VStack space="xs" reversed={false}>
            <LocationSection />
            <CommonCard
              title={
                <Text>
                  <Typography>Status:</Typography>{" "}
                  <Typography bold>{getStatusText()}</Typography>
                </Text>
              }
              content={<CommonButtonContent />}
            />
            <Box mt={16} mb={16}>
              <CommonDaysAccidentCard layout={"row"} daysWithoutAccident={0} />
            </Box>
            <AlertButton
              user="worker"
              emergency="report"
              isDisabled={!isCheckedIn}
              onPress={handleIncidentPress}
            />
          </VStack>
        </VStack>
        <TooltipSOS />
      </ScreenLayout>
      </ScrollView>
      {/* DRAWER */}
      <Box style={styles.drawer}>
          {data && (
            <DrawerWorker
              alertType={data.responseAction.actionType}
              emergencyType={data.emergencyType}
              level={data.degreeOfEmergency}
              workersInjured={data.workersInjured}
              isAlert={openDrawer}
            />
          )}
        </Box>
    </>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    width: "80%",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color and opacity as needed
  },
});

export default Dashboard;
