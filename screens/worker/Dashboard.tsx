import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import CommonButton from "../../components/common/button";
import CommonCard from "../../components/common/card";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertButton from "../../components/common/alertButton";
import * as Location from 'expo-location';
import { BACKEND_BASE_URL } from "../../config/api";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import {Box, VStack, Text} from "@gluestack-ui/themed";
import AlertMessage from "../../components/common/alertMessage";
import Typography from "../../components/common/typography";
import ScreenLayout from "../../components/layout/screenLayout";
import LocationIcon from "../../assets/icons/location";
import { useSelector} from "react-redux";
import { RootState} from "../../lib/store";

const Dashboard: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  // const [userName, setUserName] = useState("");
  const [siteLocation, setSiteLocation] = useState("Langara College 49th Ave");
  const [checkInTime, setCheckInTime] = useState(""); // New state variable for check-in time
  const [isInSiteZone, setIsInSiteZone] = useState(true);
  const [checkInErrorMessage, setCheckInErrorMessage] = useState("");
  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.auth
  );
  let siteId = "";
  let userId  = "";
  let userName = "";
  if (user) {
    console.log("logged in user>> " + user._id);
    userId=user._id;
    siteId = user.constructionSiteId || ""; 
    userName = `${user.firstName} ${user.lastName}`;
  } 

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workerInfo = {
          workerId : userId
        }
        const res = await fetch(`${BACKEND_BASE_URL}/workerstatus`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(workerInfo),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        if (data.data) {
          if (data.data[0].checkType === 'check-in') { 
            console.log("user is already checked in")            
            let formattedTime = new Date(data.data[0].timeStamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            console.log(formattedTime);
            setIsCheckedIn(true);
            setCheckInTime(formattedTime);
          }          
        } 
      } 
      catch (error) {
        //Error while connecting with backend
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const getLocation = async (): Promise<Location.LocationObject | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return null;
      }
      const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Lowest});
      return location;
    } catch (error) {
      return null;
    }
  };

  const handleCheckInToggle = async () => {
    if (!isCheckedIn) {
      getLocation().then(async (location) => {
        if (location) {
          console.log('Received location:', location);

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
              latitude: 49.16196980896502,
              longitude: -123.14712911446713
            }
          };

          try {
            const res = await fetch(`${BACKEND_BASE_URL}/checkin`, {
              method: "POST",
              credentials: 'include',
              body: JSON.stringify(checkInInfo),
              headers: {
                "Content-type": "application/json",
              },
            });
            const data = await res.json();
            console.log(data);
            if (data.data) {
              if (data.data.message === 'check in successful') {             
                let formattedTime = new Date(data.data.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                setIsCheckedIn(true);
                setCheckInTime(formattedTime);
              } else if (data.data.message === 'Please be on site while check-in') {
                setIsInSiteZone(false);
                setCheckInErrorMessage("You are not in the site zone. Please reach the location to check in.")
                setCheckInTime("");
                setIsCheckedIn(false);
              }
            } else {
              console.log(data.error.details)
              setIsInSiteZone(false);
              setCheckInErrorMessage(data.error.details)
              setCheckInTime("");
              setIsCheckedIn(false);
            }
          } catch (error) {
            //Error while connecting with backend
            console.error('Error:', error);
            setIsInSiteZone(false);
            setCheckInErrorMessage("Unable to check-in - Something went wrong")
            setCheckInTime("");
            setIsCheckedIn(false);
          }

        } else {
          setIsInSiteZone(false);
          setCheckInErrorMessage("Please grant permission to access your location.")
          setCheckInTime("");
          setIsCheckedIn(false);
          console.log('Location permission not granted or error occurred.');
        }
      }).catch(error => {
        console.error('Error:', error);
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
          credentials: 'include',
          body: JSON.stringify(checkOutInfo),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        if (data.data) {
          console.log(data.data.message)
          if (data.data.message === 'check out successful') {
            setCheckInTime("");
          }
        } else {
          console.log(data.error.details)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const getStatusText = () => {
    return isCheckedIn ? `Checked-in at ${checkInTime}` : "Off-site";
  };

  const CommonButtonContent = () => (
    <Box style={{ width: '100%' }}>
      <CommonButton variant="fill" isCheckIn={isCheckedIn} onPress={handleCheckInToggle} buttonTextSize={24} >
        {isCheckedIn ? 'Check Out' : 'Check In'}
      </CommonButton>
    </Box>
);

  const handleIncidentPress = () => {
    navigation.navigate('AlertDetails');
  };

  const GreetingSection = () => (
  <Text>
    <Typography size="md" bold>{`Hi, ${userName}\n`}</Typography>
    <Typography size="2xl" bold>Let's start building</Typography>
  </Text>
  );

  const LocationSection = () => (
  <Box mt={10} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <LocationIcon size={13} color={''} focussed={false} />
    <Typography size="md" pl={5}>{siteLocation}</Typography>
  </Box>
  );

  const CheckInAlertMessage = () => (
    !isInSiteZone && (
      <Box>
        <AlertMessage backgroundColor="#D0080F" textColor="#ffffff" iconColor="#ffffff" text={checkInErrorMessage} />
      </Box>
    )
  );

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
        }}>
        <Typography textAlign={'center'} bold>
          Hold SOS button for 3 seconds to activate an SOS for help
        </Typography>
      </Animated.View>
    );
  };

  return (
  <>
    <CheckInAlertMessage />
      <ScreenLayout>
        <VStack space="sm" reversed={false}>
          <GreetingSection />
          <VStack space="xs" reversed={false} >
            <LocationSection />
            <CommonCard
            title={
            <Text>
            <Typography>Status:</Typography> <Typography bold>{getStatusText()}</Typography>
            </Text>
            }
            content={<CommonButtonContent />}
            />
          <Box mt={16} mb={16}>
            <CommonDaysAccidentCard layout={'row'} daysWithoutAccident={0} />
          </Box>
            <AlertButton user="worker" emergency="report" isDisabled={!isCheckedIn} onPress={handleIncidentPress} />
          {/* <AlertButton user="worker" emergency="report" onPress={handleIncidentPress} /> */} 
          </VStack>
        </VStack>
        <TooltipSOS /> 
      </ScreenLayout> 
  </>
  );
};

const styles = StyleSheet.create({
tooltip: {
  backgroundColor: 'white',
  padding: 15,
  borderRadius: 15,
  position: 'absolute',
  bottom: 10,
  alignSelf: 'center',
  width: '80%',
  zIndex: 2,
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.2,
shadowRadius: 3,
elevation: 3,
},
});

export default Dashboard;