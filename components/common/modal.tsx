import React from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@gluestack-ui/themed';
import { View, StyleSheet, GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: JSX.Element;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, icon, title, description, buttonText, buttonAction }) => {
  const handleClose = (event: GestureResponderEvent) => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalBackdrop style={styles.overlay} />
      <ModalContent>
        <View style={styles.modalContainer}>
          <ModalHeader>
            <ModalCloseButton onPress={handleClose} />
          </ModalHeader>
          <ModalBody>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                {icon}
              </View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
              <TouchableOpacity style={styles.button} onPress={buttonAction}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </ModalBody>
          <ModalFooter />
        </View>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 24, 
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomModal;
