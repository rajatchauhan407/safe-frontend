import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
          {alertText !== "Great! There’s no alert report." && (
            <Text>{/* Display content of the alert */}</Text>
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
