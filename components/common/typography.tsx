import React from 'react';
import { Text } from '@gluestack-ui/themed';
import { useToken } from '@gluestack-style/react';
import { ITypographyProps } from '../../shared/interfaces/typography.interface';

const Typography: React.FC<ITypographyProps> = ({ size, color = "$black", textAlign ,variant, bold, children, ...props }) => {
  const fontFamily = bold ? 'NunitoSans_700Bold' : 'NunitoSans_400Regular';

  return (
    <Text
      size={size}
      color={color}
      textAlign={textAlign}
      style={{ fontFamily }}
      {...props}
    >
      {children}
    </Text>
  );
}

export default Typography;
