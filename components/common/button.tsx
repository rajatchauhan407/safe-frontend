import React from "react";
import { TouchableOpacityProps, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonText, ButtonIcon, AddIcon } from "@gluestack-ui/themed";
import Typography from "./typography";

interface CommonButtonProps extends TouchableOpacityProps {
  variant?: "fill" | "outline" | "rounded" | "text" | "underline";
  action?: "primary" | "secondary";
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
        : "#6C757D",
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
      borderRadius: isLogIn ? 100 : 4,
    },
    rounded: {
      backgroundColor: action === "primary" ? "#FD9201" : "#00AE8C",
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
      color: action === "primary" ? "#1E1E1E" : "#1E1E1E",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
    text: {
      fontFamily: "NunitoSans_600SemiBold",
      color: action === "primary" ? "#007BFF" : "#6C757D",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
    underline: {
      fontFamily: "NunitoSans_600SemiBold",
      color: action === "primary" ? "#007BFF" : "#6C757D",
      textDecorationLine: "underline",
      fontSize: buttonTextSize,
      fontWeight: "bold",
    },
  };

  const getButtonStyle = () => {
    let style = { ...buttonStyles[variant] };
    if (isDisabled) {
      style = {
        ...style,
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
      {showIcon && variant !== "text" && <ButtonIcon as={AddIcon} />}
      <Typography
        size={buttonTextSize}
        style={textStyles[variant as keyof typeof textStyles]}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default CommonButton;
