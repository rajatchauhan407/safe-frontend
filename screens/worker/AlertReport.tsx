import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

interface EmergencyFormProps {
  // Add any necessary props for database connection here
}

const EmergencyForm: React.FC<EmergencyFormProps> = () => {
  const [reportingFor, setReportingFor] = useState<'Myself' | 'OtherWorker'>('Myself');
  const [numWorkersInjured, setNumWorkersInjured] = useState(0);
  const [reportType, setReportType] = useState<string | null>(null);
  const [otherEmergencyType, setOtherEmergencyType] = useState('');

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

  const handleReportType = (type: string) => {
    setReportType(type);
  };

  const handleOtherEmergencyTypeChange = (text: string) => {
    setOtherEmergencyType(text);
  };

  const renderReportButtons = () => {
    const reportButtonsData = [
      { type: 'Type1', icon: 'ios-alert', text: 'A worker fell' },
      { type: 'Type2', icon: 'ios-medical', text: 'Fire hazard' },
      { type: 'Type3', icon: 'ios-flame', text: 'Electrical hazard' },
      { type: 'Type4', icon: 'ios-car', text: 'An injury occured' },
      { type: 'Type5', icon: 'ios-water', text: 'Confined spaces' },
      { type: 'Type6', icon: 'ios-nuclear', text: 'Struck by hazard' },
    ];

    return reportButtonsData.map((button) => (
      <TouchableOpacity
        key={button.type}
        style={[
          styles.reportButton,
          reportType === button.type && styles.reportButtonSelected,
        ]}
        onPress={() => handleReportType(button.type)}
      >
        <Text
          style={[
            styles.reportButtonText,
            reportType === button.type && styles.reportButtonTextSelected,
          ]}
        >
          {button.text}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
    >
      <ScrollView
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.page}>
          {/* FIELD ONE - WHO IS REPORTING */}
          <View style={styles.fieldContainer}>
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
          </View>
      
          {/* FIELD TWO - NUMBER OF WORKERS INJURED */}
          <View style={styles.fieldContainer}>
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
      
          {/* FIELD THREE - REPORT TYPE */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>I am reporting about*</Text>
            <View style={styles.reportButtonContainer}>{renderReportButtons()}</View>

            {/* Add other option with TextInput */}
            <Text style={styles.label}>Add other</Text>
            <TextInput
              style={styles.otherEmergencyInput}
              placeholder="Type the emergency here"
              value={otherEmergencyType}
              onChangeText={handleOtherEmergencyTypeChange}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 24,
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
    height: 16,
    width: 16,
    borderRadius: 8,
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
  reportButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  reportButton: {
    width: '30%', 
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportButtonText: {
    marginTop: 8,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reportButtonSelected: {
    backgroundColor: '#FD9201', 
  },
  reportButtonTextSelected: {
    fontWeight: 'bold',
  },
  otherEmergencyInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});

export default EmergencyForm;
