import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const ElectricIcon: React.FC<IIconProps> = ({ color, size }) => {
  
  return (
    <Svg 
    width={size} 
    height={size}
    viewBox="0 0 64 64" 
    fill="none" 
    //xmlns="http://www.w3.org/2000/svg"
    >
    <Path d="M58.5816 41.3712L39.4515 6.28842C36.87 2.1182 33.8251 0 30.383 0C26.9409 0 23.8298 2.1182 21.3144 6.28842L2.1844 41.3712C0.728132 43.4894 0 45.3428 0 47.461C0 52.3593 4.17021 56 9.20094 56H51.565C56.6619 56 60.766 52.4255 60.766 47.461C60.8321 45.3428 60.0378 43.4894 58.5816 41.3712Z" 
    fill={color}/>
    <Path d="M29.8136 33.5987L28.677 48.6102C28.6503 48.9617 29.1466 49.0632 29.2601 48.7295L37.0941 25.6923C37.1832 25.4302 36.8999 25.1975 36.6601 25.3359L29.8841 29.2457C29.6766 29.3654 29.4195 29.2058 29.4347 28.9668L30.3127 15.2245C30.335 14.8754 29.8434 14.777 29.7296 15.1078L22.2612 36.8149C22.1709 37.0774 22.4548 37.3112 22.695 37.1723L29.3643 33.3163C29.5731 33.1956 29.8318 33.3581 29.8136 33.5987Z" 
    fill="white"/>
    </Svg>
  );
};

export default ElectricIcon;


