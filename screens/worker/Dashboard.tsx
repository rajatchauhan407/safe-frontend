import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import CommonButton from "../../components/common/button";
import CommonCard from "../../components/common/card";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertButton from "../../components/common/alertButton";
import * as Location from 'expo-location';
import { BACKEND_BASE_URL } from "../../config/api";

const Dashboard: React.FC = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [userName, setUserName] = useState("George");
  const [siteLocation, setSiteLocation] = useState("Site A");
  const [checkInTime, setCheckInTime] = useState(""); // New state variable for check-in time

  useEffect(() => {
    // Simulating data fetching from the backend
    const fetchData = async () => {
      try {
        // Simulating a delay to mimic the asynchronous nature of data fetching
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // const response = await fetch("backend_api_url");
        // const userData = await response.json();
        // setUserName(userData.name);
        // setSiteLocation(userData.siteLocation);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedTime = `${hours % 12 || 12}:${minutes}${period}`;
    return formattedTime;
  };

  const getLocation = async (): Promise<Location.LocationObject | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // console.error('Location permission not granted');
        return null;
      }
      const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      // console.log('User location:', location);
      return location;
    } catch (error) {
      // console.error('Error getting location:', error);
      return null;
    }
  };

  const handleCheckInToggle = async () => {
   

    if (!isCheckedIn) {
      
      getLocation()
      .then(async (location) => {
        if (location) {
          console.log('Received location:', location);
          const checkInInfo = {
            siteId: "65e021fd0ff9467bbc9535f5",
            workerId: "65dbc52bbebd9d13c94f217e",
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
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
            if(data.data !== null)
            {
              if(data.data.message === 'check in successful')
              {
                console.log(data.data.message)
                const currentTime = new Date();
                setCheckInTime(formatTime(currentTime));
              }
            }
            else{
              console.log(data.error)
            }
           
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          console.log('Location permission not granted or error occurred.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
      // const currentTime = new Date();
      // setCheckInTime(formatTime(currentTime));
    } else {
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
        
        if(data.data !== null)
        {
          console.log(data.data.message)
          if(data.data.message === 'check out successful')
          {
            setCheckInTime("");
          }
        }
        else{
          console.log(data.error)
        }

      } catch (error) {
        console.error('Error:', error);
      }
      
    }

    setCheckedIn(!isCheckedIn);
  };

  const getStatusText = () => {
    return isCheckedIn ? `Checked-in at ${checkInTime}` : "Off-site";
  };

  const CommonButtonContent = () => (
    <CommonButton buttonType="checkIn" isCheckedIn={isCheckedIn} onPress={handleCheckInToggle}>
        <Text>{isCheckedIn ? 'Check Out' : 'Check In'}</Text>
    </CommonButton>
  );

  const handleIncidentPress = () => {
    // Handle navigation or any other logic when the incident is pressed
    console.log('Incident pressed');
  };

  return (
    <View style={styles.page}>
      {/* GREETING */}
      <Text>
        <Text style={styles.greeting}>{`Hi, ${userName}\n`}</Text>
        <Text style={styles.buildingText}>Let's start building</Text>
      </Text>
      <View style={{ height: 20 }} />

      {/* LOCATION */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Image source={userLocationIcon} style={{ width: 30, height: 30 }} /> */}
        <Text>{siteLocation}</Text>
      </View>

      {/* CARDS */}
      <View>
        <CommonCard title={<Text><Text style={{ fontWeight: 'normal' }}>Status:</Text> {getStatusText()}</Text>}content={<CommonButtonContent />}/>
      </View>
      <View style={{ height: 20 }} />
      <View>
        <CommonDaysAccidentCard layout={'row'} daysWithoutAccident={0} />
      </View>
      <View style={{ height: 20 }} />
      {/* ALERT BUTTON */}
      <View>
      <AlertButton level={0} userType="worker" onPress={handleIncidentPress} isCheckedIn={isCheckedIn} />
      </View>

    </View>
  );
};

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
});

export default Dashboard;
