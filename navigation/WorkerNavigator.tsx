import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/worker/Dashboard";
import Alert from "../screens/worker/Alert";
import Profile from "../screens/worker/Profile";
import IconConfig from "../navigation/config";
import {useToken} from "@gluestack-style/react";
const Tab = createBottomTabNavigator();

const WorkerNavigator: React.FC = () => {
  const successColor = useToken("colors", "success");
  return (
    <Tab.Navigator 
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          console.log(route.name);
          const IconComponent = IconConfig[route.name]?.component;
          console.log(IconComponent);
          return IconComponent ? <IconComponent focussed={focused} size={size} color={color} /> : null;
        },
        tabBarActiveTintColor: successColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: 'white', padding: 5, height: 60,paddingBottom:5}
      })}
      >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="SOS" component={Alert} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default WorkerNavigator;
