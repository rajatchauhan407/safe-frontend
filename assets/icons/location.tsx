import React from "react";
import Svg, { Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const LocationIcon: React.FC<IIconProps> = ({ focussed,color, size }) => 
{
  const fillColor = focussed ? color : "#1E1E1E";
  return (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 14 18"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7 0.5C5.27669 0.502025 3.62451 1.21912 2.40594 2.49396C1.18738 3.7688 0.501935 5.49728 0.5 7.30018C0.5 10.067 2.41994 12.3646 4.45363 14.7965C5.09713 15.5666 5.76338 16.3631 6.3565 17.1689C6.4324 17.2719 6.52989 17.3554 6.64145 17.4128C6.75301 17.4702 6.87568 17.5 7 17.5C7.12432 17.5 7.24699 17.4702 7.35855 17.4128C7.47011 17.3554 7.5676 17.2719 7.6435 17.1689C8.23662 16.3631 8.90287 15.5666 9.54638 14.7965C11.5801 12.3646 13.5 10.067 13.5 7.30018C13.4981 5.49728 12.8126 3.7688 11.5941 2.49396C10.3755 1.21912 8.72331 0.502025 7 0.5ZM7 9.85024C6.51791 9.85024 6.04664 9.70068 5.6458 9.42048C5.24495 9.14028 4.93253 8.74201 4.74804 8.27605C4.56355 7.81008 4.51528 7.29735 4.60934 6.80268C4.70339 6.30802 4.93554 5.85364 5.27643 5.49701C5.61732 5.14037 6.05164 4.8975 6.52447 4.79911C6.9973 4.70071 7.4874 4.75121 7.93279 4.94422C8.37819 5.13723 8.75887 5.46408 9.02671 5.88344C9.29454 6.30279 9.4375 6.79582 9.4375 7.30018C9.4375 7.9765 9.18069 8.62512 8.72357 9.10335C8.26645 9.58158 7.64647 9.85024 7 9.85024Z"
      fill={fillColor}
    />
  </Svg>
)};

export default LocationIcon;