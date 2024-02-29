import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/login';
import SupervisorDashboard from './app/screens/supervisor/dashboard';
import WorkerDashboard from './app/screens/worker/dashboard';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  SupervisorDashboard: undefined;
  WorkerDashboard: undefined;
};


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SupervisorDashboard" component={SupervisorDashboard} />
        <Stack.Screen name="WorkerDashboard" component={WorkerDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
