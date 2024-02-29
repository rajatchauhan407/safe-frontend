import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';

interface LoginScreenProps extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const handleSupervisorLogin = () => {
    navigation.navigate('SupervisorDashboard');
  };

  const handleWorkerLogin = () => {
    navigation.navigate('WorkerDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSupervisorLogin}
        >
          <Text style={styles.buttonText}>Supervisor Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleWorkerLogin}
        >
          <Text style={styles.buttonText}>Worker Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
