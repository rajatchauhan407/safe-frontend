import React, { useState } from 'react';
import { Alert, AlertText, Icon, CloseIcon } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import Typography from './typography';

interface AlertMessageProps {
  backgroundColor: string;
  textColor?: string;
  iconColor?: string;
  text: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ backgroundColor, textColor = '#000', iconColor = '#000', text }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    showAlert && (
      <Alert borderRadius={0} action="info" variant="solid" backgroundColor={backgroundColor}>
        <AlertText><Typography color={textColor}>{text}</Typography></AlertText>
        <TouchableOpacity onPress={handleClose}>
          <Icon as={CloseIcon} m="$2" w="$4" h="$4" color={iconColor} />
        </TouchableOpacity>
      </Alert>
    )
  );
};

export default AlertMessage;
