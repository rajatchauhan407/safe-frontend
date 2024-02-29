import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlobalHeader from '@/app/components/common/globalHeader';

const SupervisorDashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <GlobalHeader title="Supervisor Dashboard" navigation={undefined} showHeader={true} />
      <Text style={styles.text}>Supervisor Dashboard Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});

export default SupervisorDashboard;
