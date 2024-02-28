import React from 'react';
import { View, Text } from 'react-native';
import GlobalHeader from '@/app/components/common/GlobalHeader';

const WorkerDashboard: React.FC = () => {
  return (
    <View>
      <GlobalHeader title="Worker Dashboard" />
      <Text>Content for Worker Dashboard</Text>
    </View>
  );
};

export default WorkerDashboard;
