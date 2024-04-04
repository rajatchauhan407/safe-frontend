import React from "react";
import { TouchableOpacityProps, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonText, ButtonIcon, AddIcon } from "@gluestack-ui/themed";
import Typography from "./typography";
import { Camera } from "lucide-react-native";

interface CommonButtonProps extends TouchableOpacityProps {
  variant?: "fill" | "outline" | "rounded" | "text" | "underline" | "loginRounded" | "loginOutline";
  action?: "primary" | "secondary" | "positive" | "negative";
  isDisabled?: boolean;
  isCheckIn?: boolean;
  isLogIn?: boolean;
  showIcon?: boolean;
  buttonTextSize?: number;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  variant = "fill",
  action = "primary",
  isDisabled = false,
  isCheckIn = false,
  isLogIn = false,
  children,
  showIcon = false,
  buttonTextSize = 18,
  ...props
}) => {
  const buttonStyles = {
    fill: {
      backgroundColor: isCheckIn
        ? "#FFFFFF"
        : action === "primary"
        ? "#FD9201"
        : isDisabled
        ? "#C7C7C7"
        : "#C7C7C7",
      borderRadius: 16,
      borderWidth: 2,
      borderColor: isCheckIn
        ? "#00AE8C"
        : action === "primary"
        ? "#FD9201"
        : "#6C757D",
    },
    outline: {
      borderColor: action === "primary" ? "#FD9201" : "#6C757D",
      borderWidth: 1,
      backgroundColor: "transparent",
      borderRadius: 16,
    },
    loginOutline: {
      borderColor: "#1E1E1E",
      borderWidth: 1,
      backgroundColor: "transparent",
      borderRadius: isLogIn ? 100 : 4,
    },
    rounded: {
      backgroundColor:
        action === "primary"
          ? "#FD9201"
          : action === "secondary"
          ? "#00AE8C"
          : action === "positive"
          ? "#1E1E1E"
          : action === "negative"
          ? "#D0080F"
          : "#FFFFFF",
      borderRadius: 100,
    },
    loginRounded: {
      backgroundColor:"#1E1E1E",
      borderRadius: 100,
    },
    text: {
      backgroundColor: "transparent",
    },
    underline: {
      backgroundColor: "transparent",
    },
  } as const;

  const textStyles: Record<string, TextStyle | ViewStyle> = {
    fill: {
      fontFamily: "NunitoSans_600SemiBold",
      color: "#1E1E1E",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
    outline: {
      fontFamily: "NunitoSans_600SemiBold",
      color: action === "primary" ? "#007BFF" : "#6C757D",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
    rounded: {
      fontFamily: "NunitoSans_700Bold",
      color:
        action === "primary"
          ? "#1E1E1E"
          : action === "positive"
          ? "#FFFFFF"
          : "#FFFFFF",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
    text: {
      fontFamily: "NunitoSans_600SemiBold",
      color: action === "primary" ? "#1E1E1E" : "#6C757D",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
    underline: {
      fontFamily: "NunitoSans_600SemiBold",
      color: action === "primary" ? "#000000" : "#6C757D",
      textDecorationLine: "underline",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
  };

  const getButtonStyle = () => {
    let style: ViewStyle = { ...buttonStyles[variant] };
    if (isDisabled) {
      style = {
        ...style,
        backgroundColor: "#C7C7C7",
      };
    }
    return style;
  };

  return (
    <Button
      height={52}
      action={action}
      isDisabled={isDisabled}
      {...props}
      style={getButtonStyle()}
    >
      {showIcon && variant !== "text" && <ButtonIcon as={Camera} size="xl" />}
      <Typography
        size={buttonTextSize}
        style={{
          ...textStyles[variant as keyof typeof textStyles],
          marginLeft: showIcon && variant !== "text" ? 8 : 0,
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default CommonButton;
