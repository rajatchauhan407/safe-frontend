import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/worker/Dashboard";
import Alert from "../screens/worker/Alert";
import Profile from "../screens/worker/Profile";

const Tab = createBottomTabNavigator();

const WorkerNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="SOS" component={Alert} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default WorkerNavigator;
