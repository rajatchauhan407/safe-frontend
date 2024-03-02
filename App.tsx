import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Box } from "@gluestack-ui/themed";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      {/* <Box style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </Box> */}
      <NavigationContainer>
          <MainNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
