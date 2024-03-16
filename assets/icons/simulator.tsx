import React from "react";
import { TouchableOpacity } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const SimulatorIcon: React.FC<IIconProps> = ({ focussed, color, size }) => {
  const fillColor = focussed ? color : "#F8F8FF";

  return (
    <TouchableOpacity>
      <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <Circle cx="18" cy="18" r="18" fill="#00AE8C" />
        <Path
          d="M23.3338 16.7083C23.3338 17.3504 23.3338 17.9829 23.3338 18.625C24.3338 18.625 25.6338 18.625 26.6672 18.625C26.6672 17.9829 26.6672 17.3504 26.6672 16.7083C25.6338 16.7083 24.3338 16.7083 23.3338 16.7083Z"
          fill={fillColor}
        />
        <Path
          d="M21.6672 23.0429C22.4672 23.7233 23.5088 24.6242 24.3338 25.3333C24.6672 24.8254 25.0005 24.3079 25.3338 23.8C24.5088 23.0908 23.4672 22.19 22.6672 21.5C22.3338 22.0175 22.0005 22.535 21.6672 23.0429Z"
          fill={fillColor}
        />
        <Path
          d="M25.3338 11.5333C25.0005 11.0254 24.6672 10.5079 24.3338 10C23.5088 10.7092 22.4672 11.61 21.6672 12.3C22.0005 12.8079 22.3338 13.3254 22.6672 13.8333C23.4672 13.1433 24.5088 12.2521 25.3338 11.5333Z"
          fill={fillColor}
        />
        <Path
          d="M11.6672 14.7917C10.7505 14.7917 10.0005 15.6542 10.0005 16.7083V18.625C10.0005 19.6792 10.7505 20.5417 11.6672 20.5417H12.5005V24.375H14.1672V20.5417H15.0005L19.1672 23.4167V11.9167L15.0005 14.7917H11.6672ZM15.8588 16.4304L17.5005 15.2996V20.0337L15.8588 18.9029L15.4588 18.625H11.6672V16.7083H15.4588L15.8588 16.4304Z"
          fill={fillColor}
        />
        <Path
          d="M21.2505 17.6667C21.2505 16.3921 20.7672 15.2421 20.0005 14.4562V20.8675C20.7672 20.0912 21.2505 18.9412 21.2505 17.6667Z"
          fill={fillColor}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default SimulatorIcon;
