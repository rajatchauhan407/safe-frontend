import React from 'react';
import { Box, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@gluestack-ui/themed';
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
    <Modal size='lg' isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
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
              <Typography size="md" style={styles.title}>{title}</Typography>
              <Typography size="md" style={styles.description}>{description}</Typography>
              <Box style={{ width: '100%' }}>
                <CommonButton
                variant="rounded"
                action="primary"
                onPress={buttonAction}
                disabled={!isOpen}
              >
                {buttonText}
              </CommonButton></Box>
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
  modalContent: {
    borderRadius: 28, 
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CustomModal;
