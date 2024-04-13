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
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import websocketService from "../../services/websocket.service";

interface Worker {
  id: number;
  name: string;
  role: string;
  avatar: string;
  onSite: boolean;
}

const SafeZoneList: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [sortOnZoneFirst, setSortOnZoneFirst] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>("Sort");
  const { isAuthenticated, status, user,token } = useSelector(
    (state: RootState) => state.auth
  );
  let siteID = "";

  if (user) {
    console.log("logged in user>> " + user._id);
    siteID = user.constructionSiteId || "";
  }
  useEffect(() => {
    // Connect to websocket
    websocketService.connect();
    websocketService.subscribeToEvent('safezoneworker', (data) => {
      console.log("Websocket received safezoneworker event:", data);    
      fetchWorkers();
    }); 
    websocketService.subscribeToEvent('workerstatus', (data) => {
      console.log("Websocket received workerstatus event:", data);    
      fetchWorkers();
    });   
    //Cleanup function to disconnect from websocket when component unmounts
    // return () => {
    //   websocketService.disconnect();
    // };
  });

  const fetchWorkers = async () => {
    try {
      const siteId = {
        siteId: siteID,
      };
      const res = await fetch(`${BACKEND_BASE_URL}/safezoneworkersdata`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(siteId),
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await res.json();
      console.log("Data from backend >> WorkersData" + data.data.workersData);
      console.log(
        "Data from backend >> WorkersCheckedIn " + data.data.safeZoneWorkers
      );

      const updatedSiteWorkers: Worker[] = [];
      // Loop through workersData array
      for (const worker of data.data.workersData) {
        console.log("Worker Name:", worker.firstName);
        console.log("Worker Role:", worker.lastName);
        let onSite = false;
        for (const workerOnSite of data.data.safeZoneWorkers) {
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
  /* Fetch Workers Info */
  useEffect(() => {    
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
      setButtonText("On-Safe Zone");
    } else {
      setButtonText("Off-Safe Zone");
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
