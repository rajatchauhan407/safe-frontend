import React from "react";
import {
  Box,
  Button,
  ButtonText,
  Card,
  HStack,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Typography from "./typography";
import CommonButton from "./button";

interface NumOfWorkersProps {
  totalCheckedIn: number;
  totalExpected: number;
}

const NumOfWorkers: React.FC<NumOfWorkersProps> = ({
  totalCheckedIn,
  totalExpected,
}) => {
  const navigation = useNavigation();

  const handleSeeAll = () => {
    navigation.navigate("Checked In" as never);
  };

  return (
    <Card size="md" variant="elevated" bgColor="$highlight" borderRadius="$3xl">
      <Heading mb="$1" size="md">
        Total Checked-in Workers
      </Heading>
      <HStack sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <HStack alignItems="center">
          <Typography style={styles.countIn}>{totalCheckedIn}</Typography>
          <Typography style={styles.countExpected}> / </Typography>
          <Typography style={styles.countExpected}>{totalExpected}</Typography>
        </HStack>

        <CommonButton variant="underline" onPress={handleSeeAll}>
          <Typography bold style={styles.linkBnt}>
            See All
          </Typography>
        </CommonButton>
      </HStack>
    </Card>
  );
};

const styles = StyleSheet.create({
  countIn: {
    fontSize: 32,
    fontWeight: "bold",
  },
  countExpected: {
    fontSize: 22,
    fontWeight: "bold",
  },
  linkBnt: {
    fontSize: 20,
  },
});

export default NumOfWorkers;
