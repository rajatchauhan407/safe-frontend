import React,{useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/Login";
import AlertReport from "../screens/worker/AlertReport";
import CheckedIn from "../screens/supervisor/CheckedIn";
import { useSelector,useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { verifyToken } from "../lib/slices/authSlice";
import { getItem } from "../lib/slices/authSlice";
import { Text } from "@gluestack-ui/themed";
// import { IUser } from "../shared/interfaces/user.interface";
const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const retrieveToken = async () => {
      try{
        const token = await getItem('token');
        console.log(token);
        if(token){
          dispatch(verifyToken(token));
        }
      }catch(error){
        console.log(error);
      }  
    }
    retrieveToken();
  }, [dispatch]);
  const {isAuthenticated,status} = useSelector((state: RootState) => state.auth);

  const getInitialRoute = () => {
    console.log(isAuthenticated)
    if(isAuthenticated){
      // console.log('getting rendered')
      return 'Main'
    }
    // console.log('getting rendered login with login')
    return 'Login'
  }
  // if (status === 'loading') {
  //   return <>
  //     <Text>Loading...</Text>
  //   </>;
  // }
  return (
    <Stack.Navigator initialRouteName={getInitialRoute()}>
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
      <Stack.Screen name="AlertDetails" component={AlertReport} />
      <Stack.Screen name="Checked In" component={CheckedIn} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
