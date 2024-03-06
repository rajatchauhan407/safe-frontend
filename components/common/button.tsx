import React, { useState } from 'react';
import { Button } from '@gluestack-ui/themed';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CommonButtonProps {
  buttonType: 'default' | 'checkIn';
  isCheckedIn?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({ buttonType, isCheckedIn, children, onPress, disabled }) => {
  const [isPressed, setPressed] = useState(false);

  const getButtonStyle = (): ViewStyle & TextStyle => {
    let baseStyle: ViewStyle & TextStyle = {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    };

    switch (buttonType) {
      case 'default':
        baseStyle = { ...baseStyle, ...styles.defaultButton };
        break;
      case 'checkIn':
        baseStyle = { ...baseStyle, ...styles.checkInButton };
        if (isCheckedIn) {
          baseStyle = { ...baseStyle, ...styles.checkedInButton };
        }
        break;
      default:
        baseStyle = { ...baseStyle, ...styles.defaultButton };
    }

    if (disabled) {
      return { ...baseStyle, ...styles.disabledButton };
    }

    if (isPressed) {
      return { ...baseStyle, ...styles.clickedButton, ...styles.clickedButtonText };
    }

    return baseStyle;
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  return (
    <Button
      style={[styles.button, getButtonStyle()]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#FD9201',
    borderRadius: 100,
  },
  checkInButton: {
    backgroundColor: '#FD9201',
    borderWidth: 2,
    borderColor: '#FD9201',
    borderRadius: 8,
  },
  checkedInButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'green',
  },
  disabledButton: {
    backgroundColor: '#C7C7C7',
    opacity: 0.6,
  },
  clickedButton: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
  },
  clickedButtonText: {
    color: 'white',
  },
});

export default CommonButton;
