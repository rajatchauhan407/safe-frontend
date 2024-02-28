import React, { useState } from 'react';
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './components/common/SplashScreen';
import LoginScreen from './screens/Login';
import WorkerDashboard from './screens/worker/Dashboard';
import SupervisorDashboard from './screens/supervisor/Dashboard';
import WorkerAlertScreen from './screens/worker/Alert';
import SupervisorAlertScreen from './screens/supervisor/Alert';
import WorkerProfileScreen from './screens/worker/Profile';
import SupervisorProfileScreen from './screens/supervisor/Profile';
import GlobalHeader from './components/common/GlobalHeader';

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

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
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
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="WorkerTabNavigator"
                component={WorkerTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SupervisorTabNavigator"
                component={SupervisorTabNavigator}
                options={{ headerShown: false }}
              />
            </>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
