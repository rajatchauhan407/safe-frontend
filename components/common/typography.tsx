import React from 'react';
import {Text} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';
import { ITypographyProps } from '../../shared/interfaces/typography.interface';

const Typography:React.FC<ITypographyProps> = ({size,variant,children,bold, ...props}) => {
    
        return (
        <Text 
            size={size}
            style={{fontFamily: 'NunitoSans_400Regular'}}
            {...props}
        >{children}</Text>
        )
}

export default Typography;