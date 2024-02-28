import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const handleRoleSelection = (role: string) => {
    if (role === 'supervisor') {
      navigation.navigate('SupervisorDashboard');
    } else {
      navigation.navigate('WorkerDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <TouchableOpacity onPress={() => handleRoleSelection('supervisor')}>
        <Text style={styles.button}>Login as Supervisor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRoleSelection('worker')}>
        <Text style={styles.button}>Login as Worker</Text>
      </TouchableOpacity>
    </View>
  );
};

// Remove the default header
LoginScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});

export default LoginScreen;
