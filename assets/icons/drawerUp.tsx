import React from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";


const DrawerUpIcon: React.FC<IIconProps> = ({focussed=false, color, size }) => {
    const fillColor = focussed ? color : "#000";
  return (
    <Svg width="44" height="12" viewBox="0 0 44 12" fill="none">
<Path d="M2 10L22 2L42 10" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
</Svg>


  );
};

export default DrawerUpIcon;