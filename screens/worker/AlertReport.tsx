import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface EmergencyFormProps {
  // Add any necessary props for database connection here
}

const EmergencyForm: React.FC<EmergencyFormProps> = () => {
  const [reportingFor, setReportingFor] = useState<'Myself' | 'OtherWorker'>('Myself');
  const [numWorkersInjured, setNumWorkersInjured] = useState(0);

  const handleReportingChange = (option: 'Myself' | 'OtherWorker') => {
    setReportingFor(option);
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
    <View style={styles.container}>
      <Text style={styles.label}>I am reporting for</Text>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity
          style={[styles.radioButton, reportingFor === 'Myself' && styles.radioButtonSelected]}
          onPress={() => handleReportingChange('Myself')}
        >
          {reportingFor === 'Myself' && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <Text>Myself</Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity
          style={[styles.radioButton, reportingFor === 'OtherWorker' && styles.radioButtonSelected]}
          onPress={() => handleReportingChange('OtherWorker')}
        >
          {reportingFor === 'OtherWorker' && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <Text>Other worker</Text>
      </View>

      <Text style={styles.label}>Number of workers injured</Text>
      <View style={styles.numberInputContainer}>
        <TouchableOpacity style={styles.plusMinusButton} onPress={handleDecrement}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{numWorkersInjured}</Text>
        <TouchableOpacity style={styles.plusMinusButton} onPress={handleIncrement}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    borderColor: '#000',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusMinusButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 8,
  },
});

export default EmergencyForm;
