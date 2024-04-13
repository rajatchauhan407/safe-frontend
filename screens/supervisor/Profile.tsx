import React, { useState } from "react";
import ScreenLayout from "../../components/layout/screenLayout";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../lib/store";
import { logout } from "../../lib/slices/authSlice";
import { deleteItem } from "../../lib/slices/authSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { LOCAL_BASE_URL, BACKEND_BASE_URL } from "../../config/api";
import useRequest from "../../hooks/useRequest";
import CancelAlertModal from "../../components/common/cancelAlertModal";
const Profile: React.FC = () => {
  const [openSMS, setOpenSMS] = useState(false);
  const [cancelAlert, setCancelAlert] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { isAuthenticated, status, user,token } = useSelector(
    (state: RootState) => state.auth
  );
  const { data, isLoading, error, fetchData }: any = useRequest(
    `${BACKEND_BASE_URL}/deleteToken`,
    "POST"
  );

  const handleLogout = async () => {
    await deleteItem("token");
    await deleteItem("user");

    const options = {
      headers: {
        "Content-Type": "application/json",        
      },
      body: JSON.stringify({ userId: user?.userId }), // Add null check
    };
    console.log("options", options);
    await fetchData(options);

    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <>  
    <ScreenLayout>
        <Button onPress={handleLogout} bg="$highlight">
          <ButtonText>Logout</ButtonText>
        </Button>
    </ScreenLayout>
    </>
    );
};

export default Profile;
