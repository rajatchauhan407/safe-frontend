import React, { useEffect, useState } from "react";
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
import { BACKEND_BASE_URL } from "../../config/api";

interface NumOfWorkersProps {
  // totalCheckedIn and totalExpected are received as props
  // but we'll use state to manage their values
}

const NumOfWorkers: React.FC<NumOfWorkersProps> = () => {
  const navigation = useNavigation();
  const [totalCheckedIn, setTotalCheckedIn] = useState<number>(0);
  const [totalExpected, setTotalExpected] = useState<number>(0);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const siteId = {
          siteId: "65e220e17fdb2514ce5b4a08",
        };
        const res = await fetch(`${BACKEND_BASE_URL}/workersdata`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(siteId),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        // Update state with the fetched values
        setTotalCheckedIn(data.data.workersCheckedIn.length);
        setTotalExpected(data.data.workersData.length);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  const handleSeeAll = () => {
    navigation.navigate("Checked In" as never);
  };

  return (
    <Card size="md" variant="filled" bgColor="$highlight" borderRadius="$3xl">
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
          <ButtonText sx={{ textDecorationLine: "underline" }}>
            See All
          </ButtonText>
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
