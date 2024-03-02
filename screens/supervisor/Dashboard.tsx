import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import CommonButton from "../../components/common/button";

const Dashboard: React.FC = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);

  const handleCheckInToggle = () => {
    setCheckedIn(!isCheckedIn);
  };

  return (
    <View>
      <Text>Dashboard Screen Supervisor</Text>

      <View>
        <CommonButton buttonType="default" onPress={() => console.log('Default button clicked')}>
          Default Button
        </CommonButton>

        <CommonButton buttonType="checkIn" isCheckedIn={isCheckedIn} onPress={handleCheckInToggle}>
          {isCheckedIn ? 'Check Out' : 'Check In'}
        </CommonButton>
      </View>
    </View>
  );
};

export default Dashboard;
