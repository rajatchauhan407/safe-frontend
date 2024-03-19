import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const MedicalIcon: React.FC<IIconProps> = ({ color, size }) => {
  color = "#00AE8C"
  
  return (
    <Svg 
    width={size} 
    height={size}
    viewBox="0 0 48 48" 
    fill="none" 
    //xmlns="http://www.w3.org/2000/svg"
    >
    <Path d="M9.3418 9.41895H39.168V39.9111H9.3418V9.41895Z" 
    fill="#F8F8FF"/>
    <Path d="M24 0C10.7621 0 0 10.7621 0 24C0 37.2379 10.7621 48 24 48C37.2379 48 48 37.2379 48 24C48 10.7621 37.2379 0 24 0ZM27.6884 36.7326H20.3116V27.6884H11.2674V20.3116H20.3116V11.2674H27.6884V20.3116H36.7326V27.6884H27.6884V36.7326Z" 
    fill={color}/>
    </Svg>
  );
};

export default MedicalIcon;


