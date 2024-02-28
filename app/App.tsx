import React from 'react';
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/common/SplashScreen';
import LoginScreen from './screens/Login';
import WorkerDashboard from './screens/worker/Dashboard';
import SupervisorDashboard from './screens/supervisor/Dashboard';
import GlobalHeader from './components/common/GlobalHeader';

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <AppNavigator />
    </GluestackUIProvider>
  );
};

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

export default App;
