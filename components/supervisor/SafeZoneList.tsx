import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { BACKEND_BASE_URL } from "../../config/api";
import Typography from "../common/typography";
import CommonButton from "../common/button";
import SortIcon from "../../assets/icons/sort";
import SafeWorkerIcon from "../../assets/icons/safeWorker";
import NotSafeWorkerIcon from "../../assets/icons/notSafeWorker";

interface Worker {
  id: number;
  name: string;
  role: string;
  avatar: string;
  checkedIn: boolean;
}

const SafeZoneList: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [sortOnZoneFirst, setSortOnZoneFirst] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>("Sort");

  /* Fetch Workers Info */
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
          let onSite = false;
          for (const workerOnSite of data.data.workersCheckedIn) {
            if (worker._id === workerOnSite.userId) {
              onSite = true;
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
            onSite: onSite,
          });
        }
        setWorkers(updatedSiteWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, []);

  /* Sorting function */
  const sortWorkers = () => {
    const sortedWorkers = [...workers].sort((a, b) => {
      if (sortOnZoneFirst) {
        if (a.onSite === b.onSite) {
          return a.name.localeCompare(b.name);
        } else {
          return a.onSite ? -1 : 1;
        }
      } else {
        if (a.onSite === b.onSite) {
          return a.name.localeCompare(b.name);
        } else {
          return a.onSite ? 1 : -1;
        }
      }
    });
    setWorkers(sortedWorkers);
    setSortOnZoneFirst((prevState) => !prevState);

    // Update button text based on sorting state
    if (sortOnZoneFirst) {
      setButtonText("On-Site");
    } else {
      setButtonText("Off-Site");
    }
  };

  return (
    <Box m="$2" my="$6" pt="$1" bg="#eaeaea" softShadow="1" rounded="$3xl">
      {/* Table Header */}
      <HStack
        justifyContent="space-between"
        alignItems="center"
        pl="$5"
        pr="$1"
        py="$2"
      >
        <Typography>Role / Name</Typography>
        <CommonButton variant="text" onPress={sortWorkers}>
          <HStack space="md" alignItems="center">
            <ButtonText>
              <Typography>{buttonText}</Typography>
            </ButtonText>
            <ButtonIcon>
              <SortIcon size={21} focussed={false} color="" />
            </ButtonIcon>
          </HStack>
        </CommonButton>
      </HStack>

      {/* Table Body */}
      {workers.map((worker, index) => (
        <Box
          key={index}
          px="$5"
          py="$3"
          bg={index % 2 === 0 ? "$offWhite" : "#ffffff"}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space="sm" alignItems="center">
              <Avatar
                bg={index % 2 === 0 ? "#ffffff" : "$offWhite"}
                borderRadius="$full"
              >
                <AvatarFallbackText color="$neutral">
                  {worker.name}
                </AvatarFallbackText>
              </Avatar>

              <Box ml="$2">
                <Typography bold>{worker.role}</Typography>
                <Typography>{worker.name}</Typography>
              </Box>
            </HStack>
            <Box>
              {worker.onSite ? (
                <SafeWorkerIcon size={30} color="" focussed={false} />
              ) : (
                <NotSafeWorkerIcon size={30} color="" focussed={false} />
              )}
            </Box>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default SafeZoneList;
