import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const DownArrowIcon: React.FC<IIconProps> = ({ focussed, color, size }) => {
  const fillColor = focussed ? color : "#1E1E1E";
  return (
    <Svg
      width="21"
      height="5"
      viewBox="0 0 42 10"
      fill="none" /* xmlns="http://www.w3.org/2000/svg" */
    >
      <Path
        d="M1 1L21 9L41 1"
        stroke={fillColor}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default DownArrowIcon;
