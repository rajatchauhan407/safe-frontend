import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IncidentProps {
  level: number;
  userType: 'supervisor' | 'worker';
  onPress: () => void;
}

const AlertButton: React.FC<IncidentProps> = ({ level, userType, onPress }) => {
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

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 8,
      marginVertical: 8,
      backgroundColor: getStyles().backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 24,
      marginBottom: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
      color: getStyles().backgroundColor === '#D0080F' ? 'white' : 'black',
    },
    description: {
      fontSize: 16,
      display: getStyles().description === 'none' ? 'none' : 'flex',
      color: getStyles().backgroundColor === '#D0080F' ? 'white' : 'black',
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.icon}>{getStyles().icon}</Text>
        <Text style={styles.title}>{getStyles().title}</Text>
        <Text style={styles.description}>{getStyles().description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlertButton;
