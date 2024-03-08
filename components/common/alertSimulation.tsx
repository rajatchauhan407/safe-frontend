import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface AlertSimulationCardProps {
  daysWithoutAccident: number;
  layout?: "row" | "column";
}

const AlertSimulationCard: React.FC<AlertSimulationCardProps> = ({
  layout = "row",
}) => {
  const isRowLayout: boolean = layout === "row";
  const [daysWithoutAccident, setDaysWithoutAccident] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay (e.g., fetching data from a server)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate receiving the number from the database
        const simulatedNumber = 365;

        setDaysWithoutAccident(simulatedNumber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={[
        styles.card,
        isRowLayout ? styles.rowLayout : styles.columnLayout,
      ]}
    >
      <View style={styles.leftColumn}>
        <Text style={styles.leftColumnText}>Alert Simulation</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.rightColumnNumber}>Start</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  rowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnLayout: {
    flexDirection: "column",
    alignItems: "center",
  },
  leftColumn: {
    alignItems: "center",
  },
  leftColumnText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  rightColumn: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
  },
  rightColumnNumber: {
    fontSize: 44,
    fontWeight: "bold",
    color: "black",
  },
});

export default AlertSimulationCard;
