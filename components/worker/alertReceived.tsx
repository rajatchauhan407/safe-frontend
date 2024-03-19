import React from 'react';
import { VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import Typography from '../common/typography';
import AlertButton from '../common/alertButton';
import CommonButton from '../common/button';

interface AlertReceivedProps {
  type: 'accident' | 'evacuation';

  location: string;
  level: number;
  workersInjured: number;
}

const AlertReceived: React.FC<AlertReceivedProps> = ({ type, location, level, workersInjured }) => {
  const navigation = useNavigation();

  const handleIncidentPress = () => {
    // Handle incident press
  };

  const navigateToSafeZone = () => {
    // Navigate to safe zone screen
    // navigation.navigate('SafeZoneScreen');
  };

  return (
    <VStack space="md">
      <Typography textAlign="center" bold>Incident on {location}</Typography>
      <AlertButton user="worker" emergency={type} onPress={handleIncidentPress} />

      <VStack style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <BoxWithIcon icon="warning-outline" text={type} />
        <BoxWithIcon icon="alert-circle-outline" text={`Level: ${level}`} />
        <BoxWithIcon icon="person-outline" text={`Workers Injured: ${workersInjured}`} />
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
  icon: string;
  text: string;
}

const BoxWithIcon: React.FC<BoxWithIconProps> = ({ icon, text }) => {
  return (
    <VStack style={{ alignItems: 'center' }}>
      {/* <Icon name={icon} size={30} color="black" /> */}
      <Typography style={{ marginTop: 5 }}>{text}</Typography>
    </VStack>
  );
};

export default AlertReceived;