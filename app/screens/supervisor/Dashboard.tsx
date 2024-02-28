import React from 'react';
import { View, Text } from 'react-native';
import GlobalHeader from '@/app/components/common/GlobalHeader';

const SupervisorDashboard: React.FC = () => {
  return (
    <View>
      <GlobalHeader title="Supervisor Dashboard" />
      <Text>Content for Supervisor Dashboard</Text>
    </View>
  );
};

export default SupervisorDashboard;
