import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { VStack, FormControl, RadioGroup, Radio, HStack, RadioIndicator, RadioIcon, RadioLabel } from '@gluestack-ui/themed';
import { CircleIcon } from '@gluestack-ui/icons';

interface EmergencyFormProps {}

const EmergencyForm: React.FC<EmergencyFormProps> = () => {
  const [reportingFor, setReportingFor] = useState<string>('Myself');
  const [numWorkersInjured, setNumWorkersInjured] = useState<number>(0);

  const handleReportingForChange = (value: string) => {
    setReportingFor(value);
  };

  const handleIncrement = () => {
    setNumWorkersInjured(numWorkersInjured + 1);
  };

  const handleDecrement = () => {
    if (numWorkersInjured > 0) {
      setNumWorkersInjured(numWorkersInjured - 1);
    }
  };

  return (
    <VStack space="md" p={4}>
      {/* FIELD ONE - WHO IS REPORTING */}
      <FormControl>
        <VStack space="md">
          <Text style={styles.label}>I am reporting for</Text>
          <RadioGroup value={reportingFor} onChange={(value) => handleReportingForChange(value)}>
            <HStack space="md">
              <Radio value="Myself" size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} color={reportingFor === 'Myself' ? 'blue' : 'black'} strokeWidth={1} />
                </RadioIndicator>
                <RadioLabel>Myself</RadioLabel>
              </Radio>
              <Radio value="Other worker" size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} color={reportingFor === 'Other worker' ? 'blue' : 'black'} strokeWidth={1} />
                </RadioIndicator>
                <RadioLabel>Other worker</RadioLabel>
              </Radio>
            </HStack>
          </RadioGroup>
        </VStack>
      </FormControl>

      {/* FIELD TWO - WORKER INJURED */}
      <Text style={styles.label}>Number of workers injured*</Text>
      <VStack flexDirection="row" alignItems="center">
        <TouchableOpacity onPress={handleDecrement}>
          <Text style={styles.counterButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{numWorkersInjured}</Text>
        <TouchableOpacity onPress={handleIncrement}>
          <Text style={styles.counterButton}>+</Text>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};

const styles = {
  page: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  counterButton: {
    fontSize: 24,
    paddingHorizontal: 16,
  },
  counterText: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
};

export default EmergencyForm;
