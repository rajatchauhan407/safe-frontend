import React from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@gluestack-ui/themed';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import CommonButton from './button';
import Typography from './typography';

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
    <Modal size='lg' isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} style={styles.modal}>
      <ModalBackdrop style={styles.overlay} />
      <ModalContent style={styles.modalContent}>
        <View style={styles.modalContainer}>
          <ModalHeader>
            <ModalCloseButton onPress={handleClose} />
          </ModalHeader>
          <ModalBody>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                {icon}
              </View>
              <Typography style={styles.title}>{title}</Typography>
              <Typography style={styles.description}>{description}</Typography>
              <CommonButton
                variant="fill"
                action="primary"
                onPress={buttonAction}
                disabled={!isOpen}
              >
                {buttonText}
              </CommonButton>
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 24, // Adjust the border radius of the modal component itself
  },
  modalContainer: {
    backgroundColor: 'white',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center', // Center the text horizontally
    marginBottom: 20,
  },
});

export default CustomModal;
