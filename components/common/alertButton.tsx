import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button, ButtonIcon, VStack, Card} from '@gluestack-ui/themed';
import sosIcon from '../../assets/icons/sosButton';
import hazardIcon from '../../assets/icons/hazard';
import whistleIcon from '../../assets/icons/whistle';
import whistlesIcon from '../../assets/icons/3whistles';
import Typography from './typography';

interface AlertButtonProps extends TouchableOpacityProps {
  user?: 'worker' | 'supervisor';
  emergency?: 'report' | 'accident' | 'evacuation' | 'sos';
  level?: number;
  isDisabled?: boolean;
  showIcon?: boolean;
  iconSize?: number;
  iconColor?: string;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  user = 'worker',
  emergency = 'report',
  isDisabled = false,
  level = 0,
  children,
  showIcon = true,
  iconSize = 24,
  iconColor = '#1E1E1E',
  ...props
}) => {
  
  const buttonStyles = {
    worker: {
      report: {
        backgroundColor: '#ffffff',
      },
      accident: {
        backgroundColor: '#FD9201',
      },
      evacuation: {
        backgroundColor: '#D0080F',
      },
    },
    supervisor: {
      accident: {
        backgroundColor: '#FD9201',
      },
      evacuation: {
        backgroundColor: '#D0080F',
      },
      sos: {
        backgroundColor: '#D0080F',
      },
    },
  };

  const iconMapping = {
    worker:{
      report: {
        icon: sosIcon,
        iconColor: '#FF0000',
        iconSize: 32,
        title: 'Report Incident',
        description: 'Click to report an incident',
      },
      accident: {
        icon: whistleIcon,
        iconColor: '#FF0000',
        iconSize: 32,
        title: 'Accident Reported',
        description: null,
      },
      evacuation: {
        icon: whistlesIcon,
        iconColor: '#FFFFFF',
        iconSize: 320,
        title: 'Active Evacuation',
        description: null,
      },
    },
    supervisor: {
      accident: {
        icon: hazardIcon,
        iconColor: '#FF0000',
        iconSize: 32,
        title: 'Accident Reported',
        description: 'Go to emergency details',
      },
      evacuation: {
        icon: hazardIcon,
        iconColor: '#FF0000',
        iconSize: 32,
        title: 'Hazard Reported',
        description: 'Go to emergency details',
      },
      sos: {
        icon: sosIcon,
        iconColor: '#FF0000',
        iconSize: 32,
        title: 'SOS Reported',
        description: 'Go to SOS details',
      },
    }
  };

  const textStyles = {
    report: { color: '#1E1E1E' },
    accident: { color: '#1E1E1E' },
    evacuation: { color: '#ffffff' },
    sos: { color: '#ffffff' },
    default: { color: '#000000' },
  };
  
const getButtonStyle = () => {
  const style = buttonStyles[user as keyof typeof buttonStyles]?.[emergency as keyof typeof buttonStyles[keyof typeof buttonStyles]] || {};
  return isDisabled ? { ...style } : style;
};

const { icon: Icon, iconColor: buttonIconColor, iconSize: buttonIconSize, title, description } = iconMapping[user as keyof typeof iconMapping][emergency as keyof typeof iconMapping[keyof typeof iconMapping]];

const adjustedIconSize = typeof buttonIconSize === 'number' ? `${buttonIconSize}px` : buttonIconSize;

return (
  <Card p={0}>
    <Button isDisabled={isDisabled} {...props} style={{ ...getButtonStyle(),
      height: 'auto',  
      padding: 30,
      borderRadius: 24,
    }}>
      <VStack alignItems="center" space="md">
        {showIcon && <ButtonIcon as={Icon} size={adjustedIconSize as "xs" | "sm" | "md" | "lg" | "xl" | "2xs" | undefined} style={{ color: iconColor, fontSize: adjustedIconSize }} />}
        <Typography size="2xl" style={{ color: textStyles[emergency] ? textStyles[emergency].color : textStyles.default.color, textTransform: 'uppercase' }}>
          {title}
        </Typography>
        <Typography size="lg" style={{ color: textStyles[emergency] ? textStyles[emergency].color : textStyles.default.color, display: description ? 'block' : 'none' }}>
          {description}
        </Typography>
      </VStack>
    </Button>
  </Card>
);

export default AlertButton;
