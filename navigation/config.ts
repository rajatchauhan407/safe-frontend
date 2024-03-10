import React from 'react';
import DashboardIcon from '../assets/icons/dashboard';
import ProfileIcon from '../assets/icons/profile';
import SOSIcon from '../assets/icons/sos';
import { IIconProps } from '../shared/interfaces/IIconProps.interface';

interface IIconConfig {
    [key: string]: {
        component: React.FC<IIconProps>;
        label: string;
    }
}

const IconConfig:IIconConfig = {
    Dashboard:{
        component: DashboardIcon,
        label: "Dashboard"
    },
    Profile:{
        component: ProfileIcon,
        label: "Profile"
    },
    SOS:{
        component: SOSIcon,
        label: "SOS"
    }
}

export default IconConfig;
