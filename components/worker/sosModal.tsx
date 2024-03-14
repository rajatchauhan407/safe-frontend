import React from 'react';
import { Button, Icon, Text } from '@gluestack-ui/themed';
import CustomModal from '../common/modal';

interface sosModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText: string;
  onPressButton: () => void;
}

const InfoModal: React.FC<sosModalProps> = ({ isOpen, onClose, title, description, buttonText, onPressButton }) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Icon name="information-circle" size={32} color="blue" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button onPress={onPressButton}>{buttonText}</Button>
    </CustomModal>
  );
};

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
};

export default InfoModal;
