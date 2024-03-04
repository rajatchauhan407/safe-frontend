import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IncidentProps {
  level: number;
  userType: 'supervisor' | 'worker';
  onPress: () => void;
  isCheckedIn: boolean;
}

const AlertButton: React.FC<IncidentProps> = ({ level, userType, onPress, isCheckedIn }) => {
  const getStyles = () => {
    let backgroundColor, icon, title, description;

    switch (level) {
      case 1:
        backgroundColor = '#FD9201';
        icon = userType === 'supervisor' ? 'flame' : 'whistle';
        title = userType === 'supervisor' ? 'Accident Reported' : '1 Whistle';
        description = userType === 'supervisor' ? 'Go to emergency details' : 'none';
        break;
      case 3:
        backgroundColor = '#D0080F';
        icon = userType === 'supervisor' ? 'flame' : 'whistle';
        title = userType === 'supervisor' ? 'Hazard Reported' : 'Active Evacuation';
        description = userType === 'supervisor' ? 'Go to emergency details' : 'none';
        break;
      case 4: 
        backgroundColor = '#D0080F';
        icon = 'triangle';
        title = 'SOS Received';
        description = 'Go to SOS details';
        break;
      default:
        backgroundColor = 'white';
        icon = 'triangle red';
        title = 'Report Incident';
        description = 'Click to report an incident';
        break;
    }

    return {
      backgroundColor,
      icon,
      title,
      description,
    };
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={!isCheckedIn}>
      <View
        style={[
          styles.container,
          { backgroundColor: getStyles().backgroundColor },
          isCheckedIn ? null : styles.disabledButton,
        ]}
      >
        <Text style={styles.icon}>{getStyles().icon}</Text>
        <Text
          style={[
            styles.title,
            { color: getStyles().backgroundColor === '#D0080F' ? 'white' : 'black' },
          ]}
        >
          {getStyles().title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              display:
                getStyles().description === 'none' ? 'none' : 'flex',
              color: getStyles().backgroundColor === '#D0080F' ? 'white' : 'black',
            },
          ]}
        >
          {getStyles().description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
    opacity: 0.5,
  },
});

export default AlertButton;
