import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import Dropdown from "../components/common/Dropdown";
import Push from "../push";
// import DashboardIcon from '../assets/icons/dashboard';
// import SOSIcon from "../assets/icons/sos";
// import ProfileIcon from "../assets/icons/profile";

const LoginScreen: React.FC = () => {
  const [loginAs, setLoginAs] = useState<string>("");
  const [workerID, setWorkerID] = useState<string>("");
  const [supervisorID, setSupervisorID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    if (loginAs === "Supervisor") {
      navigation.navigate("Main", {
        screen: "Supervisor",
        params: { screen: "Dashboard" },
      });
    } else if (loginAs === "Worker") {
      navigation.navigate("Main", {
        screen: "Worker",
        params: { screen: "Dashboard" },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginAs("Supervisor")}
        >
          <Text style={styles.buttonText}>Supervisor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginAs("Worker")}
        >
          <Text style={styles.buttonText}>Worker</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Site</Text>
      <Dropdown />

      <Text style={styles.label}>
        {loginAs === "Worker" ? "Worker" : "Supervisor"} ID
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ID"
        onChangeText={(text) =>
          loginAs === "Worker" ? setWorkerID(text) : setSupervisorID(text)
        }
        value={loginAs === "Worker" ? workerID : supervisorID}
        autoCapitalize="none"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View >
          {/* <DashboardIcon focussed={false} color="black" size={44} /> */}
          {/* <SOSIcon focussed ={true} color="green" size={44} /> */}
          {/* <ProfileIcon color="black" size={44} /> */}
      </View>
      <Push/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FD9201",
    padding: 15,
    borderRadius: 5,
    width: "48%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#FD9201",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: "blue",
    borderColor: "blue",
    color: "white",
  },
});

export default LoginScreen;
