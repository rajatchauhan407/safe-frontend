import React from 'react';
import { VStack, Box } from '@gluestack-ui/themed';
import Typography from '../common/typography';
import SafetyIcon from '../../assets/icons/safety';
import ScreenLayout from '../layout/screenLayout';

interface Instruction {
  id: string;
  icon: JSX.Element;
  text: string;
}

interface EmergencyInstructionsProps {
  emergency: string;
}

const EmergencyInstructions: React.FC<EmergencyInstructionsProps> = ({ emergency }) => {
  const renderInstructions = (emergency: string): Instruction[] => {
    switch (emergency) {
      case 'A worker fell':
        return [
          { id: '1', icon: <SafetyIcon size={48} focussed={false} color={'#00AE8C'} />, text: 'Ensure your own safety before trying to help.' },
          { id: '2', icon: <SafetyIcon size={48} focussed={false} color={'#00AE8C'} />, text: 'Gently tap the person to check for response' },
          { id: '3', icon: <SafetyIcon size={48} focussed={false} color={'#00AE8C'} />, text: 'Check for breathing.' },
          { id: '4', icon: <SafetyIcon size={48} focussed={false} color={'#00AE8C'} />, text: 'If there is bleeding, apply direct pressure to the wound using a clean cloth.' },
          { id: '5', icon: <SafetyIcon size={48} focussed={false} color={'#00AE8C'} />, text: 'Do not move the injured area, wait for medical staff to arrive.' },
        ];
      case 'Fire hazard':
        return [
          { id: '1', icon: <SafetyIcon size={48} focussed={false} color={'#00AE8C'} />, text: 'Ensure your own safety before trying to help.' },
          { id: '2', icon: <SafetyIcon size={48} focussed={false} color={'#00AE8C'} />, text: 'Gently tap the person to check for response' },
        ];
      // Add cases for other emergencies
      default:
        return [];
    }
  };

  // Get instructions based on the selected emergency
  const instructions: Instruction[] = renderInstructions(emergency);

  return (
    <VStack space='md' bg='white'>
      <Typography textAlign="center" bold>
        {emergency}
      </Typography>
      <Typography textAlign="center" bold>Follow these instructions until first aid workers arrive:</Typography>
      {instructions.map(instruction => (
        <VStack width={"80%"} m={15} key={instruction.id} flexDirection="row" alignItems="center">
          {instruction.icon}
          <Typography>{instruction.text}</Typography>
        </VStack>
      ))}
    </VStack>
  )
};  

export default EmergencyInstructions;
