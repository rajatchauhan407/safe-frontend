// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Dashboard from "../screens/worker/Dashboard";
// import Alert from "../screens/worker/Alert";
// import Profile from "../screens/worker/Profile";
// import IconConfig from "../navigation/config";
// import {useToken} from "@gluestack-style/react";
// const Tab = createBottomTabNavigator();

// const WorkerNavigator: React.FC = () => {
//   const successColor = useToken("colors", "success");
//   return (
//     <Tab.Navigator 
//       initialRouteName="Dashboard"
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           console.log(route.name);
//           const IconComponent = IconConfig[route.name]?.component;
//           console.log(IconComponent);
//           return IconComponent ? <IconComponent focussed={focused} size={size} color={color} /> : null;
//         },
//         tabBarActiveTintColor: successColor,
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {backgroundColor: 'white', padding: 5, height: 85,paddingBottom:25}
//       })}
//       >
//       <Tab.Screen name="Dashboard" component={Dashboard} />
//       <Tab.Screen name="SOS" component={Alert} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// };

// export default WorkerNavigator;

import React, { useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/worker/Dashboard";
import Alert from "../screens/worker/Alert";
import Profile from "../screens/worker/Profile";
import IconConfig from "../navigation/config";
import { View, Button } from "react-native"; 
import CustomModal from "../components/common/modal";
import SucessIcon from "../assets/icons/sucess";
import { useToken } from "@gluestack-style/react";
import { IIconProps } from "../shared/interfaces/IIconProps.interface";

const Tab = createBottomTabNavigator();

const WorkerNavigator: React.FC = () => {
  const successColor = useToken("colors", "success");
  const [isOpen, setIsOpen] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonAction = () => {
    closeModal();
  };

  const handleSOSLongPress = () => {
    holdTimeoutRef.current = setTimeout(openModal, 300);
  };

  const handleSOSTabPressOut = () => {

    if (holdTimeoutRef.current !== null) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null; 
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            console.log(route.name);
            const IconComponent = IconConfig[route.name]?.component;
            console.log(IconComponent);
            return IconComponent ? (
              <IconComponent
                focussed={focused}
                size={size}
                color={color}
                onLongPress={route.name === "SOS" ? handleSOSLongPress : undefined} // Handle long press only for SOS tab
                onPressOut={route.name === "SOS" ? handleSOSTabPressOut : undefined} // Handle press out only for SOS tab
              />
            ) : null;
          },
          tabBarActiveTintColor: successColor,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "white", padding: 5, height: 85, paddingBottom: 25 },
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="SOS" component={Alert} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        icon={<SucessIcon color={"#00AE8C"} size={60} focussed={false} />}
        title="Your SOS alert has been reported to your supervisor."
        description="On site first aid workers are on their way."
        buttonText="Close"
        buttonAction={handleButtonAction}
      />
    </View>
  );
};

export default WorkerNavigator;
