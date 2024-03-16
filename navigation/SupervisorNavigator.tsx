import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/supervisor/Dashboard";
import Alert from "../screens/supervisor/Alert";
import Profile from "../screens/supervisor/Profile";
import IconConfig from "../navigation/config";
import { useToken } from "@gluestack-style/react";

const Tab = createBottomTabNavigator();

const SupervisorNavigator: React.FC = () => {
  const successColor = useToken("colors", "success");

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const IconComponent = IconConfig[route.name]?.component;
          return IconComponent ? (
            <IconComponent focussed={focused} size={size} color={color} />
          ) : null;
        },
        tabBarActiveTintColor: successColor,
        tabBarInactiveTintColor: "#6C6C6C",
        tabBarStyle: {
          backgroundColor: "white",
          padding: 5,
          height: 85,
          paddingBottom: 25,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Alert" component={Alert} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default SupervisorNavigator;
