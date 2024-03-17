import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "../../components/layout/screenLayout";
import AlertMessage from "../../components/common/alertMessage";
import { Button, ButtonText } from "@gluestack-ui/themed";
const Profile: React.FC = () => {
  return (
  <>  
  <AlertMessage backgroundColor="#00AE8C" text="Your incident has been reported" />
  <ScreenLayout>
    <View>
      <Text>Profile</Text>
      <Button onPress={() => {}}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  </ScreenLayout>
  </>
  );
};

export default Profile;