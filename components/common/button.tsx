import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';

interface CommonButtonProps extends TouchableOpacityProps {
  buttonType: 'default' | 'checkIn';
  isCheckedIn?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({ buttonType, isCheckedIn, ...props }) => {
  const [isPressed, setPressed] = useState(false);

  const getButtonStyle = (): ViewStyle => {
    let baseStyle: ViewStyle = {
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
  
    if (props.disabled) {
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
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1} 
      {...props}
    >
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
  defaultButton: {
    backgroundColor: '#FD9201',
    borderRadius:100,
  },
  checkInButton: {
    backgroundColor: '#FD9201',
    borderWidth: 2,
    borderColor: '#FD9201',
    borderRadius:8,
  },
  checkedInButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'green',
  },
  disabledButton: {
    backgroundColor: 'grey',
    borderColor: 'darkgrey',
    opacity: 0.6,
  },
  clickedButton: {
    backgroundColor: 'darkgrey',
  },
  clickedButtonText: {
    color: 'white',
  },
});

export default CommonButton;
