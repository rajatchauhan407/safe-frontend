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
    navigation.navigate("Checked In");
  };

  return (
    <Card
      size="md"
      variant="filled"
      bgColor="$highlight"
      borderRadius="$3xl"
      m="$1"
    >
      <Heading mb="$1" size="md">
        Total Checked-in Workers
      </Heading>
      <HStack sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <HStack>
          <Text>{totalCheckedIn}</Text>
          <Text>/</Text>
          <Text>{totalExpected}</Text>
        </HStack>

        <Button
          size="md"
          variant="link"
          action="primary"
          onPress={handleSeeAll}
        >
          <ButtonText sx={{ textDecorationLine: "underline" }}>Add </ButtonText>
        </Button>
      </HStack>
    </Card>
  );
};

const styles = StyleSheet.create({
  count: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default NumOfWorkers;
