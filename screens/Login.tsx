import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Keyboard } from "react-native";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Image,
  Input,
  InputField,
  InputSlot,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import Typography from "../components/common/typography";
import Dropdown from "../components/common/Dropdown";
import ScreenLayout from "../components/layout/screenLayout";
import CommonButton from "../components/common/button";
import { Ionicons } from "@expo/vector-icons";

/*** imports to use redux ***/
import { useDispatch, useSelector } from "react-redux";
import { changeAuth } from "../lib/slices/authSlice";
import { RootState, AppDispatch } from "../lib/store";
import { login } from "../lib/slices/authSlice";
import SupervisorIcon from "../assets/icons/supervisor";
import WorkerIcon from "../assets/icons/worker";
/*** imports end here****/

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loginAs, setLoginAs] = useState<string>("");
  const [workerID, setWorkerID] = useState<string>("");
  const [supervisorID, setSupervisorID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePswState = () => {
    Keyboard.dismiss();
    setShowPassword((showState) => !showState);
  };

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
  
  // checking if the user is already logged in

  return (
    <ScreenLayout>
      <Box h="$full" w="$full">
        <Center>
          <Box h="$4/5" w="$full">
            <VStack h="$4/5" space="lg">
              {/* LOGO */}
              <Box mx="$10" my="$5">
                <Image
                  w="$full"
                  source={{
                    uri: "https://techandtribe-eco.s3.us-east-2.amazonaws.com/safe-logo.png",
                  }}
                  alt="SAFE logo"
                />
              </Box>

              {/* LOGIN BUTTONS */}
              <Box>
                <Typography mb="$1">Login as</Typography>
                <HStack space="md">
                  <Box flex={1}>
                    <CommonButton
                      variant={loginAs === "Supervisor" ? "rounded" : "outline"}
                      isLogIn={true}
                      /* showIcon={true} */
                      onPress={() => setLoginAs("Supervisor")}
                    >
                      <HStack space="sm">
                        <Box>
                          <SupervisorIcon size={20} color="" focussed={false} />
                        </Box>
                        <Box>
                          <ButtonText>
                            <Typography buttonTextSize={24} bold>
                              Supervisor
                            </Typography>
                          </ButtonText>
                        </Box>
                      </HStack>
                    </CommonButton>
                  </Box>
                  <Box flex={1}>
                    <CommonButton
                      variant={loginAs === "Worker" ? "rounded" : "outline"}
                      isLogIn={true}
                      onPress={() => setLoginAs("Worker")}
                    >
                      <HStack space="sm">
                        <Box>
                          <WorkerIcon size={22} color="" focussed={false} />
                        </Box>
                        <Box>
                          <ButtonText>
                            <Typography buttonTextSize={24} bold>
                              Worker
                            </Typography>
                          </ButtonText>
                        </Box>
                      </HStack>
                    </CommonButton>
                  </Box>
                </HStack>
              </Box>

              {/* SELECT A SITE */}
              <Dropdown />

              {/* USER & PASSWORD */}
              <FormControl size="md" isRequired>
                <FormControlLabel>
                  <FormControlLabelText fontWeight="$bold">
                    <Typography color="$neutral" bold>
                      {loginAs === "Worker" ? "Worker" : "Supervisor"} ID
                    </Typography>
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

              <FormControl size="md" isRequired>
                <FormControlLabel>
                  <FormControlLabelText fontWeight="$bold">
                    <Typography color="$neutral" bold>
                      Password
                    </Typography>
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={!showPassword}
                  />
                  <InputSlot pr="$3" onPress={handlePswState}>
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="#1E1E1E"
                    />
                  </InputSlot>
                </Input>
              </FormControl>

              {/* LOGIN BUTTON */}
              <Box mx="$5" mt="$5">
                <CommonButton variant="rounded" onPress={handleLogin}>
                  <ButtonText>
                    <Typography color="$neutral" bold>
                      Login
                    </Typography>
                  </ButtonText>
                </CommonButton>
              </Box>

              <Button variant="link" p="$0" size="sm" mt="$4">
                <ButtonText textDecorationLine="underline" color="#1E1E1E">
                  <Typography>Forgot your password?</Typography>
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
