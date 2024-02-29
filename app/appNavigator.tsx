import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './splashScreen';
import LoginScreen from './login';
import WorkerDashboard from './worker/dashboard';
import SupervisorDashboard from './supervisor/dashboard';
import GlobalHeader from '../components/common/globalHeader';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="WorkerDashboard" component={WorkerDashboard} />
      <Stack.Screen name="SupervisorDashboard" component={SupervisorDashboard} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
