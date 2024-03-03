import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import CommonButton from "../../components/common/button";
import CommonCard from "../../components/common/card";

const Dashboard: React.FC = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);

  const handleCheckInToggle = () => {
    setCheckedIn(!isCheckedIn);
  };

  const getStatusText = () => {
    return isCheckedIn ? "Status: On-Site" : "Status: Off-Site";
  };

  const CommonButtonContent = () => (
    <CommonButton buttonType="checkIn" isCheckedIn={isCheckedIn} onPress={handleCheckInToggle}>
      {isCheckedIn ? 'Check Out' : 'Check In'}
    </CommonButton>
  );

  return (
    <View>
      <Text>Dashboard Screen Supervisor</Text>

      <View>
        <CommonCard title={getStatusText()} content={<CommonButtonContent />} />
        <CommonButton buttonType="default" onPress={() => console.log('Default button clicked')}>
          Default Button
        </CommonButton>
        <CommonButton buttonType="default" disabled onPress={() => console.log('Disabled')}>
          Disabled Button
        </CommonButton>
      </View>
    </View>
  );
};

export default Dashboard;
