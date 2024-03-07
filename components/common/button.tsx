import React, { useState } from 'react';
import { Button } from '@gluestack-ui/themed';
import { StyleSheet, ViewStyle, TextStyle, Text } from 'react-native';

interface CommonButtonProps {
  buttonType: 'default' | 'checkIn' | 'whiteButton' | 'underline';
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
      case 'whiteButton':
        baseStyle = { ...baseStyle, ...styles.whiteButton };
        break;
      case 'underline':
          baseStyle = { ...baseStyle, ...styles.underlineButton };
      break;
      default:
        baseStyle = { ...baseStyle, ...styles.defaultButton };
    }

    if (disabled) {
      return { ...baseStyle, ...styles.disabledButton };
    }

    if (isPressed && buttonType === 'whiteButton') {
      return { ...baseStyle, ...styles.clickedButton };
    }

    return baseStyle;
  };

  const getButtonTextStyle = (): TextStyle => {
    if (isPressed && buttonType === 'whiteButton') {
      return styles.clickedButtonText;
    }
    if (buttonType === 'underline') {
      return styles.underlineText;
    }
    return {};
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
      <Text style={[getButtonTextStyle()]}>{children}</Text>
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
    width: '100%',
  },
  whiteButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  underlineButton: {
    backgroundColor: 'transparent',
  },
  underlineText: {
    textDecorationLine: 'underline',
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
