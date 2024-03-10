import React from 'react';
import { TouchableOpacityProps } from 'react-native';
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
      borderRadius: 10,
    },
    text: {
      backgroundColor: 'transparent',
    },
    underline: {
      borderBottomWidth: 1,
      borderColor: action === 'primary' ? '#007BFF' : '#6C757D',
      backgroundColor: 'transparent',
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
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

export default CommonButton;
