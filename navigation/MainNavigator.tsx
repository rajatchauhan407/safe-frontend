import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { verifyToken } from "../lib/slices/authSlice";
import { getItem } from "../lib/slices/authSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
// import { IUser } from "../shared/interfaces/user.interface";

/* SCREENS */
import LoginScreen from "../screens/Login";
import AlertReport from "../screens/worker/AlertReport";
import CheckedIn from "../screens/supervisor/CheckedIn";
import SafeZone from "../screens/supervisor/SafeZone";
import ReceivedAlertDetails from "../screens/supervisor/ReceivedAlert";
import WorkerSafeZone from "../components/worker/safeZone";
import Dashboard from "../screens/supervisor/Dashboard";

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const token = await getItem("token");
        console.log(token);
        if (token) {
          dispatch(verifyToken(token));
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveToken();
  }, [dispatch]);
  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    console.log(status);

    if (isAuthenticated) {
      // Navigate to the Main screen if authenticated
      if (user && user.role === "worker") {
        navigation.navigate("Main", {
          screen: "Worker",
          params: { screen: "Dashboard" },
        });
      }
      if (user && user.role === "supervisor") {
        navigation.navigate("Main", {
          screen: "Supervisor",
          params: { screen: "Dashboard" },
        });
      }
    }
  }, [isAuthenticated, navigation]);
  // if(status === 'loading' || 'idle'){
  //   return <Text>Loading...</Text>
  // }
  // if(status === 'succeed'){
  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "Main" : "Login"}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      {/* Worker - Alert Details */}
      <Stack.Screen name="AlertDetails" component={AlertReport} />
      {/* Worker - Evacuation Alert */}
      <Stack.Screen name="Evacuation Alert" component={WorkerSafeZone} />
      {/* Supervisor - Checked In Workers Screen */}
      <Stack.Screen name="Checked In" component={CheckedIn} />
      {/* Supervisor - In Safe Zone Workers Screen */}
      <Stack.Screen name="Safe Zone" component={SafeZone} />
      {/* Supervisor - Alert Details Screen */}
      <Stack.Screen name="Received Alert" component={ReceivedAlertDetails} />
    </Stack.Navigator>
  );
};

// };

export default MainNavigator;
