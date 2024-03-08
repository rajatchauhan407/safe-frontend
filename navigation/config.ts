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
    dashboard:{
        component: DashboardIcon,
        label: "Dashboard"
    },
    profile:{
        component: ProfileIcon,
        label: "Profile"
    },
    sos:{
        component: SOSIcon,
        label: "SOS"
    }
}

export default IconConfig;
