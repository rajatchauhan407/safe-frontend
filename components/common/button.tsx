import React from 'react';
import { TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';
import { Button, ButtonText, ButtonIcon, AddIcon } from '@gluestack-ui/themed';

interface CommonButtonProps extends TouchableOpacityProps {
  variant?: 'fill' | 'outline' | 'rounded' | 'text' | 'underline';
  action?: 'primary' | 'secondary';
  isDisabled?: boolean;
  isCheckIn?: any;
  showIcon?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  variant = 'fill',
  action = 'primary',
  isDisabled = false,
  children,
  showIcon = false,
  ...props
}) => {
  const buttonStyles = {
    fill: {
      backgroundColor: action === 'primary' ? '#007BFF' : '#6C757D',
    },
    outline: {
      borderColor: action === 'primary' ? '#007BFF' : '#6C757D',
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    rounded: {
      borderRadius: 100,
    },
    text: {
      backgroundColor: 'transparent',
    },
    underline: {
      backgroundColor: 'transparent',
    },
  } as const;

  const textStyles: Record<string, TextStyle | ViewStyle> = {
    fill: {
      color: '#FFFFFF',
    },
    outline: {
      color: action === 'primary' ? '#007BFF' : '#6C757D',
    },
    rounded: {
      color: action === 'primary' ? '#FFFFFF' : '#6C757D',
    },
    text: {
      color: action === 'primary' ? '#007BFF' : '#6C757D',
    },
    underline: {
      color: action === 'primary' ? '#007BFF' : '#6C757D',
      textDecorationLine: 'underline',
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
    <Button size="md" variant="solid" action={action} isDisabled={isDisabled} {...props} style={getButtonStyle()}>
      {showIcon && variant !== 'text' && <ButtonIcon as={AddIcon} />}
      <ButtonText style={textStyles[variant as keyof typeof textStyles]}>{children}</ButtonText>
    </Button>
  );
};

export default CommonButton;
