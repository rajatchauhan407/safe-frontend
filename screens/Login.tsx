import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Keyboard, Platform} from "react-native";
/* Expo Notification Imports*/
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";


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
import SupervisorIcon from "../assets/icons/supervisor";
import WorkerIcon from "../assets/icons/worker";

/*** imports to use redux ***/
import { useDispatch, useSelector } from "react-redux";
import { changeAuth } from "../lib/slices/authSlice";
import { RootState, AppDispatch } from "../lib/store";
import { login } from "../lib/slices/authSlice";
import Constants from "expo-constants";
import useRequest from "../hooks/useRequest";
import { LOCAL_BASE_URL } from "../config/api";
/*** imports end here****/

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loginAs, setLoginAs] = useState<string>("");
  const [workerID, setWorkerID] = useState<string>("");
  const [supervisorID, setSupervisorID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");

  const {data, isLoading, error, fetchData}: any = useRequest(`${LOCAL_BASE_URL}/storeToken`,'POST');


  const handlePswState = () => {
    Keyboard.dismiss();
    setShowPassword((showState) => !showState);
  };

  // const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  /** Function to register for push notifications and storing the expo push token in the db **/
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      if (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra.eas) {
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        // console.log(token);
        return token.data;
      } else {
        alert('Failed to get push token for push notification!');
        return;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }




  /**  Function to Handle Login */
  const handleLogin = async () => {
    let userData = {
      userId: loginAs === "Worker" ? workerID : supervisorID,
      password: password,
    };
    // console.log(userData)
    try {
      const actionResult = await dispatch(login(userData));
      const { payload } = actionResult;
      console.log("action result",payload);
      
      if (actionResult.type === "auth/login/fulfilled") {
       const token = await registerForPushNotificationsAsync();
       const options = {
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          token:token,
          userId:payload.user.userId,
          timestamp:new Date().toISOString(),
          platform:Platform.OS})
       }
       await fetchData(options)
       console.log(data);
       if(error){
          throw new Error('Failed to store token');
       }
        if (payload.user.role === "supervisor") {
          navigation.navigate("Main", {
            screen: "Supervisor",
            params: { screen: "Dashboard" },
          });
        } else if (payload.user.role === "worker") {
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
      // Handle login failure
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
