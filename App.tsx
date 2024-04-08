import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { StyledProvider } from "@gluestack-style/react";
import { useFonts } from "expo-font";
import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
} from "@expo-google-fonts/nunito-sans";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     vibrationPattern: [0, 250, 250, 250]
//   }),
// });


export default function App() {
  useEffect(() => {
    // Ask for notification permissions on iOS.
    Notifications.requestPermissionsAsync();

    // Set up the notification channel for Android devices.
    Notifications.setNotificationChannelAsync('alert-notification', {
      name: 'E-mail notifications',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'notificationsound.wav', // Ensure this file is included in your app bundle
    });

    // // Schedule a notification as an example.
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "You've got an alert",
    //     sound: 'notificationsound.wav', // Ensure this file is included in your app bundle
    //   },
    //   trigger: {
    //     seconds: 2,
    //     channelId: 'alert-notification',
    //   },
    // });

    // This listener is fired whenever a notification is received while the app is foregrounded.
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
      // Set up the notification channel for Android devices.
    Notifications.setNotificationChannelAsync('alert-notification', {
      name: 'E-mail notifications',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'notificationsound.wav', // Ensure this file is included in your app bundle
    });
    });

    Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // Clean up the listener when the component unmounts.
    return () => subscription.remove();
  }, []);
//   useEffect(()=>{
// // This listener is fired whenever a notification is received while the app is foregrounded
// Notifications.addNotificationReceivedListener(notification => {
//   console.log(notification);
// });
//   },[])


  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  if (fontsLoaded) {
    console.log("fonts loaded");
  }
  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
});
