import React, { useState, useEffect } from "react";
import {
  Box,
  ButtonIcon,
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
import { BACKEND_BASE_URL } from "../../config/api";
import CheckedInIcon from "../../assets/icons/checkedIn";
import NotCheckedInIcon from "../../assets/icons/notCheckedIn";
import Typography from "../common/typography";

interface Worker {
  id: number;
  name: string;
  role: string;
  avatar: string;
  checkedIn: boolean;
}

const CheckedInList: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const siteId = {
          siteId: "65f4145c0c71a29f15263723",
        };
        const res = await fetch(`${BACKEND_BASE_URL}/workersdata`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(siteId),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        console.log("Data from backend >> WorkersData" + data.data.workersData);
        console.log(
          "Data from backend >> WorkersCheckedIn " + data.data.workersCheckedIn
        );

        const updatedSiteWorkers: Worker[] = [];
        // Loop through workersData array
        for (const worker of data.data.workersData) {
          console.log("Worker Name:", worker.firstName);
          console.log("Worker Role:", worker.lastName);
          let checkedIn = false;
          for (const workerCheckedIn of data.data.workersCheckedIn) {
            if (worker._id === workerCheckedIn.userId) {
              checkedIn = true;
              console.log("checked - in " + worker._id);
              break;
            }
          }
          // Add worker to updatedSiteWorkers array
          updatedSiteWorkers.push({
            id: worker._id,
            name: `${worker.firstName} ${worker.lastName}`,
            role: worker.jobPosition,
            avatar: "avatar-link-5",
            checkedIn: checkedIn,
          });
        }
        setWorkers(updatedSiteWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

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
    setSortAscending(!sortCheckedFirst);
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
        <Typography>Role / Name</Typography>
        <Button onPress={sortWorkers}>
          <HStack space="sm">
            <ButtonText>Checked</ButtonText>
            <ButtonIcon mt={"-$1"}>
              <MaterialIcons
                name={
                  sortAscending ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                size={24}
                color="white"
              />
            </ButtonIcon>
          </HStack>
        </Button>
      </HStack>

      {/* Table Body */}
      {workers.map((worker, index) => (
        <Box key={index} p="$2" borderBottomWidth={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <Box flexDirection="row" alignItems="center" flex={1}>
              <Avatar /* bgColor="$offWhite" */ size="md" borderRadius="$full">
                <AvatarFallbackText>{worker.name}</AvatarFallbackText>
                <AvatarImage />
              </Avatar>

              <Box ml="$2">
                <Typography bold>{worker.role}</Typography>
                <Typography>{worker.name}</Typography>
              </Box>
            </Box>
            <Box>
              {worker.checkedIn ? (
                <CheckedInIcon size={30} color="" focussed={false} />
              ) : (
                <NotCheckedInIcon size={30} color="" focussed={false} />
              )}
            </Box>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default CheckedInList;
