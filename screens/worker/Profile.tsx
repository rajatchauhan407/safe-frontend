import React from "react";
import { View, Text } from "react-native";
import AlertMessage from "../../components/common/alertMessage";

const Profile: React.FC = () => {
  return (
    <View>
      <AlertMessage backgroundColor="#00AE8C" text="Your incident has been reported" />
    </View>
  );
};

export default Profile;