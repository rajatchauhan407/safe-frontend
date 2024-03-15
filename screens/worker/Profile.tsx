import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "../../components/layout/screenLayout";
import AlertMessage from "../../components/common/alertMessage";

const Profile: React.FC = () => {
  return (
  <>  
  <AlertMessage backgroundColor="#00AE8C" text="Your incident has been reported" />
  <ScreenLayout>
    <View>
      <Text>Profile</Text>
    </View>
  </ScreenLayout>
  </>
  );
};

export default Profile;