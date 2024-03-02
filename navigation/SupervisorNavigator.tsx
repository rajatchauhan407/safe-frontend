import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/supervisor/Dashboard";
import Alert from "../screens/supervisor/Alert";
import Profile from "../screens/supervisor/Profile";

const Tab = createBottomTabNavigator();

const SupervisorNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Alert" component={Alert} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default SupervisorNavigator;
