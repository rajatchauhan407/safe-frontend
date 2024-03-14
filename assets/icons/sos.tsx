import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const SOSIcon: React.FC<IIconProps> = ({ focussed, color, size, onLongPress, onPressOut }) => {
  const fillColor = focussed ? color : "#BDBDBD";
  
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPressOut={onPressOut}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 30 26"
        fill="none"
      >
        <Path
          d="M14.9997 5.65325L25.0397 22.9999H4.95967L14.9997 5.65325ZM14.9997 0.333252L0.333008 25.6666H29.6663L14.9997 0.333252ZM16.333 18.9999H13.6663V21.6666H16.333V18.9999ZM16.333 10.9999H13.6663V16.3333H16.333V10.9999Z"
          fill={fillColor}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default SOSIcon;
