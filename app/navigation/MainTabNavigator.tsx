import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorNavigator from "./SupervisorNavigator";
import WorkerNavigator from "./WorkerNavigator";

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Supervisor" component={SupervisorNavigator} />
      <Tab.Screen name="Worker" component={WorkerNavigator} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
