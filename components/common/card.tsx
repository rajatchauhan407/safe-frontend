import React from 'react';
import { Card, Heading, Text, Box } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import Typography from '../common/typography';

interface CommonCardProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const CommonCard: React.FC<CommonCardProps> = ({ title, content }) => {
  return (
    <Card size="md" variant="elevated" m={0} rounded={10}
    sx={[styles.card]}
    >
      <Heading mb="$1" size="md">
        <Typography size="md" bold>
          {title}
        </Typography>
        {title}
      </Heading>
      <Box>{content}</Box>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
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
  },
});

export default CommonCard;
