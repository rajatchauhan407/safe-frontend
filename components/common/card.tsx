import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CommonCardProps {
    title:string,
    content:any
  }

  const CommonCard: React.FC<CommonCardProps> = ({ title, content }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    width: '100%',
  },
});

export default CommonCard;
