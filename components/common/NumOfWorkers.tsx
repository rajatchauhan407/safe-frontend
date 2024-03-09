import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NumOfWorkers: React.FC = () => {
  const navigation = useNavigation();

  const handleSeeAll = () => {
    navigation.navigate("Checked In");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Checked-in Workers</Text>
      <View style={styles.row}>
        <Text style={styles.count}>30/34</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.link}>See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FD9201",
    borderRadius: 24,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  count: {
    fontSize: 22,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default NumOfWorkers;
