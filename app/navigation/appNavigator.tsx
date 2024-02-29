import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/splashScreen'; 
import LoginScreen from '../screens/login'; 
import WorkerDashboard from '../screens/worker/dashboard'; 
import SupervisorDashboard from '../screens/supervisor/dashboard';
import WorkerAlertScreen from '../screens/worker/alert';
import SupervisorAlertScreen from '../screens/supervisor/alert'; 
import WorkerProfileScreen from '../screens/worker/profile'; 
import SupervisorProfileScreen from '../screens/supervisor/profile'; 
import GlobalHeader from '../components/common/globalHeader'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const WorkerTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="WorkerDashboard" component={WorkerDashboard} />
    <Tab.Screen name="WorkerAlert" component={WorkerAlertScreen} />
    <Tab.Screen name="WorkerProfile" component={WorkerProfileScreen} />
  </Tab.Navigator>
);

const SupervisorTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="SupervisorDashboard" component={SupervisorDashboard} />
    <Tab.Screen name="SupervisorAlert" component={SupervisorAlertScreen} />
    <Tab.Screen name="SupervisorProfile" component={SupervisorProfileScreen} />
  </Tab.Navigator>
);

const appNavigator: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        header: ({ route, navigation }) => (
          <GlobalHeader title={route.name} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
        initialParams={{ setLoggedIn }}
      />
      {isLoggedIn && (
        <Stack.Screen
          name="WorkerTabNavigator"
          component={WorkerTabNavigator}
          options={{ headerShown: false }}
        />
      )}
      {isLoggedIn && (
        <Stack.Screen
          name="SupervisorTabNavigator"
          component={SupervisorTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default appNavigator;