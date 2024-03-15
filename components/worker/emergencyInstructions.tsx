import React from 'react';
import { VStack, Text } from '@gluestack-ui/themed';
import Typography from '../common/typography';

interface Instruction {
  id: string;
  icon: JSX.Element;
  text: string;
}

interface EmergencyInstructionsProps {
  emergency: string;
}

const EmergencyInstructions: React.FC<EmergencyInstructionsProps> = ({ emergency }) => {
  // Function to render instructions based on the selected emergency
  const renderInstructions = (emergency: string): Instruction[] => {
    switch (emergency) {
      case 'A worker fell':
        return [
          { id: '1', icon: <CustomIcon name="fallen-worker" size={24} />, text: 'Check for responsiveness' },
          { id: '2', icon: <CustomIcon name="call-emergency" size={24} />, text: 'Call emergency services' },
          // Add more instructions as needed
        ];
      case 'Fire hazard':
        return [
          { id: '1', icon: <CustomIcon name="fire" size={24} />, text: 'Evacuate the area immediately' },
          { id: '2', icon: <CustomIcon name="call-emergency" size={24} />, text: 'Call emergency services' },
          // Add more instructions as needed
        ];
      // Add cases for other emergencies
      default:
        return [];
    }
  };

  // Get instructions based on the selected emergency
  const instructions: Instruction[] = renderInstructions(emergency);

  return (
    <VStack p={4} bg="white">
      <Typography size="xl" fontWeight="bold" mb={2}>
        {emergency}
      </Typography>
      <Typography mb={2}>Follow these instructions until first aid workers arrive:</Typography>
      {instructions.map(instruction => (
        <VStack key={instruction.id} flexDirection="row" alignItems="center">
          {instruction.icon}
          <Typography>{instruction.text}</Typography>
        </VStack>
      ))}
    </VStack>
  );
};

export default EmergencyInstructions;
