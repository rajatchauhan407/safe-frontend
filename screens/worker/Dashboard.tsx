import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import CommonButton from "../../components/common/button";
import CommonCard from "../../components/common/card";
import CommonDaysAccidentCard from "../../components/common/daysAccident";
import AlertButton from "../../components/common/alertButton";

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

  const handleCheckInToggle = () => {
    if (!isCheckedIn) {
      const currentTime = new Date();
      setCheckInTime(formatTime(currentTime));
    } else {
      setCheckInTime("");
    }

    setCheckedIn(!isCheckedIn);
  };

  const getStatusText = () => {
    return isCheckedIn ? `Checked-in at ${checkInTime}` : "Off-site";
  };

  const CommonButtonContent = () => (
    <CommonButton buttonType="checkIn" isCheckedIn={isCheckedIn} onPress={handleCheckInToggle}>
      {isCheckedIn ? 'Check Out' : 'Check In'}
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
        <Text style={styles.greeting}>{`Hi, ${userName}`}</Text>
        {"\n"}
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
