import React from "react";
import Svg, { Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const DashboardIcon: React.FC<IIconProps> = ({ focussed,color, size }) => 
{
  const fillColor = focussed ? color : "#BDBDBD";
  return (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10.7079 24.3155L2.67056 24.3154C1.2039 24.3154 0.00389646 23.1154 0.00389646 21.6488V2.9821C0.00389646 1.51543 1.2039 0.31543 2.67056 0.31543L10.7079 0.31553V24.3155ZM13.449 24.3155H21.3456C22.8122 24.3155 24.0122 23.1155 24.0122 21.6489V12.3155H13.449V24.3155ZM24.0122 9.64886V2.9822C24.0122 1.51553 22.8122 0.31553 21.3456 0.31553H13.449V9.64886H24.0122Z"
      fill={fillColor}
    />
  </Svg>
)};

export default DashboardIcon;
