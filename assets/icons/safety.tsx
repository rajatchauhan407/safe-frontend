import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const SafetyIcon: React.FC<IIconProps> = ({ color, size }) => {
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
        <Path d="M33.8481 14.4752C30.6369 14.2125 27.63 12.8404 25.353 10.5634L24.7691 9.95032C24.5356 9.71677 24.2145 9.6 23.8933 9.6C23.5722 9.6 23.2511 9.71677 23.0175 9.95032L22.4337 10.5634C20.1566 12.8404 17.1498 14.2125 13.9385 14.4752C13.2963 14.5336 12.8 15.0591 12.8 15.7013V19.2337C12.8 26.6487 16.8286 33.5382 23.2803 37.1874C23.4554 37.3041 23.689 37.3333 23.8933 37.3333C24.0977 37.3333 24.302 37.2749 24.5064 37.1874C30.958 33.5382 34.9867 26.6487 34.9867 19.2337V15.7013C34.9867 15.0591 34.4904 14.5336 33.8481 14.4752ZM29.2357 21.102L23.7766 27.0282C23.543 27.2618 23.2219 27.4077 22.9008 27.4369H22.8716C22.5505 27.4369 22.2293 27.3201 21.9958 27.0866L18.9305 23.9629C18.4634 23.4959 18.4634 22.7076 18.9305 22.2406C19.3976 21.7735 20.1858 21.7735 20.6529 22.2406L22.8424 24.43L27.4257 19.438C27.8928 18.9418 28.6518 18.9126 29.1481 19.3505C29.6444 19.8175 29.6735 20.6058 29.2357 21.102Z" 
        fill="#F8F8FF"/>
    </Svg>
  );
};

export default SafetyIcon;


