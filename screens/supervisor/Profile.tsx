import React, { useState } from "react";
import { View, Text } from "react-native";
import SMSModal from "../../components/supervisor/SMSModal";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useSelector,useDispatch} from "react-redux";
import { RootState } from "../../lib/store";
import { logout } from "../../lib/slices/authSlice";
import { deleteItem } from "../../lib/slices/authSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
const Profile: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const openSMS = () => {
    setModalVisible(true);
  };

  const handleLogout = async() => {
      dispatch(logout());
      await deleteItem('token');
      await deleteItem('user');
      navigation.navigate('Login');
  };
  return (
    <View>
      <Text>Profile Screen Supervisor</Text>
      {/* <SMSModal onClose={handleCloseModal} visible={modalVisible} /> */}
      <Button onPress={openSMS}>
        <ButtonText>Open SMS again</ButtonText>
      </Button>
      <Button onPress={handleLogout} bg="$highlight">
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
};

export default Profile;
