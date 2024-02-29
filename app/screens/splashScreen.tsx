import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    // Set a timeout and store its reference in the ref
    timeoutRef.current = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [navigation]);

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
