import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GlobalHeaderProps {
  title: string;
  navigation: any;
  showHeader: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title, navigation, showHeader }) => {
  if (!showHeader) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GlobalHeader;
