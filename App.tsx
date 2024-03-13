import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { StyledProvider } from "@gluestack-style/react";
import { config } from './config/gluestack-ui.config';
import { useFonts } from 'expo-font';
import { NunitoSans_400Regular,NunitoSans_600SemiBold, NunitoSans_800ExtraBold} from '@expo-google-fonts/nunito-sans';
import {Provider} from 'react-redux';
import { store } from './lib/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_800ExtraBold
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  if(fontsLoaded){
    console.log("fonts loaded")
  }
  return (
    <GluestackUIProvider config={config}>
    <Provider store={store}>
          <NavigationContainer>
              <MainNavigator />
          </NavigationContainer>
    </Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
