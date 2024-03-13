import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {Box, VStack, Text} from "@gluestack-ui/themed";
import { StyleSheet, Image, Animated, TouchableOpacity } from "react-native";
import CommonButton from "../../components/common/button";
import CommonCard from "../../components/common/card";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertButton from "../../components/common/alertButton";
import { NavigationProp } from "@react-navigation/native";
import * as Location from 'expo-location';
import { BACKEND_BASE_URL } from "../../config/api";
import { RootStackParamList } from "../../types/navigationTypes";
import Typography from "../../components/common/typography";
import ScreenLayout from "../../components/layout/screenLayout";
import LocationIcon from "../../assets/icons/location";
const Dashboard: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [userName, setUserName] = useState("George");
  const [siteLocation, setSiteLocation] = useState("Site A");
  const [checkInTime, setCheckInTime] = useState(""); 
  const [isInSiteZone, setIsInSiteZone] = useState(true);
  const [checkInErrorMessage, setCheckInErrorMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));


  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Simulating data fetching from the backend
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const fadeInTooltip = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeOutTooltip = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const getLocation = async (): Promise<Location.LocationObject | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return null;
      }
      const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
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
          //   siteId: "65e220e17fdb2514ce5b4a08",
          //   workerId: "65e7ac67dd916d546fe4c798",
          //   location: {
          //     latitude: location.coords.latitude,
          //     longitude: location.coords.longitude
          //   }
          // };

          //To simulate check-in successful during demo
          const checkInInfo = {
            siteId: "65e220e17fdb2514ce5b4a08",
            workerId: "65e7ac67dd916d546fe4c798",
            location: {
              latitude: 49.16196980896502,
              longitude: -123.14712911446713
            }
          };

          try {
            const res = await fetch(`${BACKEND_BASE_URL}checkin`, {
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
        siteId: "65e021fd0ff9467bbc9535f5",
        workerId: "65dbc52bbebd9d13c94f217e"
      };
      try {
        const res = await fetch(`${BACKEND_BASE_URL}checkout`, {
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

  useEffect(() => {
    if (!isInSiteZone) {
      fadeInTooltip();
    } else {
      fadeOutTooltip();
    }
  }, [isInSiteZone]);

  const handleOverlayPress = () => {
    fadeOutTooltip();
    setIsInSiteZone(true);
  };

  const getStatusText = () => {
    return isCheckedIn ? `Checked-in at ${checkInTime}` : "Off-site";
  };

  const CommonButtonContent = () => (
    <Box style={{ width: '100%' }}>
      <CommonButton variant="fill" isCheckIn={isCheckedIn} onPress={handleCheckInToggle}>
        <Typography size="2xl">{isCheckedIn ? 'Check Out' : 'Check In'}</Typography>
      </CommonButton>
    </Box>
  );

  const handleIncidentPress = () => {
    navigation.navigate('Alert Details' as never);
  };

  const GreetingSection = () => (
    <Text>
      <Typography size="md">{`Hi, ${userName}\n`}</Typography>
      <Typography size="2xl">Let's start building</Typography>
    </Text>  
  );

  const LocationSection = () => (
    <Box mt={10} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <LocationIcon size={13} color={''} focussed={false} />
      <Typography size="md" pl={5}>{siteLocation}</Typography>
    </Box>
  );

  const TooltipSection = () => (
    !isInSiteZone && (
      <Box style={{ ...styles.tooltip, opacity: fadeAnim }}>
        <Text style={styles.tooltipText}>{checkInErrorMessage}</Text>
      </Box>
    )
  );

  const OverlaySection = () => (
    !isInSiteZone && (
      <TouchableOpacity style={[styles.overlay, StyleSheet.absoluteFillObject]} activeOpacity={1} onPress={handleOverlayPress}>
      </TouchableOpacity>
    )
  );

  return (
    <ScreenLayout>
    <VStack space="sm" reversed={false}>
      <GreetingSection />
        <VStack space="lg" reversed={false} >
            <LocationSection />
            <TooltipSection />
            <OverlaySection />
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
            <AlertButton user="supervisor" emergency="sos" color="#000000" onPress={handleIncidentPress} />
        </VStack>
    </VStack>
    </ScreenLayout>
  );
};
  
const styles = StyleSheet.create({
    tooltip: {
      backgroundColor: 'white',
      width: '100%',
      alignItems: 'center',
      padding: 15,
      borderRadius: 15,
      position: 'absolute',
      top: 80, 
      left: 25,
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
    tooltipText: {
      color: 'red',
      textAlign: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      height: '150%',
      zIndex: 1,
    },
  });
  

export default Dashboard;
