import React, { useState, useEffect } from "react";
import { VStack, Card, Box } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import Typography from "./typography";
import DaysCheckIcon from "../../assets/icons/daysCheck";

interface CommonDaysAccidentCardProps {
  daysWithoutAccident: number;
  layout?: "row" | "column";
}

const CommonDaysAccidentCard: React.FC<CommonDaysAccidentCardProps> = ({
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
    <Card
      size="md"
      variant="elevated"
      m={0}
      rounded={24}
      bg={"$white"}
    >
      <VStack space="sm" m={0} alignItems={isRowLayout ? "center" : "flex-start"} style={isRowLayout ? styles.rowContainer : styles.columnContainer}>
        <DaysCheckIcon size={36} color={"#00AE8C"} focussed={false} />
        <Typography size="md" bold>
          Days without accident
        </Typography>
        <Box style={styles.daysTextContainer}>
          <Typography style={styles.daysText}>{daysWithoutAccident}</Typography>
        </Box>
      </VStack>
    </Card>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  columnContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  daysTextContainer: {
    backgroundColor: "#F8F8FF",
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
    marginTop: 7,
  },
  daysText: {
    fontSize: 44,
    fontFamily: "NunitoSans_700Bold",
    textAlign: "center",
  },
});

export default CommonDaysAccidentCard;
