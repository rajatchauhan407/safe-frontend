import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { View, Text, TouchableOpacity, StyleSheet, PanResponder, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AlertReceived from "./alertReceived";
import Typography from "../common/typography";
import { set } from "@gluestack-style/react";

interface DrawerProps {
  alertType: "none" | "accident" | "evacuation";
  emergencyType: string;
  level: number;
  workersInjured: number;
  isAlert: boolean;
}

const DrawerWorker: React.FC<DrawerProps> = ({ alertType,emergencyType,level,workersInjured,isAlert=false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  console.log(`DrawerWorker: alertType: ${alertType}, emergencyType: ${emergencyType}, level: ${level}, workersInjured: ${workersInjured}`)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (event, gestureState) => gestureState.dy > 0 && !isOpen,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 50) {
          setIsOpen(false);
        } else if (gestureState.dy < -50) {
          setIsOpen(true);
        } else {
          // Keep the drawer in its current state
        }
        translateY.setValue(0);
      },           
    })
  ).current;
 useEffect(() => {
  setIsOpen(isAlert)
},[isAlert])
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (alertType !== "none") {
      setIsOpen(true);
    }
  }, [alertType]);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? 0 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleOverlayPress = () => {
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.drawerContainer, { transform: [{ translateY: translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle}>
          <View style={styles.contentWrapper}>
            <MaterialIcons name={isOpen ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={24} color="black" />
            <Typography style={styles.drawerText}>
              {alertType === "none"
                ? "Great! There's no alert to report"
                : "You have received 01 Alert."}
            </Typography>
          </View>
        </View>
        {isOpen && (
          <View style={styles.content}>
            {alertType !== "none" && (
              <AlertReceived 
                type={alertType}
                location={"Zone 3 - Building B"}
                emergency={emergencyType} 
                level={level} 
                workersInjured={workersInjured} />
            )}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start', 
  },
  drawerContainer: {
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

export default DrawerWorker;
