import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const AddUserIcon: React.FC<IIconProps> = ({ focussed, color, size }) => {
  const fillColor = focussed ? color : "#FD9201";
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none" /* xmlns="http://www.w3.org/2000/svg" */
    >
      <Path
        d="M19.5 12C19.5 8.685 16.815 6 13.5 6C10.185 6 7.5 8.685 7.5 12C7.5 15.315 10.185 18 13.5 18C16.815 18 19.5 15.315 19.5 12ZM22.5 15V18H27V22.5H30V18H34.5V15H30V10.5H27V15H22.5ZM1.5 27V30H25.5V27C25.5 23.01 17.505 21 13.5 21C9.495 21 1.5 23.01 1.5 27Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default AddUserIcon;
