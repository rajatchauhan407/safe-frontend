import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/worker/Dashboard";
import Alert from "../screens/worker/Alert";
import Profile from "../screens/worker/Profile";

const Tab = createBottomTabNavigator();

const WorkerNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={Dashboard} />
      <Tab.Screen name="Schedule" component={Alert} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default WorkerNavigator;
