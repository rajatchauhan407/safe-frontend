import React from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";


const ProfileIcon: React.FC<IIconProps> = ({focussed=false, color, size }) => {
    const fillColor = focussed ? color : "#BDBDBD";
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 25"
      fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.4114 6.53382C16.4114 9.82594 13.7178 12.5196 10.4256 12.5196C7.13348 12.5196 4.4399 9.82594 4.4399 6.53382C4.4399 3.24171 7.13348 0.548096 10.4256 0.548096C13.7178 0.548096 16.4114 3.24171 16.4114 6.53382ZM13.751 6.53382C13.751 4.70485 12.2546 3.20842 10.4256 3.20842C8.59665 3.20842 7.10022 4.70485 7.10022 6.53382C7.10022 8.3628 8.59665 9.85923 10.4256 9.85923C12.2546 9.85923 13.751 8.3628 13.751 6.53382Z"
        fill={fillColor}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.1073 24.6906H2.71069C2.17863 24.6906 1.67981 24.491 1.28076 24.092C0.914975 23.6929 0.715449 23.1276 0.748705 22.5955C1.11449 17.1419 5.27125 13.0517 10.3924 13.0517C15.5135 13.0517 19.6703 17.1419 20.0361 22.5955C20.0693 23.1608 19.8698 23.6929 19.504 24.092C19.1382 24.4578 18.6394 24.6906 18.1073 24.6906ZM17.3425 22.0302C16.7771 18.3723 13.9173 15.712 10.4256 15.712C6.93395 15.712 4.07411 18.4056 3.50879 22.0302H17.3425Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default ProfileIcon;
