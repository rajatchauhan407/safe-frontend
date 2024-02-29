import React from 'react';
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import AppNavigator from './app/navigation/appNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;