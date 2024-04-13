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
    <Modal size='lg'isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalBackdrop style={[styles.overlay, styles.overlayAdditional]} />
      <ModalContent bg='$white' p={10} borderRadius={28} zIndex={3}>
          <ModalHeader>
            <ModalCloseButton onPress={handleClose} />
          </ModalHeader>
          <ModalBody>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                {icon}
              </View>
              <Typography size="lg" style={styles.title}>{title}</Typography>
              <Typography size="md" style={styles.description}>{description}</Typography>
              <Box style={{ width: '100%' }}>
                <CommonButton
                variant="rounded"
                action="primary"
                onPress={buttonAction}
                disabled={!isOpen}
                buttonTextSize={18}
              >
                {buttonText}
              </CommonButton></Box>
            </View>
          </ModalBody>
          <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgb(0, 0, 0, 1)',
    zIndex: 1,
  },
  overlayAdditional: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
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
    lineHeight: 22,
  },
});

export default CustomModal;
