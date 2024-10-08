import React, { useState,useEffect } from "react";
import { StyleSheet } from "react-native";
import { Box, ScrollView, Text } from "@gluestack-ui/themed";
import ScreenLayout from "../../components/layout/screenLayout";
import NumOfWorkers from "../../components/common/NumOfWorkers";
import Drawer from "../../components/supervisor/Drawer";
import CheckedInList from "../../components/supervisor/CheckedInList";
import LocationComponent from "../../components/supervisor/Location";
import SafeZoneWorkers from "../../components/common/safeZoneWorkers";
import SafeZoneList from "../../components/supervisor/SafeZoneList";
import { useSelector} from "react-redux";
import { RootState} from "../../lib/store";
import { BACKEND_BASE_URL } from "../../config/api";

const SafeZone: React.FC<any> = () => {
  const [siteLocation, setSiteLocation] = useState("");
  const [currentAlertType, setCurrentAlertType] = useState<
    "none" | "accident" | "evacuation" | "sos"
  >("none");
    // const {alertData} = route.params;
  const { isAuthenticated, status, user,token } = useSelector(
    (state: RootState) => state.auth
  );
  let userName = "";
  let siteId="";
  if (user) {
    siteId = user.constructionSiteId || "";
    console.log("logged in user>> " + user._id);   
    userName = `${user.firstName} ${user.lastName}`;
  } 

  useEffect(() => {
      const getSite = async () => {
      try {
        const siteInfo = {
          siteId : siteId
        }
        const res = await fetch(`${BACKEND_BASE_URL}/sitename`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(siteInfo),
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        const data = await res.json();
        console.log("site name data>> "+data)
        if (data) {
          setSiteLocation(data)    
        } 
      } 
      catch (error) {
        //Error while connecting with backend
        console.error('Error:', error);
      }
    };

    getSite();
  }, []);


  return (
    <ScreenLayout>
      <ScrollView>
        {/* LOCATION */}
        <LocationComponent siteLocation={siteLocation} />

        {/* WORKERS CHECKED IN */}
        <SafeZoneWorkers seeAll={false} />

        {/* LIST OF WORKERS */}
        <SafeZoneList />
      </ScrollView>

      {/* DRAWER */}
      <Box style={styles.drawer}>
        {/* <Drawer alertType={currentAlertType} /> */}
      </Box>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});

export default SafeZone;
