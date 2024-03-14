import React from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@gluestack-ui/themed';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  const handleClose = (event: GestureResponderEvent) => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <View style={styles.modalContainer}>
          <ModalHeader>
            <ModalCloseButton onPress={handleClose} />
          </ModalHeader>
          {/* Empty content */}
          <ModalBody />
          <ModalFooter />
        </View>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default CustomModal;
