import React, { useState } from 'react';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup } from '@gluestack-ui/themed';
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
    const baseStyle: ViewStyle & TextStyle = {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 52,
      width: '100%',
    };

    const buttonStyles = {
      default: styles.defaultButton,
      checkIn: styles.checkInButton,
      whiteButton: styles.whiteButton,
      underline: styles.underlineButton,
    };

    const selectedStyle = buttonStyles[buttonType] || styles.defaultButton;

    let finalStyle = { ...baseStyle, ...selectedStyle };

    if (isCheckedIn && buttonType === 'checkIn') {
      finalStyle = { ...finalStyle, ...styles.checkedInButton };
    }

    if (disabled) {
      finalStyle = { ...finalStyle, ...styles.disabledButton };
    }

    if (isPressed && buttonType === 'whiteButton') {
      finalStyle = { ...finalStyle, ...styles.clickedButton };
    }

    return finalStyle;
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
    <ButtonGroup>
      <Button
        style={[styles.button, getButtonStyle()]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
      >
        <ButtonText style={[getButtonTextStyle()]}>{children}</ButtonText>
        {buttonType === 'whiteButton' && <ButtonSpinner />}
        {/* Add ButtonIcon here if needed */}
      </Button>
    </ButtonGroup>
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
