import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BottomNavigationProps {
  tabs: { icon: string; text: string }[];
  onPressTab: (index: number) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ tabs, onPressTab }) => {
  return (
    <View style={styles.bottomNavContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity key={index} style={styles.tab} onPress={() => onPressTab(index)}>
          <Text>{tab.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavigation;
