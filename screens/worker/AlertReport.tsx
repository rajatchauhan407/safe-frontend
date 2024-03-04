import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import CommonButton from '../../components/common/button';

const EmergencyForm: React.FC = () => {
  const [reportingFor, setReportingFor] = useState<'Myself' | 'OtherWorker'>('Myself');
  const [numWorkersInjured, setNumWorkersInjured] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [emergencyType, setEmergencyType] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<number | null>(null);
  const [needAssistance, setNeedAssistance] = useState<'Yes' | 'No'>('No');
  const [photo, setPhoto] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleEmergencySelection = (emergency: string) => {
    setSelectedEmergency(emergency);
  };

  const handleUrgencySelection = (level: number) => {
    setUrgencyLevel(level);
  };

  const handleSendButtonPress = () => {
    // Implement logic to send data to the database
    console.log('Sending data to the database:', {
      reportingFor,
      numWorkersInjured,
      selectedEmergency,
      emergencyType,
      urgencyLevel,
      needAssistance,
      photo,
      note,
    });
  };

  return (
    <View>
      {/* FIELD ONE */}
      <Text>I am reporting for</Text>
    <RadioButton.Group onValueChange={(value) => setReportingFor(value as 'Myself' | 'OtherWorker')} value={reportingFor}>
        {/** Add children components here */}
    </RadioButton.Group>

      {/* FIELD TWO */}
      <Text>Number of workers injured*</Text>
      <TouchableOpacity onPress={() => setNumWorkersInjured(Math.max(0, numWorkersInjured - 1))}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text>{numWorkersInjured}</Text>
      <TouchableOpacity onPress={() => setNumWorkersInjured(numWorkersInjured + 1)}>
        <Text>+</Text>
      </TouchableOpacity>

      {/* FIELD THREE */}
      <Text>I am reporting about*</Text>
      {/* Implement your custom buttons with icons here */}

      {/* FIELD FOUR */}
      <Text>Add other</Text>
      <TextInput
        placeholder="Type the emergency type"
        value={emergencyType}
        onChangeText={(text) => setEmergencyType(text)}
      />

      {/* FIELD FIVE */}
      <Text>Select degree of urgency*</Text>
      {/* Implement your custom urgency bar here */}

      {/* FIELD SIX */}
      <Text>Do you need assistance on the spot?*</Text>
      <RadioButton.Group onValueChange={(value) => setNeedAssistance(value)} value={needAssistance}>
        <RadioButton.Item label="Yes" value="Yes" />
        <RadioButton.Item label="No" value="No" />
      </RadioButton.Group>

      {/* FIELD SEVEN */}
      {needAssistance === 'Yes' && (
        <>
          <Text>Photo of Incident Location (Optional)</Text>
          <TouchableOpacity onPress={() => /* Open Camera Logic */}>
            <Text>Open Camera</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Add Note (optional) */}
      <Text>Add Note (optional)</Text>
      <TextInput
        placeholder="Location of the incident"
        value={note}
        onChangeText={(text) => setNote(text)}
      />

      {/* Required Fields Warning */}
      <Text style={{ color: 'red' }}>All the fields above are required.</Text>

      {/* Send Button */}
      <CommonButton
        buttonType={/* Disable the button if any required field is not filled */}
        onPress={handleSendButtonPress}
      >
        Send
      </CommonButton>

      {/* Cancel Alert Button */}
      <TouchableOpacity>
        <Text>Cancel Alert</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyForm;
