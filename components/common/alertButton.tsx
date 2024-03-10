import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button, ButtonIcon, AddIcon } from '@gluestack-ui/themed';
import Typography from './typography';

interface CommonButtonProps extends TouchableOpacityProps {
  user?: 'worker' | 'supervisor';
  action?: 'report' | 'accident' | 'evacuation' | 'sos';
  level?: number;
  isDisabled?: boolean;
  showIcon?: boolean;
}

const AlertButton: React.FC<CommonButtonProps> = ({
  user = 'worker',
  action = 'report',
  isDisabled = false,
  level = 0,
  children,
  showIcon = false,
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
      report: {
        backgroundColor: '#1E1E1E',
      },
      accident: {
        backgroundColor: '#1E1E1E',
      },
      evacuation: {
        backgroundColor: '#ffffff',
      },
      sos: {
        backgroundColor: '#D0080F',
      },
    },
  };

  const iconMapping = {
    report: {
      icon: AddIcon,
      title: 'Report',
      description: 'Report an incident',
    },
    accident: {
      icon: AddIcon,
      title: 'Accident',
      description: 'Report an accident',
    },
    evacuation: {
      icon: AddIcon,
      title: 'Evacuation',
      description: 'Initiate evacuation',
    },
    sos: {
      icon: AddIcon,
      title: 'SOS',
      description: 'Emergency SOS',
    },
  };

  const getButtonStyle = () => {
    const style = buttonStyles[user]?.[action] || {};
    return isDisabled ? { ...style } : style;
  };

  const { icon: Icon, title, description } = iconMapping[action];

  return (
    <Button action={action} isDisabled={isDisabled} {...props} style={getButtonStyle()}>
      {showIcon && action !== 'text' && <ButtonIcon as={Icon} />}
      <Typography size="2xl" style={{ color: textStyles[action]?.color }}>
        {title} - {description}
      </Typography>
    </Button>
  );
};

export default AlertButton;
