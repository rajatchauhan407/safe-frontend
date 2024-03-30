import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { View, StyleSheet, PanResponder, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AlertButton from "../common/alertButton";
import Typography from "../common/typography";
import { Center, Image, VStack } from "@gluestack-ui/themed";
import CommonButton from "../common/button";

interface DrawerProps {
  alertType: "none" | "accident" | "evacuation" | "sos" | "activeEvacuation";
  alertData?: any;
}

const DrawerSupervisor: React.FC<DrawerProps> = ({ alertType, alertData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false, // Disabling touch gesture to start responder
      onMoveShouldSetPanResponder: (event, gestureState) =>
        gestureState.dy > 0 && !isOpen,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 50) {
          setIsOpen(false); // Close the drawer if gesture is downward
        } else if (gestureState.dy < -50) {
          setIsOpen(true); // Open the drawer if gesture is upward
        } else {
          // Keep the drawer in its current state
        }
        translateY.setValue(0); // Reset translateY
      },
    })
  ).current;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (alertType !== "none") {
      setIsOpen(true);
    }
    console.log(alertType);
  }, [alertType]);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? 0 : 0, // Adjusted the value to fully close the drawer
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleReceivedDetailsPress = () => {
    if (alertType === "sos") {
      navigation.navigate("SOS Details" as never);
    } else {
      navigation.navigate("Received Alert", { alertData: alertData });
      console.log(alertType);
    }
  };

  const getAlertColor = (): string => {
    if (alertType === "accident") {
      return "#000000";
    } else {
      return "#ffffff";
    }
  };

  const handleCancelAlert = () => {
    setShowCancelModal(true);
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: translateY }] }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.handle}>
        <View style={styles.contentWrapper}>
          <MaterialIcons
            name={isOpen ? "keyboard-arrow-down" : "keyboard-arrow-up"}
            size={24}
            color="black"
          />
          <Typography style={styles.drawerText}>
            {alertType === "none"
              ? "Great! There's no alert to report."
              : alertType === "activeEvacuation"
              ? "You are currently under evacuation."
              : "You have received 01 Alert."}
          </Typography>
        </View>
      </View>
      {isOpen && (
        <View style={styles.content}>
          {/* Content of the drawer based on the alert text */}
          {alertType !== "none" && (
            <>
              {alertType === "activeEvacuation" ? (
                <Center>
                  <VStack>
                    <Typography>
                      The green area is your site safe zone.
                    </Typography>
                    <Image
                      size="lg"
                      borderRadius={20}
                      source={{
                        uri: "https://techandtribe-safe.s3.us-east-2.amazonaws.com/safe_zone.jpg",
                      }}
                    />
                    <CommonButton
                      variant="underline"
                      onPress={handleCancelAlert}
                    >
                      <Typography>Cancel Alert</Typography>
                    </CommonButton>
                  </VStack>
                </Center>
              ) : (
                <AlertButton
                  user="supervisor"
                  emergency={alertType}
                  /* color={getAlertColor()} */
                  onPress={handleReceivedDetailsPress}
                />
              )}
            </>
          )}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  handle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  contentWrapper: {
    flexDirection: "column",
    alignItems: "center",
  },
  drawerText: {
    marginBottom: 10,
  },
  content: {
    paddingVertical: 10,
  },
});

export default DrawerSupervisor;
