import React from "react";
import Svg, { Circle, Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { IIconProps } from "../../shared/interfaces/IIconProps.interface";

const FireHazardIcon: React.FC<IIconProps> = ({ color, size }) => {
  
  return (
    <Svg 
    width={size} 
    height={size}
    viewBox="0 0 61 56" 
    fill="none" 
    //xmlns="http://www.w3.org/2000/svg"
    >
    <Path d="M58.5816 41.3712L39.4515 6.28842C36.87 2.1182 33.8251 0 30.383 0C26.9409 0 23.8298 2.1182 21.3144 6.28842L2.1844 41.3712C0.728132 43.4894 0 45.3428 0 47.461C0 52.3593 4.17021 56 9.20094 56H51.565C56.6619 56 60.766 52.4255 60.766 47.461C60.8321 45.3428 60.0378 43.4894 58.5816 41.3712Z" 
    fill={color}/>
    <Path d="M33.4274 44.5359C33.7015 44.4758 33.9689 44.4089 34.2297 44.3287C37.7332 43.3458 40.8889 40.7517 40.782 36.8471C40.7017 34.3933 38.9968 32.6416 38.2012 30.4285C37.436 28.2322 37.2068 25.8849 37.5326 23.5821C37.6864 22.3518 36.757 22.7396 36.1954 23.4082C35.2428 24.4917 34.5418 25.7726 34.1428 27.1591C33.8753 28.1553 33.7082 29.5125 32.6518 30.0073C31.094 30.7427 30.6527 28.5564 30.6126 27.4733C30.5658 25.2736 30.6661 22.9402 29.944 20.8341C29.3425 19.0048 28.1915 17.4054 26.6478 16.2542C26.4739 16.1205 26.3335 15.9199 26.0327 16.0336C25.7318 16.1472 25.8588 16.4615 25.8588 16.7022C25.8422 16.8443 25.8422 16.9879 25.8588 17.1301C26.5809 22.8733 23.9734 28.5431 20.9513 33.2232C20.2066 34.2923 19.6252 35.4663 19.2263 36.7066C18.9707 37.5734 18.9309 38.4895 19.1104 39.3751C19.2899 40.2608 19.6831 41.0891 20.256 41.788C21.6564 43.288 23.5361 44.2527 25.5713 44.5159C26.026 44.5828 26.1865 44.4423 25.9324 44.0211C25.6244 43.5402 25.3985 43.0115 25.2638 42.4566C24.6874 39.403 25.1021 36.2452 26.4472 33.4439C26.6077 33.0628 26.7414 33.2567 26.7882 33.5709C26.835 33.8852 26.8885 34.1927 26.9353 34.5003C27.0289 35.1221 27.1292 35.7506 27.283 36.3657C27.5178 37.6136 28.1825 38.7397 29.1617 39.5482C29.3786 39.7218 29.6324 39.8434 29.9036 39.9037C30.1748 39.9639 30.4562 39.9613 30.7262 39.8959C31.5085 39.6685 31.8896 38.7526 32.2908 38.084C32.5448 37.6962 33.053 37.402 33.4541 37.7764C33.7312 38.0814 33.9145 38.4598 33.9823 38.8662C34.1395 39.5798 34.1395 40.319 33.9823 41.0325C33.7765 41.9265 33.3566 42.757 32.7588 43.4528C32.6669 43.5605 32.6116 43.6945 32.6008 43.8356C32.5899 43.9767 32.6242 44.1175 32.6985 44.238C32.7728 44.3584 32.8834 44.4521 33.0144 44.5056C33.1454 44.5592 33.29 44.5698 33.4274 44.5359Z" 
    fill="white"/>
    </Svg>
  );
};

export default FireHazardIcon;


