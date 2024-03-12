import React, { useState, useEffect } from 'react';
import { VStack, Card, Text, Box } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import Typography from './typography';
import DaysCheckIcon from '../../assets/icons/daysCheck';

interface CommonDaysAccidentCardProps {
  daysWithoutAccident: number;
  layout?: 'row' | 'column';
}

const CommonDaysAccidentCard: React.FC<CommonDaysAccidentCardProps> = ({ layout = 'row' }) => {
  const isRowLayout: boolean = layout === 'row';
  const [daysWithoutAccident, setDaysWithoutAccident] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay (e.g., fetching data from a server)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate receiving the number from the database
        const simulatedNumber = 365;

        setDaysWithoutAccident(simulatedNumber);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <VStack space="md" m={0}>
      <Card size="md" variant="elevated" m={0} rounded={24} bg={'$primary0'}
        style={isRowLayout ? styles.rowContainer : styles.columnContainer}>
        <DaysCheckIcon size={36} color={'#00AE8C'} focussed={false} />
        <Typography size="md">Days without accident</Typography>
        <Box style={styles.daysTextContainer}>
          <Text style={styles.daysText}>{daysWithoutAccident}</Text>
        </Box>
      </Card>
    </VStack>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  daysTextContainer: {
    backgroundColor: "#F8F8FF",
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  daysText: {
    fontSize: 44,
  },
});

export default CommonDaysAccidentCard;
