import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AlertButton from "./alertButton";

interface DrawerProps {
  alertText: string;
}

const Drawer: React.FC<DrawerProps> = ({ alertText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (alertText !== "Great! There’s no alert report.") {
      setIsOpen(!isOpen);
    }
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleIncidentPress = () => {
    navigation.navigate("AlertDetails");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.handle}
        onPress={handleDrawerToggle}
        disabled={alertText === "Great! There’s no alert report."}
      >
        <View style={styles.contentWrapper}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          <Text style={styles.drawerText}>{alertText}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          {/* Content of the drawer based on the alert text */}
          {/* <Text>Hi from alert type</Text> */}
          {alertText !== "Great! There’s no alert report." && (
            <AlertButton
              user="supervisor"
              emergency="accident"
              color="#000000"
              onPress={handleIncidentPress}
            />
          )}
        </View>
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
