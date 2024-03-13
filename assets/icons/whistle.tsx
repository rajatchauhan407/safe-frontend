import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const whistleIcon: React.FC<IIconProps> = ({ focussed,color, size }) => 
{
  const fillColor = focussed ? color : "#1E1E1E";
  return (
    <Svg 
    width={size}
    height={size}
    viewBox="0 0 64 64" 
    fill="none" 
    //xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M20.8 22.4C15.2835 22.4 9.99294 24.5914 6.09218 28.4922C2.19142 32.3929 0 37.6835 0 43.2C0 45.9315 0.538008 48.6362 1.58331 51.1598C2.6286 53.6834 4.16072 55.9764 6.09218 57.9078C9.99294 61.8086 15.2835 64 20.8 64C23.5315 64 26.2362 63.462 28.7598 62.4167C31.2834 61.3714 33.5764 59.8393 35.5078 57.9078C37.4393 55.9764 38.9714 53.6834 40.0167 51.1598C41.062 48.6362 41.6 45.9315 41.6 43.2V38.112L64 32V22.4H28.8V28.8H22.4V22.4H20.8ZM28.8 0V16H22.4V0H28.8ZM13.92 16.896C11.776 17.408 9.728 18.176 7.776 19.2L0.448 9.216L5.632 5.44L13.92 16.896ZM50.752 9.216L45.824 16H37.92L45.568 5.44L50.752 9.216Z" 
        fill={fillColor}/>
    </Svg>
)};

export default whistleIcon;
