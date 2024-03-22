import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DrawerUpIcon from "../../assets/icons/drawerUp";
import AlertButton from "./alertButton";
import Typography from "./typography";
import { Swipeable } from "react-native-gesture-handler";
import { Box, HStack } from "@gluestack-ui/themed";

interface DrawerProps {
  alertType: "none" | "accident" | "evacuation" | "sos";
  alertData?: any;
  isAlert?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ alertType,alertData,isAlert }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (alertType !== "none") {
      setIsOpen(true);
      setAutoOpen(true);
    }
  }, [alertType]);
console.log(alertData)
  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
    setAutoOpen(false);
  };

  const handleIncidentPress = () => {
    // navigation.navigate("AlertDetails");
  };

  const getAlertColor = (): string => {
    if (alertType === "accident") {
      return "#000000";
    } else {
      return "#ffffff";
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.handle}
        onPress={handleDrawerToggle}
        disabled={alertType === "none"}
      >
        <View style={styles.contentWrapper}>
          {/* <MaterialIcons name="keyboard-arrow-up" size={24} color="black" /> */}
          <DrawerUpIcon color='#000' size={40} focussed={false}/>
          <Typography style={styles.drawerText} pt="$4">
            {alertType === "none"
              ? "Great! There's no alert to report"
              : "You have received 01 Alert."}
          </Typography>
        </View>
      </TouchableOpacity>
      
      {isAlert && alertData && (
        <Box style={styles.content}>
          <HStack>
              <Text>Alert Type: {alertType}</Text>
              <Text>Reporting For: {alertData.reportingFor}</Text>
              <Text>Workers Injured: {alertData.workersInjured}</Text>
          </HStack>
          {/* Content of the drawer based on the alert text */}
          {/* {alertType !== "none" && (
            <AlertButton
              user="supervisor"
              emergency={alertType}
              color={getAlertColor()}
              onPress={handleIncidentPress}
            />
          )} */}
          
        </Box>
      )}
    </View>
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

export default Drawer;
