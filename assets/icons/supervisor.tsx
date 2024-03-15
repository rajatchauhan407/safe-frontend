import React from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const SupervisorIcon: React.FC<IIconProps> = ({
  focussed = false,
  color,
  size,
}) => {
  const fillColor = focussed ? color : "#1E1E1E";
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.35531 3.91421C5.49197 2.96911 5.91354 2.08814 6.56379 1.38879C7.21403 0.689451 8.06204 0.204982 8.99472 0V2.23861C8.99472 2.50524 9.10064 2.76096 9.28918 2.9495C9.47772 3.13805 9.73344 3.24397 10.0001 3.24397C10.2667 3.24397 10.5224 3.13805 10.711 2.9495C10.8995 2.76096 11.0054 2.50524 11.0054 2.23861V0C11.9379 0.205223 12.7856 0.689798 13.4356 1.38912C14.0856 2.08844 14.5069 2.96929 14.6435 3.91421H15.0269C15.2935 3.91421 15.5492 4.02013 15.7378 4.20867C15.9263 4.39721 16.0323 4.65293 16.0323 4.91957C16.0323 5.18621 15.9263 5.44193 15.7378 5.63047C15.5492 5.81901 15.2935 5.92493 15.0269 5.92493H14.6918C14.6918 7.16925 14.1975 8.3626 13.3176 9.24246C12.4377 10.1223 11.2444 10.6166 10.0001 10.6166C8.75576 10.6166 7.56242 10.1223 6.68255 9.24246C5.80269 8.3626 5.30839 7.16925 5.30839 5.92493H4.97327C4.70663 5.92493 4.45091 5.81901 4.26237 5.63047C4.07383 5.44193 3.96791 5.18621 3.96791 4.91957C3.96791 4.65293 4.07383 4.39721 4.26237 4.20867C4.45091 4.02013 4.70663 3.91421 4.97327 3.91421H5.35531ZM10.0001 8.6059C9.28904 8.6059 8.60713 8.32344 8.10435 7.82066C7.60157 7.31788 7.31911 6.63597 7.31911 5.92493H12.681C12.681 6.63597 12.3986 7.31788 11.8958 7.82066C11.393 8.32344 10.7111 8.6059 10.0001 8.6059ZM2.62742 16.6488C2.62742 16.3753 2.92233 15.5643 4.39686 14.693C4.49525 14.635 4.59491 14.5791 4.69579 14.5255L5.99204 17.9893H3.96791C3.61239 17.9893 3.27143 17.848 3.02004 17.5967C2.76865 17.3453 2.62742 17.0043 2.62742 16.6488ZM8.14217 17.9893L6.56174 13.7761C7.6796 13.4555 8.83715 13.2944 10.0001 13.2976C11.2467 13.2976 12.4129 13.4786 13.4384 13.7761L11.8593 17.9893H8.13949H8.14217ZM14.0068 17.9893H16.0323C16.3878 17.9893 16.7287 17.848 16.9801 17.5967C17.2315 17.3453 17.3727 17.0043 17.3727 16.6488C17.3727 16.3753 17.0778 15.5643 15.6033 14.693C15.5049 14.6349 15.4053 14.5791 15.3044 14.5255L14.0054 17.9893H14.0068ZM10.0001 11.2869C4.83922 11.2869 0.616699 13.9678 0.616699 16.6488C0.616699 17.5376 0.969772 18.39 1.59824 19.0185C2.22672 19.6469 3.07911 20 3.96791 20H16.0323C16.921 20 17.7734 19.6469 18.4019 19.0185C19.0304 18.39 19.3835 17.5376 19.3835 16.6488C19.3835 13.9678 15.1609 11.2869 10.0001 11.2869Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default SupervisorIcon;
