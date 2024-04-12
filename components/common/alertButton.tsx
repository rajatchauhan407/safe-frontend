import React from "react";
import { TouchableOpacityProps, Text } from "react-native";
import { Button, ButtonIcon, VStack, Card } from "@gluestack-ui/themed";
import SosIcon from "../../assets/icons/sosButton";
import SosRIcon from "../../assets/icons/sosRButton";
import HazardIcon from "../../assets/icons/hazard";
import HazardWIcon from "../../assets/icons/hazardW";
import WhistleIcon from "../../assets/icons/whistle";
import WhistlesIcon from "../../assets/icons/3whistles";
import Typography from "./typography";

interface AlertButtonProps extends TouchableOpacityProps {
  user?: "worker" | "supervisor";
  emergency?: "report" | "accident" | "evacuation" | "sos" | "oneWhistle" | "threeWhistles";
  level?: number;
  isDisabled?: boolean;
  showIcon?: boolean;
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  user = "worker",
  emergency = "report",
  isDisabled = false,
  level = 0,
  children,
  showIcon = true,
  iconSize = 64,
  iconColor = "#ffffff",
  textColor = "#ffffff",
  ...props
}) => {
  const buttonStyles = {
    worker: {
      report: {
        backgroundColor: "#ffffff",
      },
      accident: {
        backgroundColor: "#FD9201",
      },
      evacuation: {
        backgroundColor: "#D0080F",
      },
    },
    supervisor: {
      accident: {
        backgroundColor: "#FD9201",
      },
      evacuation: {
        backgroundColor: "#D0080F",
      },
      sos: {
        backgroundColor: "#D0080F",
      },
      oneWhistle: {
        backgroundColor: "#FD9201",
      },
      threeWhistles: {
        backgroundColor: "#D0080F",
      },
    },
  };

  const iconMapping = {
    worker: {
      report: {
        icon: SosRIcon,
        iconSize: 64,
        iconColor: "#000000",
        title: "Report Emergency",
        description: "Click to report an emergency",
      },
      accident: {
        icon: WhistleIcon,
        iconSize: 64,
        iconColor: "#000000",
        title: "Emergency Alert",
        description: "Click to acknowledge the alert.",
      },
      evacuation: {
        icon: WhistlesIcon,
        iconSize: 176,
        iconColor: "#000000",
        title: "Evacuation Alert",
        description: "An evacuation has been initiated. Proceed calmly to the safe zone.",
      },
    },
    supervisor: {
      accident: {
        icon: HazardIcon,
        iconSize: 64,
        iconColor: "#000000",
        title: "Alert Level 1 or 2",
        description: "Click to view emergency details",
      },
      evacuation: {
        icon: HazardWIcon,
        iconSize: 64,
        iconColor: "#000000",
        title: "Alert Level 3 ",
        description: "Click to view emergency details",
      },
      sos: {
        icon: SosIcon,
        iconSize: 64,
        iconColor: "#000000",
        title: "SOS Reported",
        description: "Click to view SOS details",
      },
      oneWhistle: {
        icon: WhistleIcon,
        iconSize: 64,
        iconColor: "#000000",
        title: "Alert Workers",
        description: "Click to trigger a sound alert.",
      },
      threeWhistles: {
        icon: WhistlesIcon,
        iconSize: 176,
        iconColor: "#000000",
        title: "Start Evacuation",
        description: "Click to trigger an evacuation alarm.",
      },
    },
  };

  const textStyles = {
    report: { textColor: "#1E1E1E" },
    accident: { textColor: "#1E1E1E" },
    evacuation: { textColor: "#ffffff" },
    sos: { textColor: "#ffffff" },
    threeWhistles: { textColor: "#ffffff" },
    default: { textColor: "#000000" },
    disabled: { textColor: "#1E1E1E" },
  };

  const getButtonStyle = () => {
    const baseStyle =
      buttonStyles[user as keyof typeof buttonStyles]?.[
        emergency as keyof (typeof buttonStyles)[keyof typeof buttonStyles]
      ] || {};
    const disabledStyle = isDisabled ? { backgroundColor: "#C0C0C0" } : {};
    const textColorStyle = showIcon ? { color: textColor } : {};
    return { ...baseStyle, ...disabledStyle, ...textColorStyle };
  };

  const iconMappingEntry = iconMapping[user as keyof typeof iconMapping]?.[emergency as keyof typeof iconMapping[keyof typeof iconMapping]];

  if (!iconMappingEntry) {
    return <Text>No icon mapping found for the combination of user: {user} and emergency: {emergency}</Text>;
  }

  const { icon: Icon,
    iconSize: buttonIconSize,
    title,
    description } = 
    iconMapping[user as keyof typeof iconMapping][emergency as keyof (typeof iconMapping)[keyof typeof iconMapping]];


  const adjustedIconSize =
    typeof buttonIconSize === "number" ? `${buttonIconSize}px` : buttonIconSize;

  return (
    <Card p={0} rounded={"$3xl"}>
      <Button
        isDisabled={isDisabled}
        {...props}
        style={{
          ...getButtonStyle(),
          height: "auto",
          padding: 30,
          borderRadius: 24,
        }}
      >
        <VStack alignItems="center" space="sm">
          {showIcon && (
            <ButtonIcon
              as={Icon}
              size={
                adjustedIconSize as
                  | "xs"
                  | "sm"
                  | "md"
                  | "lg"
                  | "xl"
                  | "2xs"
                  | undefined
              }
              style={{ fontSize: Number(adjustedIconSize), color: iconColor }}
            />
          )}
          <Typography
            size="2xl"
            style={{
              color: isDisabled
                ? textStyles.disabled.textColor
                : textStyles[emergency as keyof typeof textStyles]
                ? textStyles[emergency as keyof typeof textStyles].textColor
                : textStyles.default.textColor,
              textTransform: "uppercase",
              fontFamily: "NunitoSans_700Bold",
            }}
          >
            {title}
          </Typography>
          {description && (
            <>
              <Typography
                size="lg"
                style={{
                  color: isDisabled
                    ? textStyles.disabled.textColor
                    : textStyles[emergency as keyof typeof textStyles]?.textColor || textStyles.default.textColor,
                }}
              >
                {description}
              </Typography>
            </>
          )}
        </VStack>
      </Button>
    </Card>
  );
};

export default AlertButton;
