import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorNavigator from "./SupervisorNavigator";
import WorkerNavigator from "./WorkerNavigator";
import { createStackNavigator } from "@react-navigation/stack";

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Supervisor"
        component={SupervisorNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Worker"
        component={WorkerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainTabNavigator;
