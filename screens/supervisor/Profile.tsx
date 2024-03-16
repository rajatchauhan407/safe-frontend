import React, { useState } from "react";
import { View, Text } from "react-native";
import SMSModal from "../../components/supervisor/SMSModal";
import { Button, ButtonText } from "@gluestack-ui/themed";

const Profile: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const openSMS = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <Text>Profile Screen Supervisor</Text>
      <SMSModal onClose={handleCloseModal} visible={modalVisible} />
      <Button onPress={openSMS}>
        <ButtonText>Open SMS again</ButtonText>
      </Button>
    </View>
  );
};

export default Profile;
