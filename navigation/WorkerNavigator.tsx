import React, { useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/worker/Dashboard";
import Alert from "../screens/worker/Alert";
import Profile from "../screens/worker/Profile";
import IconConfig from "../navigation/config";
import { View, Button } from "react-native"; 
import CustomModal from "../components/common/modal";
import SucessIcon from "../assets/icons/sucess";
import { useToken } from "@gluestack-style/react";
import { IIconProps } from "../shared/interfaces/IIconProps.interface";
import { BACKEND_BASE_URL} from "../config/api";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

const Tab = createBottomTabNavigator();

const WorkerNavigator: React.FC = () => {
  const successColor = useToken("colors", "success");
  const [isOpen, setIsOpen] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated, status, user, token } = useSelector(
    (state: RootState) => state.auth
  );
  let siteId = "";
  let userId = "";
  let userName = "";
  if (user) {
    console.log("logged in user>> " + user._id);
    userId = user.userId;
    siteId = user.constructionSiteId || "";
    userName = `${user.firstName} ${user.lastName}`;
  }
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonAction = () => {
    closeModal();
  };

  const getLocation = async (): Promise<Location.LocationObject | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return null;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      return location;
    } catch (error) {
      return null;
    }
  };

  const handleSOSLongPress = () => {
    const createSOSAlert = async () => {
      try {
        getLocation()
        .then(async (location) => {
          if (location) {
            console.log("Received location:", location);
            //Actual Location of the device
            // const sosAlertInfo = {
            //   siteId: siteId,
            //   workerId: userId,
            //   location: {
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude
            //   }
            // };

            //To simulate check-in successful during demo
            const sosAlertInfo = {
              role:'worker',
              constructionSiteId: siteId,
              userId: userId,
              alertLocation:{
                type:"Point",
                coordinates:[49.28300315023338,-123.12037620096916]
              },
              sos:true,
            };
            const res = await fetch(`${BACKEND_BASE_URL}/alert`, {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(sosAlertInfo),
              headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            });
            const data = await res.json();
            console.log("sos alert data>> " + data);             
          } else
          {
            //Show error message that worker didn't give permission to access his location 
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
               
      } catch (error) {
        //Error while connecting with backend
        console.error("Error:", error);
      }
    };
    createSOSAlert();
    holdTimeoutRef.current = setTimeout(openModal, 300);
  };

  const handleSOSTabPressOut = () => {

    if (holdTimeoutRef.current !== null) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null; 
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            console.log(route.name);
            const IconComponent = IconConfig[route.name]?.component;
            console.log(IconComponent);
            return IconComponent ? (
              <IconComponent
                focussed={focused}
                size={size}
                color={color}
                onLongPress={route.name === "SOS" ? handleSOSLongPress : undefined} // Handle long press only for SOS tab
                onPressOut={route.name === "SOS" ? handleSOSTabPressOut : undefined} // Handle press out only for SOS tab
              />
            ) : null;
          },
          tabBarActiveTintColor: successColor,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "white", padding: 5, height: 85, paddingBottom: 25 },
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="SOS" component={Alert} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        icon={<SucessIcon color={"#00AE8C"} size={60} focussed={false} />}
        title="SOS Alert Reported to Supervisor"
        description="On-site first aid workers are en route to assist you. Please remain calm."
        buttonText="Close"
        buttonAction={handleButtonAction}
      />
    </View>
  );
};

export default WorkerNavigator;
