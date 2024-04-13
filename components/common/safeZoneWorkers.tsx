import React, { useEffect, useState } from "react";
import { Card, HStack, Heading } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_BASE_URL } from "../../config/api";
import Typography from "./typography";
import CommonButton from "./button";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import websocketService from "../../services/websocket.service";

interface NumOfWorkersProps {
  seeAll: boolean;
  // totalCheckedIn and totalExpected are received as props
  // but we'll use state to manage their values
}

const SafeZoneWorkers: React.FC<NumOfWorkersProps> = ({ seeAll }) => {
  const navigation = useNavigation();
  const [totalOnSite, setTotalOnSite] = useState<number>(0);
  const [totalExpected, setTotalExpected] = useState<number>(0);
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
    // Cleanup function to disconnect from websocket when component unmounts
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
      // Update state with the fetched values
      setTotalOnSite(data.data.safeZoneWorkers.length);
      setTotalExpected(data.data.workersData.length);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleSeeAll = () => {
    navigation.navigate("Safe Zone" as never);
  };

  return (
    <Card
      size="md"
      variant="elevated"
      bgColor="$success"
      borderRadius="$3xl"
      pr={"$0"}
      pb={"$2"}
    >
      <Heading>
        <Typography size="lg" bold>
          Workers at Safe Zone
        </Typography>
      </Heading>
      <HStack sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <HStack alignItems="center">
          <Typography size="3xl" bold>
            {totalOnSite}
          </Typography>
          <Typography size="xl" bold>
            {" "}
            /{" "}
          </Typography>
          <Typography size="xl" bold>
            {totalExpected}
          </Typography>
        </HStack>

        {seeAll && (
          <CommonButton variant="underline" onPress={handleSeeAll}>
            <Typography bold size={"xl"}>
              See All
            </Typography>
          </CommonButton>
        )}
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

export default SafeZoneWorkers;
