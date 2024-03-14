import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import CustomModal from "../../components/common/modal";
import SucessIcon from "../../assets/icons/sucess";
import { set } from "@gluestack-style/react";

const Alert: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonAction = () => {
    closeModal();
  };

  return (
    <View>
      <Button title="Show Modal" onPress={openModal} />
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        icon={<SucessIcon color={"#00AE8C"} size={60} focussed={false} />} 
        title="Your SOS alert has been reported to your supervisor. "
        description="On site first aid workers are on their way. "
        buttonText="Close"
        buttonAction={handleButtonAction}
      />
    </View>
  );
};

export default Alert;
