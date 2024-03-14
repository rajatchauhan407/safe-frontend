import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button, ButtonIcon, VStack, Card} from '@gluestack-ui/themed';
import SosIcon from '../../assets/icons/sosButton';
import HazardIcon from '../../assets/icons/hazard';
import WhistleIcon from '../../assets/icons/whistle';
import WhistlesIcon from '../../assets/icons/3whistles';
import Typography from './typography';

interface AlertButtonProps extends TouchableOpacityProps {
  user?: 'worker' | 'supervisor';
  emergency?: 'report' | 'accident' | 'evacuation' | 'sos';
  level?: number;
  isDisabled?: boolean;
  showIcon?: boolean;
  iconSize?: number;
  color?: string;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  user = 'worker',
  emergency = 'report',
  isDisabled = false,
  level = 0,
  children,
  showIcon = true,
  iconSize = 64,
  color = "#ffffff",
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
        icon: SosIcon,
        iconSize: 64,
        title: 'Report Incident',
        description: 'Click to report an incident',
      },
      accident: {
        icon: WhistleIcon,
        iconSize: 64,
        title: 'Accident Reported',
        description: null,
      },
      evacuation: {
        icon: WhistlesIcon,
        iconSize: 176,
        title: 'Active Evacuation',
        description: null,
      },
    },
    supervisor: {
      accident: {
        icon: HazardIcon,
        iconSize: 64,
        title: 'Accident Reported',
        description: 'Go to emergency details',
      },
      evacuation: {
        icon: HazardIcon,
        iconSize: 64,
        title: 'Hazard Reported',
        description: 'Go to emergency details',
      },
      sos: {
        icon: SosIcon,
        iconSize: 64,
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
    disabled: { color: '#1E1E1E' },
  };
  
  const getButtonStyle = () => {
    const baseStyle = buttonStyles[user as keyof typeof buttonStyles]?.[emergency as keyof typeof buttonStyles[keyof typeof buttonStyles]] || {};
    const disabledStyle = isDisabled ? { backgroundColor: '#C0C0C0' } : {};
    const textColorStyle = showIcon ? { color: color } : {};
    return { ...baseStyle, ...disabledStyle, ...textColorStyle };
  };
  

const { icon: Icon, iconSize: buttonIconSize, title, description } = iconMapping[user as keyof typeof iconMapping][
  emergency as keyof typeof iconMapping[keyof typeof iconMapping]
];

const adjustedIconSize = typeof buttonIconSize === 'number' ? `${buttonIconSize}px` : buttonIconSize;

return (
  <Card p={0}>
    <Button isDisabled={isDisabled} {...props} style={{
      ...getButtonStyle(),
      height: 'auto',  
      padding: 30,
      borderRadius: 24,
    }}>
      <VStack alignItems="center" space="md">
        {showIcon && <ButtonIcon as={Icon} size={adjustedIconSize as "xs" | "sm" | "md" | "lg" | "xl" | "2xs" | undefined} style={{ fontSize: Number(adjustedIconSize), color:color}}  />}
        <Typography size="2xl" style={{color: isDisabled ? textStyles.disabled.color : textStyles[emergency] ? textStyles[emergency].color : textStyles.default.color, textTransform: 'uppercase'}}>
          {title}
        </Typography>
        <Typography size="lg" style={{color: isDisabled ? textStyles.disabled.color : textStyles[emergency] ? textStyles[emergency].color : textStyles.default.color, display: description ? 'block' : 'none'}}>
          {description}
        </Typography>
      </VStack>
    </Button>
  </Card>
)
};


export default AlertButton;
