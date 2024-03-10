import React, { useState, useEffect } from 'react';
import { VStack, Card, Text } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';

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
      <Card
        size="md"
        variant="elevated"
        p="$4"
        style={isRowLayout ? styles.rowContainer : styles.columnContainer}
      >
        <Text style={styles.leftColumnText}>Days without accident</Text>
        <Text style={styles.rightColumnNumber}>{daysWithoutAccident}</Text>
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
  leftColumnText: {
    marginTop: 8,
  },
  rightColumnNumber: {
    fontSize: 44,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
});

export default CommonDaysAccidentCard;
