import React from 'react';
import {Text} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';
import { ITypographyProps } from '../../shared/interfaces/typography.interface';

const Typography:React.FC<ITypographyProps> = ({size, color, variant,children, ...props}) => {
    
        return (
        <Text 
            size={size}
            color='$black'
            style={{fontFamily: 'NunitoSans_400Regular'}}
            {...props}
        >{children}</Text>
        )
}

export default Typography;