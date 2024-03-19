import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "../../components/layout/screenLayout";
import AlertMessage from "../../components/common/alertMessage";
import EmergencyInstructions from "../../components/worker/emergencyInstructions";
import AlertReceived from "../../components/worker/alertReceived";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { deleteItem } from "../../lib/slices/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../lib/slices/authSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const handleLogout = async() => {
    await deleteItem('token');
    await deleteItem('user');  
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
  <>  
  <AlertMessage backgroundColor="#00AE8C" text="Your incident has been reported" />
  <ScreenLayout>
      <AlertReceived type="accident" location="Zone 3 - Building B" emergency={"Fire hazard"} level={1} workersInjured={2} />
      {/* <EmergencyInstructions emergency="A worker fell" /> */}
      <Button onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </Button>
  </ScreenLayout>
  </>
  );
};

export default Profile;