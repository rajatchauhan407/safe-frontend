import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const NotCheckedInIcon: React.FC<IIconProps> = ({ focussed, color, size }) => {
  const fillColorOne = focussed ? color : "#D8D8D8";
  const fillColorTwo = focussed ? color : "#504F4F";
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      /* xmlns="http://www.w3.org/2000/svg" */
    >
      <Rect width="32" height="32" rx="16" fill={fillColorOne} />
      <Path
        d="M22 26.08L19.25 23.08L20.41 21.92L22 23.51L25.59 19.92L26.75 21.33L22 26.08ZM14.25 18.92H16.25V20.92H14.25V18.92ZM14.25 10.92H16.25V16.92H14.25V10.92ZM15.25 5.92001C20.75 5.92001 25.25 10.42 25.25 15.92L25.17 17.23C24.56 17.03 23.92 16.92 23.19 16.92L23.25 15.92C23.25 11.5 19.67 7.92001 15.25 7.92001C10.83 7.92001 7.25 11.5 7.25 15.92C7.25 20.34 10.83 23.92 15.25 23.92C15.96 23.92 16.64 23.83 17.3 23.66C17.38 24.34 17.58 24.98 17.87 25.57C17.03 25.8 16.15 25.92 15.25 25.92C9.72 25.92 5.25 21.42 5.25 15.92C5.25 10.42 9.72 5.92001 15.25 5.92001Z"
        fill={fillColorTwo}
        fill-opacity="0.933333"
      />
    </Svg>
  );
};

export default NotCheckedInIcon;
