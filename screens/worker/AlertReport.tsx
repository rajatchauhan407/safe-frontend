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
    <View style={styles.page}>
      {/* FIELD ONE - WHO IS REPORTING */}
      <Text style={styles.label}>I am reporting for*</Text>
      <View style={styles.radioButtonContainerHorizontal}>
        <TouchableOpacity
          style={[styles.radioButton, reportingFor === 'Myself' && styles.radioButtonSelected]}
          onPress={() => handleReportingChange('Myself')}
        >
          {reportingFor === 'Myself' && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <Text style={styles.radioButtonLabel}>Myself</Text>

        <TouchableOpacity
          style={[styles.radioButton, reportingFor === 'OtherWorker' && styles.radioButtonSelected]}
          onPress={() => handleReportingChange('OtherWorker')}
        >
          {reportingFor === 'OtherWorker' && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <Text style={styles.radioButtonLabel}>Other worker</Text>
      </View>

      {/* FIELD TWO - NUMBER OF WORKERS INJURED */}
      <Text style={styles.label}>Number of workers injured*</Text>
      <View style={styles.numberInputContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.numberDisplay}>
          <Text style={styles.numberText}>{numWorkersInjured}</Text>
        </View>
        <TouchableOpacity style={styles.circleButton} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  radioButtonContainerHorizontal: {
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
  radioButtonLabel: {
    marginRight: 16,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  numberDisplay: {
    minWidth: 80,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  numberText: {
    fontSize: 16,
  },
});

export default EmergencyForm;
