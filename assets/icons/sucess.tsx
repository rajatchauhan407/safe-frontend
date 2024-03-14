import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const SucessIcon: React.FC<IIconProps> = ({ focussed, color, size }) => {
  
  return (
    <Svg 
    width={size} 
    height={60} 
    viewBox="0 0 61 60">
      <Path d="M30.5 0C13.94 0 0.5 13.44 0.5 30C0.5 46.56 13.94 60 30.5 60C47.06 60 60.5 46.56 60.5 30C60.5 13.44 47.06 0 30.5 0ZM30.5 54C17.27 54 6.5 43.23 6.5 30C6.5 16.77 17.27 6 30.5 6C43.73 6 54.5 16.77 54.5 30C54.5 43.23 43.73 54 30.5 54ZM44.27 16.74L24.5 36.51L16.73 28.77L12.5 33L24.5 45L48.5 21L44.27 16.74Z" 
      fill={color}/>
    </Svg>
  );
};

export default SucessIcon;


