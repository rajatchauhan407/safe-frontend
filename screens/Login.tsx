import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import Dropdown from "../components/common/Dropdown";
import ScreenLayout from "../components/layout/screenLayout";
import CommonButton from "../components/common/button";

/*** imports to use redux ***/
import { useDispatch, useSelector } from "react-redux";
import { changeAuth } from "../lib/slices/authSlice";
import { RootState, AppDispatch } from "../lib/store";
import { login } from "../lib/slices/authSlice";
import Push from "../push";
/*** imports end here****/

const LoginScreen: React.FC = () => {
  const [loginAs, setLoginAs] = useState<string>("");
  const [workerID, setWorkerID] = useState<string>("");
  const [supervisorID, setSupervisorID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // console.log(authState);
  const handleLogin = async () => {
    let userData = {
      userId: loginAs === "Worker" ? workerID : supervisorID,
      password: password,
    };
    // console.log(userData)
    try {
      const actionResult = await dispatch(login(userData));
      const { payload } = actionResult;
      console.log(actionResult);
      console.log(payload);
      if (actionResult.type === "auth/login/fulfilled") {
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
      } else {
        // Handle login failure
        console.error("Login failed:", payload);
        // Show an error message to the user, if desired
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  // ================== Redux ==================
  const handleRedux = () => {
    console.log(authState);
    // dispatch(changeAuth);
    dispatch(changeAuth());
    // console.log(authState);
  };
  // =========================================

  return (
    <ScreenLayout>
      <Box h="$full" w="$full">
        <Center>
          <Box h="$4/5" w="$full">
            <VStack h="$4/5" space="lg">
              {/* SAFE LOGO GOES HERE */}
              <Box>
                <Text mb="$1">Login as</Text>
                <HStack space="md">
                  <Box flex={1}>
                    <CommonButton
                      variant="rounded"
                      showIcon={true}
                      onPress={() => setLoginAs("Supervisor")}
                    >
                      <ButtonText fontSize="$lg" fontWeight="$bold">
                        Supervisor
                      </ButtonText>
                    </CommonButton>
                  </Box>
                  <Box flex={1}>
                    <CommonButton
                      variant="rounded"
                      onPress={() => setLoginAs("Worker")}
                    >
                      <ButtonText fontSize="$lg" fontWeight="$bold">
                        Worker
                      </ButtonText>
                    </CommonButton>
                  </Box>
                </HStack>
              </Box>

              <Dropdown />

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText fontWeight="$bold">
                    {loginAs === "Worker" ? "Worker" : "Supervisor"} ID
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    placeholder="EnterID"
                    onChangeText={(text) =>
                      loginAs === "Worker"
                        ? setWorkerID(text)
                        : setSupervisorID(text)
                    }
                    value={loginAs === "Worker" ? workerID : supervisorID}
                    autoCapitalize="none"
                    keyboardType="numeric"
                  />
                </Input>
              </FormControl>

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText fontWeight="$bold">
                    Password
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    placeholder="Enter Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                  />
                </Input>
              </FormControl>

              <Box mx="$5" mt="$5">
                <CommonButton variant="rounded" onPress={handleLogin}>
                  <ButtonText fontSize="$md" fontWeight="$bold">
                    Login
                  </ButtonText>
                </CommonButton>
              </Box>

              <Button variant="link" p="$0" size="sm" mt="$4">
                <ButtonText textDecorationLine="underline" color="#1E1E1E">
                  Forgot your password?
                </ButtonText>
              </Button>

              <View>
                {/* ======================================= */}
                {/* <Button
          bg="$success"
          p="$6"
          onPress={handleRedux}
        >
          <ButtonText>Click Me</ButtonText>
        </Button> */}
                {/* ===================================== */}

                {/* <DashboardIcon focussed={false} color="black" size={44} /> */}
                {/* <SOSIcon focussed ={true} color="green" size={44} /> */}
                {/* <ProfileIcon color="black" size={44} /> */}
              </View>
              {/* <Push/> */}
              {/* <AlertDetails/> */}
            </VStack>
          </Box>
        </Center>
      </Box>
    </ScreenLayout>
  );
};

export default LoginScreen;
