import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading or checking user authentication
    setTimeout(() => {
      // Navigate to Login Screen after splash duration
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
