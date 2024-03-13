import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const DaysCheckIcon: React.FC<IIconProps> = ({ focussed,color, size }) => 
{
  const fillColor = focussed ? color : "#00AE8C";
  return (
    <Svg 
    width={size}
    height={size}
    viewBox="0 0 36 36" 
    fill={color} 
    // xmlns="http://www.w3.org/2000/svg" 
    >
    <Circle cx="18" cy="18" r="18" fill={color}/>
    <Path d="M29 17.9999L26.56 15.2199L26.9 11.5399L23.29 10.7199L21.4 7.53992L18 8.99992L14.6 7.53992L12.71 10.7199L9.1 11.5299L9.44 15.2099L7 17.9999L9.44 20.7799L9.1 24.4699L12.71 25.2899L14.6 28.4699L18 26.9999L21.4 28.4599L23.29 25.2799L26.9 24.4599L26.56 20.7799L29 17.9999ZM16 22.9999L12 18.9999L13.41 17.5899L16 20.1699L22.59 13.5799L24 14.9999L16 22.9999Z" 
    fill="white"/>
    </Svg>
    
)};

export default DaysCheckIcon;
