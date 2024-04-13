import React, { useState } from 'react';
import { Image } from 'react-native';
import { VStack, Box } from '@gluestack-ui/themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Typography from '../common/typography';
import CommonButton from '../common/button';
import ScreenLayout from '../layout/screenLayout';
import AlertMessage from '../common/alertMessage'; // Import AlertMessage
import FallIcon from '../../assets/icons/fall';
import FireHazardIcon from '../../assets/icons/fireHazard';
import ElectricIcon from '../../assets/icons/electric';
import InjuredIcon from '../../assets/icons/injured';
import SpaceIcon from '../../assets/icons/space';
import DangerIcon from '../../assets/icons/danger';
import LocationIcon from '../../assets/icons/location';
import { useSelector} from "react-redux";
import { RootState} from "../../lib/store";
import { BACKEND_BASE_URL } from "../../config/api";
import { RootStackParamList } from '../../types/navigationTypes';

interface WorkerSafeZoneProps {
    onSafeConfirmation: () => void;
    type?: 'accident' | 'evacuation';
    emergency?: string;
    location?: string;
    level?: number;
    workersInjured?: number;
    route: any;
    imageUrl?: string;
}

interface EmergencyItem {
  text: string;
  icon: React.FC<any>; 
}

const WorkerSafeZone: React.FC<WorkerSafeZoneProps> = ({ 
    onSafeConfirmation, 
    type = 'accident', 
    emergency = 'A worker fell', 
    location, 
    level = 0, 
    workersInjured = 0,
    route,
    imageUrl
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [safeZoneLocation, setSafeZoneLocation] = useState("Safe Zone C - Assembly Zone");
  const { isAuthenticated, status, user,token } = useSelector(
    (state: RootState) => state.auth
  );
  let siteId = "";
  let userId  = "";
  if (user) {
    console.log("logged in user>> " + user._id);
    userId=user._id;
    siteId = user.constructionSiteId || ""; 
  } 
  const {alertData} = route.params;

  const emergencies: EmergencyItem[] = [
    { text: 'A worker fell', icon: FallIcon },
    { text: 'Fire hazard', icon: FireHazardIcon },
    { text: 'Electrical hazard', icon: ElectricIcon },
    { text: 'Injury', icon: InjuredIcon },
    { text: 'Confined spaces', icon: SpaceIcon },
    { text: 'Struck by hazard', icon: DangerIcon },
  ];

  const selectedEmergency = emergencies.find(item => item.text === alertData.emergency);

  const LocationSafeZone = () => (
    <Box mt={10} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
      <LocationIcon size={18} color={''} focussed={false} />
      <Typography size="xl" pl={5} bold>{safeZoneLocation}</Typography>
    </Box>
  );

  
  const handleIncidentPress = () => {
    // DISMISS THE ALERT OF THE WORKER HERE
    // onSafeConfirmation(); // Callback to notify parent component (Dashboard)
    const createSafeZoneWorker = async () => {
      try {
        const workerInfo = {
          workerId : userId,
          siteId : siteId
        }
        const res = await fetch(`${BACKEND_BASE_URL}/createsafezoneworker`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(workerInfo),
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        const data = await res.json();
        console.log(data.data.message);    
      } 
      catch (error) {
        console.error('Error while creating safe zone worker:', error);
      }
    };
    createSafeZoneWorker();
    navigation.navigate('Dashboard' as never);
  };

  return (
    <ScreenLayout>
        <VStack space="md">
            <Typography textAlign="center" bold>Remain calm and proceed to safe zone</Typography>

            <VStack style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <BoxWithIcon icon={selectedEmergency?.icon || DangerIcon} text={alertData.emergencyType} level={level}  />
                <BoxWithNumber number={alertData.level} text={`Level`} level={level} />
                <BoxWithNumber number={alertData.workersInjured} text={`Workers Injured`} level={level} />
            </VStack>

            <LocationSafeZone />
            
            {imageUrl && (
              <Image
              style={{ width: '100%', height: 400, borderRadius: 10 }}
              source={{
                uri: imageUrl,
              }}
              alt={"Safe zone"}
            />
            
            )}

            <CommonButton variant="rounded" action='secondary'  onPress={handleIncidentPress} buttonTextSize={24} >
                I am safe
            </CommonButton>
        </VStack>
    </ScreenLayout>
  );
};

interface BoxWithIconProps {
  icon: React.FC<any>;
  text: string;
  level: number;
}

const BoxWithIcon: React.FC<BoxWithIconProps> = ({ icon: IconComponent, text, level }) => {
  const iconColor = '#D0080F';
  return (
    <VStack space='sm' width={110} height={110} style={{ alignItems: 'center', justifyContent:'center' }} p={10} borderWidth={2} borderColor='#C7C7C7' borderRadius={22}>
      <IconComponent size={34} color={iconColor} />
      <Typography textAlign="center" bold>{text}</Typography>
    </VStack>
  );
};

interface BoxWithNumberProps {
  number: number;
  text: string;
  level: number;
}
  
const BoxWithNumber: React.FC<BoxWithNumberProps> = ({ number, text, level }) => {
  const textColor = '#D0080F';
  return (
    <VStack style={{ alignItems: 'center'}}>
      <Box style={{ alignItems: 'center', justifyContent:'center' }} p={10} width={110} height={110} borderWidth={2} borderColor='#C7C7C7' borderRadius={22}>
        <Typography size={"3xl"} color={textColor} bold>{number}</Typography>
        <Typography textAlign="center">{text}</Typography>
      </Box>
    </VStack>
  );
};

export default WorkerSafeZone;
