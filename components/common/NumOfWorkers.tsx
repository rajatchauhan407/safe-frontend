import React, { useEffect, useState } from "react";
import { Card, HStack, Heading, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_BASE_URL} from "../../config/api";
import Typography from "./typography";
import CommonButton from "./button";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import websocketService from "../../services/websocket.service";
import useFetch from "../../hooks/useFetch";

interface NumOfWorkersProps {
  seeAll: boolean;
  // totalCheckedIn and totalExpected are received as props
  // but we'll use state to manage their values
}

const NumOfWorkers: React.FC<NumOfWorkersProps> = ({ seeAll }) => {
  const navigation = useNavigation();
  const [totalCheckedIn, setTotalCheckedIn] = useState<number>(0);
  const [totalExpected, setTotalExpected] = useState<number>(0);
  const [refreshData,setRefreshData] = useState(false);
  const { isAuthenticated, status, user } = useSelector(
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
    websocketService.subscribeToEvent('workerstatus', (data) => {
      console.log("Websocket - Received workerstatus event:", data);    
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
      const res = await fetch(`${BACKEND_BASE_URL}/workersdata`, {
        method: "POST",
        credentials: "include",
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
  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleSeeAll = () => {
    navigation.navigate("Checked In" as never);
  };

  return (
    <Card
      size="md"
      variant="elevated"
      bgColor="$highlight"
      borderRadius="$3xl"
      pr={"$0"}
      pb={"$2"}
    >
      <Heading>
        <Typography size="lg" bold>
          Total Checked-in Workers
        </Typography>
      </Heading>
      <HStack sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <HStack alignItems="center">
          <Typography size="3xl" bold>
            {totalCheckedIn}
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

export default NumOfWorkers;
