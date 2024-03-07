import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CommonCardProps {
    title:any,
    content:any
  }

  const CommonCard: React.FC<CommonCardProps> = ({ title, content }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  }
});

export default CommonCard;
