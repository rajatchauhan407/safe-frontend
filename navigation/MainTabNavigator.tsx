import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorNavigator from "./SupervisorNavigator";
import WorkerNavigator from "./WorkerNavigator";
import { Header, createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { IUser } from "../shared/interfaces/user.interface";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { Button } from "@gluestack-ui/themed";
import AddUserIcon from "../assets/icons/addUser";

// const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainTabNavigator: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // console.log(user)

  const handleAddNewUser = () => {
    navigation.navigate("Add User" as never);
  };

  const renderAddUserButton = () => {
    if (user && (user as IUser).role === "supervisor") {
      return (
        <Button
          borderRadius="$full"
          w="$16"
          h="$16"
          bg="$transparent"
          alignSelf="flex-end"
          onPress={handleAddNewUser}
        >
          <AddUserIcon size={30} focussed={false} color="#FD9201" />
        </Button>
      );
    }
    return null;
  };

  const getInitialRoute = () => {
    if (!user) {
      return "Login";
    }
    if ((user as IUser).role === "supervisor") {
      return "Supervisor";
    } else if ((user as IUser).role === "worker") {
      return "Worker";
    }
  };

  return (
    <Stack.Navigator initialRouteName={getInitialRoute()}>
      <Stack.Screen
        name="Supervisor"
        component={SupervisorNavigator}
        options={{
          headerRight: renderAddUserButton,
          headerShown: true,
        }}
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
