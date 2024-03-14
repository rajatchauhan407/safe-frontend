import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import CustomModal from "../../components/common/modal";
import SucessIcon from "../../assets/icons/sucess";

const Alert: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonAction = () => {
    // Action to redirect to another page
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Text>Show Modal</Text>
      </TouchableOpacity>
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        icon={<SucessIcon color="green" size={40} />} 
        title="Example Title"
        description="This is a description."
        buttonText="Close Modal & Redirect"
        buttonAction={handleButtonAction}
      />
    </View>
  );
};

export default Alert;
