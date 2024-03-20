import React, { useState} from "react";
import { VStack, Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import Typography from '../common/typography';
import CommonButton from '../common/button';
import FallIcon from '../../assets/icons/fall';
import FireHazardIcon from '../../assets/icons/fireHazard';
import ElectricIcon from '../../assets/icons/electric';
import InjuredIcon from '../../assets/icons/injured';
import SpaceIcon from '../../assets/icons/space';
import DangerIcon from '../../assets/icons/danger';
import LocationIcon from '../../assets/icons/location';
import ScreenLayout from '../layout/screenLayout';

interface AlertReceivedProps {
  type: 'accident' | 'evacuation';
  emergency: string;
  location: string;
  level: number;
  workersInjured: number;
}

interface EmergencyItem {
  text: string;
  icon: React.FC<any>; 
}

const WorkerSafeZone: React.FC<AlertReceivedProps> = ({ type, emergency, location, level, workersInjured }) => {
  const navigation = useNavigation();
  const [safeZoneLocation, setSafeZoneLocation] = useState("Safe Zone C - Assembly Zone");

  const emergencies: EmergencyItem[] = [
    { text: 'A worker fell', icon: FallIcon },
    { text: 'Fire hazard', icon: FireHazardIcon },
    { text: 'Electrical hazard', icon: ElectricIcon },
    { text: 'Injury', icon: InjuredIcon },
    { text: 'Confined spaces', icon: SpaceIcon },
    { text: 'Struck by hazard', icon: DangerIcon },
  ];

  const selectedEmergency = emergencies.find(item => item.text === emergency);

  const LocationSafeZone = () => (
    <Box mt={10} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
      <LocationIcon size={18} color={''} focussed={false} />
      <Typography size="xl" pl={5} bold>{safeZoneLocation}</Typography>
    </Box>
    );

  const handleIncidentPress = () => {
    // Handle incident press
  };

  return (
    <ScreenLayout>
        <VStack space="md">
            <Typography textAlign="center" bold>Remain calm and proceed to safe zone</Typography>

            <VStack style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <BoxWithIcon icon={selectedEmergency?.icon || DangerIcon} text={emergency} type={type}  />
                <BoxWithNumber number={level} text={`Level`} type={type} />
                <BoxWithNumber number={workersInjured} text={`Workers Injured`} type={type} />
            </VStack>

            <LocationSafeZone />
            
            {/* ADD IMAGE OF THE SAFE ZONE - HARDCODED FROM S3 BUCKET */}

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
  type: 'accident' | 'evacuation';
}

const BoxWithIcon: React.FC<BoxWithIconProps> = ({ icon: IconComponent, text, type }) => {
  const iconColor = type === 'accident' ? '#FD9201' : '#D0080F';
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
  type: 'accident' | 'evacuation';
}
  
const BoxWithNumber: React.FC<BoxWithNumberProps> = ({ number, text, type }) => {
  const textColor = type === 'accident' ? '#FD9201' : '#D0080F';
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
