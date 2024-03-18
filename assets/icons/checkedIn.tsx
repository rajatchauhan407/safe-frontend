import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const CheckedInIcon: React.FC<IIconProps> = ({ focussed, color, size }) => {
  const fillColorOne = focussed ? color : "#FD9201";
  const fillColorTwo = focussed ? color : "#1E1E1E";
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none" /* xmlns="http://www.w3.org/2000/svg" */
    >
      <G clip-path="url(#clip0_891_33543)">
        <Rect width="32" height="32" rx="16" fill={fillColorOne} />
        <Path
          d="M24.35 16.25L25.75 17.66L19.22 24.25L15.75 20.75L17.15 19.34L19.22 21.42L24.35 16.25ZM14.25 7.75C15.3109 7.75 16.3283 8.17143 17.0784 8.92157C17.8286 9.67172 18.25 10.6891 18.25 11.75C18.25 12.8109 17.8286 13.8283 17.0784 14.5784C16.3283 15.3286 15.3109 15.75 14.25 15.75C13.1891 15.75 12.1717 15.3286 11.4216 14.5784C10.6714 13.8283 10.25 12.8109 10.25 11.75C10.25 10.6891 10.6714 9.67172 11.4216 8.92157C12.1717 8.17143 13.1891 7.75 14.25 7.75ZM14.25 9.75C13.7196 9.75 13.2109 9.96071 12.8358 10.3358C12.4607 10.7109 12.25 11.2196 12.25 11.75C12.25 12.2804 12.4607 12.7891 12.8358 13.1642C13.2109 13.5393 13.7196 13.75 14.25 13.75C14.7804 13.75 15.2891 13.5393 15.6642 13.1642C16.0393 12.7891 16.25 12.2804 16.25 11.75C16.25 11.2196 16.0393 10.7109 15.6642 10.3358C15.2891 9.96071 14.7804 9.75 14.25 9.75ZM14.25 16.75C14.93 16.75 15.75 16.84 16.66 17.01L14.99 18.68L14.25 18.65C11.28 18.65 8.15 20.11 8.15 20.75V21.85H14.35L16.25 23.75H6.25V20.75C6.25 18.09 11.58 16.75 14.25 16.75Z"
          fill={fillColorTwo}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_891_33543">
          <Rect width="32" height="32" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CheckedInIcon;
