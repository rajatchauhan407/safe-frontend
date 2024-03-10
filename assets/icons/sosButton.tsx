import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const sosIcon: React.FC<IIconProps> = ({ focussed,color, size }) => 
{
  const fillColor = focussed ? color : "#ffffff";
  return (
    <Svg 
    width={size}
    height={size}
    viewBox="0 0 72 64" 
    fill="none" 
    //xmlns="http://www.w3.org/2000/svg"
    >
        <Path d="M71.3258 56.5024L40.3066 2.49917C39.4077 0.934249 37.7978 0 36 0C34.2023 0 32.5923 0.934249 31.6934 2.49917L0.674169 56.5024C-0.224723 58.0673 -0.224723 59.9359 0.674169 61.5008C1.57301 63.0657 3.18296 64 4.98075 64H67.0193C68.817 64 70.4269 63.0657 71.3258 61.5008C72.2247 59.9359 72.2247 58.0673 71.3258 56.5024Z" 
            fill="#D0080F"/>
        <Path d="M39.3828 20L38.6094 43.6953H32.9844L32.1875 20H39.3828ZM32 51.0312C32 50.0312 32.3438 49.2031 33.0312 48.5469C33.7344 47.875 34.6562 47.5391 35.7969 47.5391C36.9531 47.5391 37.875 47.875 38.5625 48.5469C39.25 49.2031 39.5938 50.0312 39.5938 51.0312C39.5938 52 39.25 52.8203 38.5625 53.4922C37.875 54.1641 36.9531 54.5 35.7969 54.5C34.6562 54.5 33.7344 54.1641 33.0312 53.4922C32.3438 52.8203 32 52 32 51.0312Z" 
            fill="#F8F8FF"/>
    </Svg>
)};

export default sosIcon;
