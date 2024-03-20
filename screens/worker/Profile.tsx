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
import { useSelector} from "react-redux";
import { RootState} from "../../lib/store";
import { BACKEND_BASE_URL } from "../../config/api";

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.auth
  );
  let siteId = "";
  let userId  = "";
   if (user) {
    console.log("logged in user>> " + user._id);
    userId=user._id;
    siteId = user.constructionSiteId || ""; 
  } 
  const handleCheckout = async() =>
  {
    try{
      const checkOutInfo = {
        siteId: siteId,
        workerId: userId,
      };
      const res = await fetch(`${BACKEND_BASE_URL}/checkout`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(checkOutInfo),
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log("worker checked out during logout - "+userId);
    }
    catch{
    }
  }

  const handleLogout = async() => {
    await handleCheckout();
    await deleteItem('token');
    await deleteItem('user');  
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
  <>  
  <AlertMessage backgroundColor="#00AE8C" text="Your incident has been reported" />
  <ScreenLayout>
      <AlertReceived type="evacuation" location="Zone 3 - Building B" emergency={"Struck by hazard"} level={2} workersInjured={5} />
      {/* <EmergencyInstructions emergency="A worker fell" /> */}
      <Button onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </Button>
  </ScreenLayout>
  </>
  );
};

export default Profile;