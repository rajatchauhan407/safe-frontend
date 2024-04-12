import React, { useState, useEffect } from "react";
import { Alert, AlertText, Icon, CloseIcon } from "@gluestack-ui/themed";
import { TouchableOpacity, Animated } from "react-native";
import Typography from "./typography";

interface AlertMessageProps {
  backgroundColor: string;
  textColor?: string;
  iconColor?: string;
  text: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  backgroundColor,
  textColor = "#000",
  iconColor = "#000",
  text,
}) => {
  const [showAlert, setShowAlert] = useState(true);
  const [slideAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    if (showAlert) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500, 
        useNativeDriver: true,
      }).start();
    }
  }, [showAlert]);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          },
        ],
      }}
    >
      {showAlert && (
        <Alert
          pl={24}
          pr={24}
          borderRadius={0}
          action="info"
          variant="solid"
          backgroundColor={backgroundColor}
        >
          <AlertText>
            <Typography color={textColor}>{text}</Typography>
          </AlertText>
          <TouchableOpacity onPress={handleClose}>
            <Icon as={CloseIcon} m="$2" w="$4" h="$4" color={iconColor} />
          </TouchableOpacity>
        </Alert>
      )}
    </Animated.View>
  );
};

export default AlertMessage;
