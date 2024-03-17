import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorNavigator from "./SupervisorNavigator";
import WorkerNavigator from "./WorkerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector,useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { IUser } from "../shared/interfaces/user.interface";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainTabNavigator: React.FC = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  console.log(user)
  if(!user){
    navigation.navigate('Login');
  }
  const getInitialRoute = () =>{
    
    if((user as IUser).role === 'supervisor'){
      
      return 'Supervisor'
    }else if((user as IUser).role === 'worker'){
      return 'Worker'
     }
    }
  return (
    <Stack.Navigator initialRouteName={getInitialRoute()}>
      <Stack.Screen
        name="Supervisor"
        component={SupervisorNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Worker"
        component={WorkerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainTabNavigator;
