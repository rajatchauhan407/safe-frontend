import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "../../components/layout/screenLayout";
import EmergencyInstructions from "../../components/worker/emergencyInstructions";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { deleteItem } from "../../lib/slices/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../lib/slices/authSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { useSelector} from "react-redux";
import { RootState} from "../../lib/store";
import { BACKEND_BASE_URL, LOCAL_BASE_URL } from "../../config/api";
import useRequest from "../../hooks/useRequest";

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { data, isLoading, error, fetchData }: any = useRequest(`${BACKEND_BASE_URL}/deleteToken`,'POST')
  let siteId = "";
  let userId  = "";
   if (user) {
    // console.log("logged in user>> " + user._id);
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
      // console.log("worker checked out during logout - "+userId);
    }
    catch{
    }
  }

  const handleLogout = async() => {
    await handleCheckout();
    await deleteItem('token');
    await deleteItem('user');  
    
    const options = {
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: user?.userId}), // Add null check
    }
    console.log("options", options);
    await fetchData(options);
    dispatch(logout());
    console.log("logged out");
    navigation.navigate('Login');
  };

  return (
  <>  
  <ScreenLayout>
      {/* <EmergencyInstructions emergency="A worker fell" /> */}
      <Button onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </Button>
  </ScreenLayout>
  </>
  );
};

export default Profile;