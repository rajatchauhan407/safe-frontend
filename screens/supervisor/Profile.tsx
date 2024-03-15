import React from "react";
import { View, Text } from "react-native";
import SMSModal from "../../components/supervisor/SMSModal";

const Profile: React.FC = () => {
  return (
    <View>
      <Text>Profile Screen Supervisor</Text>
      <SMSModal />
    </View>
  );
};

export default Profile;
