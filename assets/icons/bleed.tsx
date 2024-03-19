import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const BleedIcon: React.FC<IIconProps> = ({ color, size }) => {
  color = "#00AE8C"
  
  return (
    <Svg 
    width={size} 
    height={size}
    viewBox="0 0 48 48" 
    fill="none" 
    //xmlns="http://www.w3.org/2000/svg"
    >
    <Path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" 
    fill={color}/>
    <Path d="M25.1552 12.0805C25.0461 11.9705 24.9163 11.8832 24.7733 11.8236C24.6303 11.764 24.4769 11.7333 24.322 11.7333C24.167 11.7333 24.0137 11.764 23.8706 11.8236C23.7276 11.8832 23.5978 11.9705 23.4887 12.0805C22.6085 12.9724 14.9333 20.941 14.9333 25.8114C14.9333 28.3014 15.9225 30.6894 17.6832 32.4501C19.4439 34.2108 21.832 35.2 24.322 35.2C26.812 35.2 29.2 34.2108 30.9607 32.4501C32.7215 30.6894 33.7106 28.3014 33.7106 25.8114C33.7106 20.941 26.0354 12.9724 25.1552 12.0805Z" 
    fill="#F8F8FF"/>
    </Svg>
  );
};

export default BleedIcon;


