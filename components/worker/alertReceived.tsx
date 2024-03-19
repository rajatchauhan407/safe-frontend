import React from 'react';
import { VStack, Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import Typography from '../common/typography';
import AlertButton from '../common/alertButton';
import CommonButton from '../common/button';
import FallIcon from '../../assets/icons/fall';
import FireHazardIcon from '../../assets/icons/fireHazard';
import ElectricIcon from '../../assets/icons/electric';
import InjuredIcon from '../../assets/icons/injured';
import SpaceIcon from '../../assets/icons/space';
import DangerIcon from '../../assets/icons/danger';

interface AlertReceivedProps {
  type: 'accident' | 'evacuation';
  emergency: string;
  location: string;
  level: number;
  workersInjured: number;
}

interface EmergencyItem {
  text: string;
  icon: React.FC<any>; // Change iconName to icon
}

const AlertReceived: React.FC<AlertReceivedProps> = ({ type, emergency, location, level, workersInjured }) => {
  const navigation = useNavigation();

  const handleIncidentPress = () => {
    // Handle incident press
  };

  const navigateToSafeZone = () => {
    // Navigate to safe zone screen
    // navigation.navigate('SafeZoneScreen');
  };

  const emergencies: EmergencyItem[] = [
    { text: 'A worker fell', icon: FallIcon },
    { text: 'Fire hazard', icon: FireHazardIcon },
    { text: 'Electrical hazard', icon: ElectricIcon },
    { text: 'Injury', icon: InjuredIcon },
    { text: 'Confined spaces', icon: SpaceIcon },
    { text: 'Struck by hazard', icon: DangerIcon },
  ];

  const selectedEmergency = emergencies.find(item => item.text === emergency);

  return (
    <VStack space="md">
      <Typography textAlign="center" bold>Incident on {location}</Typography>
      <AlertButton user="worker" emergency={type} onPress={handleIncidentPress} />

      <VStack style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <BoxWithIcon icon={selectedEmergency?.icon || DangerIcon} text={emergency} type={type}  />
        <BoxWithNumber number={level} text={`Level`} type={type} />
        <BoxWithNumber number={workersInjured} text={`Workers Injured`} type={type} />
      </VStack>

      {type === 'accident' && (
        <Typography textAlign="center" bold>Please continue your work with caution until further notice.</Typography>
      )}

      {type === 'evacuation' && (
        <CommonButton variant="underline" onPress={navigateToSafeZone} buttonTextSize={18} >
          <Typography>Go to Safe Zone</Typography> 
        </CommonButton>
      )}
    </VStack>
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

export default AlertReceived;
