import React from 'react';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './appNavigator';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="App"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="App" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
