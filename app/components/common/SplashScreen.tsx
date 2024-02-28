import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
};

export type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;
export type SplashScreenRouteProp = RouteProp<RootStackParamList, 'SplashScreen'>;

export interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
  route: SplashScreenRouteProp;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    // Your logic here
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default SplashScreen;
