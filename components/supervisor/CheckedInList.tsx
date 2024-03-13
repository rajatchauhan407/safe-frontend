import React, { useState, useEffect } from "react";
import {
  Box,
  View,
  Text,
  HStack,
  Image,
  Button,
  ButtonText,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";

interface Worker {
  id: number;
  name: string;
  role: string;
  avatar: string;
  checkedIn: boolean;
}

const CheckedInList: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: 1,
      name: "Sam Smith",
      role: "Roof painter",
      avatar: "avatar-link-1",
      checkedIn: true,
    },
    {
      id: 2,
      name: "Linda Fong",
      role: "Paramedic",
      avatar: "avatar-link-2",
      checkedIn: false,
    },
    {
      id: 3,
      name: "Max Lob",
      role: "Carpenter",
      avatar: "avatar-link-3",
      checkedIn: true,
    },
    {
      id: 4,
      name: "Pack Noh",
      role: "Electrician",
      avatar: "avatar-link-4",
      checkedIn: true,
    },
    {
      id: 5,
      name: "Noah Long",
      role: "Electrician",
      avatar: "avatar-link-5",
      checkedIn: false,
    },
  ]);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [sortCheckedFirst, setSortCheckedFirst] = useState<boolean>(true);

  /* Sorting function */
  const sortWorkers = () => {
    const sortedWorkers = [...workers].sort((a, b) => {
      if (sortCheckedFirst) {
        if (a.checkedIn === b.checkedIn) {
          return a.name.localeCompare(b.name);
        } else {
          return a.checkedIn ? -1 : 1;
        }
      } else {
        if (a.checkedIn === b.checkedIn) {
          return a.name.localeCompare(b.name);
        } else {
          return a.checkedIn ? 1 : -1;
        }
      }
    });
    setWorkers(sortedWorkers);
    setSortCheckedFirst((prevState) => !prevState);
  };

  // useEffect(() => {
  //   const sortedWorkers = [...workers].sort((a, b) =>
  //     a.name.localeCompare(b.name)
  //   );
  //   setWorkers(sortedWorkers);
  // }, []);

  // const fetchWorkers = async () => {
  //   try {
  //     const response = await fetch("your-backend-endpoint");
  //     const data = await response.json();
  //     setWorkers(data);
  //   } catch (error) {
  //     console.error("Error fetching workers:", error);
  //   }
  // };

  return (
    <Box
      m="$2"
      my="$6"
      p="$3"
      pt="$1"
      bg="$primary0"
      softShadow="1"
      rounded="$3xl"
    >
      {/* Table Header */}
      <HStack
        justifyContent="space-between"
        alignItems="center"
        p="$2"
        borderBottomWidth={1}
      >
        <Text flex={1}>Role / Name</Text>
        <Button onPress={sortWorkers}>
          <ButtonText>Checked</ButtonText>
        </Button>
      </HStack>

      {/* Table Body */}
      {workers.map((worker, index) => (
        <Box key={index} p="$2" borderBottomWidth={1}>
          <HStack justifyContent="space-between">
            <Box flexDirection="row" alignItems="center" flex={1}>
              <Avatar bgColor="$offWhite" size="md" borderRadius="$full">
                <AvatarFallbackText>{worker.name}</AvatarFallbackText>
                <AvatarImage />
              </Avatar>

              <Box ml="$2">
                <Text>{worker.role}</Text>
                <Text>{worker.name}</Text>
              </Box>
            </Box>
            <MaterialIcons
              name={worker.checkedIn ? "check-box" : "check-box-outline-blank"}
              size={24}
              color={worker.checkedIn ? "green" : "red"}
            />
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default CheckedInList;
