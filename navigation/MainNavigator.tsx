import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/Login";
import AlertReport from "../screens/worker/AlertReport";
import CheckedIn from "../screens/supervisor/CheckedIn";

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AlertDetails" component={AlertReport} />
      <Stack.Screen name="Checked In" component={CheckedIn} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
