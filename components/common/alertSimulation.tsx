import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { VStack, Card, Text, Box } from "@gluestack-ui/themed";
import Typography from "./typography";
import SimulatorIcon from "../../assets/icons/simulator";

interface AlertSimulationCardProps {
  daysWithoutAccident: number;
  layout?: "row" | "column";
}

const AlertSimulationCard: React.FC<AlertSimulationCardProps> = ({
  layout = "row",
}) => {
  const isRowLayout: boolean = layout === "row";

  return (
    <Card
      size="md"
      variant="elevated"
      m={0}
      rounded={24}
      bg={"$white"}
      style={isRowLayout ? styles.rowContainer : styles.columnContainer}
    >
      <VStack space="sm" m={0}>
        <SimulatorIcon size={36} color="" focussed={false} />
        <Box w="$full" mb="$2">
          <Typography size="md" bold>
            Alert
          </Typography>
          <Typography size="md" bold>
            Simulation
          </Typography>
        </Box>
        <Box style={styles.textContainer}>
          <Typography style={styles.startText}>Start</Typography>
        </Box>
      </VStack>
    </Card>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#F8F8FF",
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  startText: {
    fontSize: 38,
    fontFamily: "NunitoSans_700Bold",
    textAlign: "center",
  },
});

export default AlertSimulationCard;
