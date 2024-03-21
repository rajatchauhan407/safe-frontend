// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import CommonButton from '../../components/common/button';
// import useFetch from '../../hooks/useFetch';
// import { BACKEND_BASE_URL } from '../../config/api';
// import ScreenLayout from '../../components/layout/screenLayout';
// interface EmergencyFormProps {
//   // Add any necessary props for database connection here
// }

// const EmergencyForm: React.FC<EmergencyFormProps> = () => {
  
//   const [reportingFor, setReportingFor] = useState<'Myself' | 'OtherWorker'>('Myself');
//   const [numWorkersInjured, setNumWorkersInjured] = useState(0);
//   const [reportType, setReportType] = useState<string | null>(null);
//   const [otherEmergencyType, setOtherEmergencyType] = useState('');
//   const [urgencyLevel, setUrgencyLevel] = useState<number | null>(null);
//   const [needAssistance, setNeedAssistance] = useState<boolean>(false);
  
//   const urgencyColors = ['yellow', 'orange', 'red'];
  
  
//   const { data, isLoading, error, fetchData } = useFetch(`${BACKEND_BASE_URL}alert`, 'POST');
//   const handleReportingChange = (option: 'Myself' | 'OtherWorker') => {
//     setReportingFor(option);
//   };

//   const handleIncrement = () => {
//     setNumWorkersInjured(numWorkersInjured + 1);
//   };

//   const handleDecrement = () => {
//     if (numWorkersInjured > 0) {
//       setNumWorkersInjured(numWorkersInjured - 1);
//     }
//   };

//   const handleReportType = (type: string) => {
//     setReportType(type);
//   };

//   const handleOtherEmergencyTypeChange = (text: string) => {
//     setOtherEmergencyType(text);
//   };

//   const handleUrgencySelection = (level: number) => {
//     setUrgencyLevel(level);
//   };

//   const handleAssistanceChange = (value: boolean) => {
//     setNeedAssistance(value);
//   };

//   const renderReportButtons = () => {
//     const reportButtonsData = [
//       { type: 'Type1', icon: 'ios-alert', text: 'A worker fell' },
//       { type: 'Type2', icon: 'ios-medical', text: 'Fire hazard' },
//       { type: 'Type3', icon: 'ios-flame', text: 'Electrical hazard' },
//       { type: 'Type4', icon: 'ios-car', text: 'An injury occurred' },
//       { type: 'Type5', icon: 'ios-water', text: 'Confined spaces' },
//       { type: 'Type6', icon: 'ios-nuclear', text: 'Struck by hazard' },
//     ];

//     return reportButtonsData.map((button) => (
//       <TouchableOpacity
//         key={button.type}
//         style={[
//           styles.reportButton,
//           reportType === button.type && styles.reportButtonSelected,
//         ]}
//         onPress={() => handleReportType(button.type)}
//       >
//         <Text
//           style={[
//             styles.reportButtonText,
//             reportType === button.type && styles.reportButtonTextSelected,
//           ]}
//         >
//           {button.text}
//         </Text>
//       </TouchableOpacity>
//     ));
//   };

//   const renderUrgencyCircles = () => {
//     const levels = [1, 2, 3];

//     return (
//       <View style={styles.urgencySliderContainer}>
//         {levels.map((level) => (
//           <TouchableOpacity
//           key={level}
//           style={[
//             styles.urgencyCircle,
//             urgencyLevel === level && {
//               borderColor: urgencyColors[level - 1],
//               backgroundColor: urgencyColors[level - 1],
//             },
//             urgencyLevel !== level && {
//               borderColor: urgencyColors[level - 1],
//             },
//             styles.selectedUrgencyCircle,
//           ]}
//           onPress={() => handleUrgencySelection(level)}
//         >
//           <Text style={styles.urgencyCircleText}>{level}</Text>
//         </TouchableOpacity>        
//         ))}
//       </View>
//     );
//   };

//   const renderAssistanceField = () => {
//     return (
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Do you need assistance on the spot?</Text>
//         <View style={styles.radioButtonContainerHorizontal}>
//           <TouchableOpacity
//             style={[
//               styles.radioButton,
//               needAssistance && styles.radioButtonSelected,
//             ]}
//             onPress={() => handleAssistanceChange(true)}
//           >
//             {needAssistance && <View style={styles.innerCircle} />}
//           </TouchableOpacity>
//           <Text style={styles.radioButtonLabel}>Yes</Text>

//           <TouchableOpacity
//             style={[
//               styles.radioButton,
//               !needAssistance && styles.radioButtonSelected,
//             ]}
//             onPress={() => handleAssistanceChange(false)}
//           >
//             {!needAssistance && <View style={styles.innerCircle} />}
//           </TouchableOpacity>
//           <Text style={styles.radioButtonLabel}>No</Text>
//         </View>

//         {needAssistance && renderPhotoField()}
//       </View>
//     );
//   };

//   const renderPhotoField = () => {
//     return (
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Photo of the incident location</Text>
//         <CommonButton
//           // buttonType="whiteButton"
//           onPress={() => {
//           }}
//         >
//           <Text>Take Photo</Text>
//         </CommonButton>
//       </View>
//     );
//   };

// /*** send alert for the app ****/
//   const sendAlert = async () => {
//     console.log('Sending alert');
//     console.log('Reporting for:', reportingFor);
//     console.log('Number of workers injured:', numWorkersInjured);
//     console.log('Report type:', reportType);
//     console.log('Other emergency type:', otherEmergencyType);
//     console.log('Urgency level:', urgencyLevel);
//     console.log('Need assistance:', needAssistance);
//     const alertData = {
//       reportingFor,
//       numWorkersInjured,
//       reportType,
//       otherEmergencyType,
//       urgencyLevel,
//       needAssistance,
//     };
//     const options = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(alertData),
//     }
//     await fetchData(options);
//   };


//   return (
//   <ScreenLayout>
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
//     >
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//       >
//         <View>
//           {/* FIELD ONE - WHO IS REPORTING */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>I am reporting for*</Text>
//             <View style={styles.radioButtonContainerHorizontal}>
//               <TouchableOpacity
//                 style={[styles.radioButton, reportingFor === 'Myself' && styles.radioButtonSelected]}
//                 onPress={() => handleReportingChange('Myself')}
//               >
//                 {reportingFor === 'Myself' && <View style={styles.innerCircle} />}
//               </TouchableOpacity>
//               <Text style={styles.radioButtonLabel}>Myself</Text>

//               <TouchableOpacity
//                 style={[styles.radioButton, reportingFor === 'OtherWorker' && styles.radioButtonSelected]}
//                 onPress={() => handleReportingChange('OtherWorker')}
//               >
//                 {reportingFor === 'OtherWorker' && <View style={styles.innerCircle} />}
//               </TouchableOpacity>
//               <Text style={styles.radioButtonLabel}>Other worker</Text>
//             </View>
//           </View>

//           {/* FIELD TWO - NUMBER OF WORKERS INJURED */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Number of workers injured*</Text>
//             <View style={styles.numberInputContainer}>
//               <TouchableOpacity style={styles.circleButton} onPress={handleDecrement}>
//                 <Text style={styles.buttonText}>-</Text>
//               </TouchableOpacity>
//               <View style={styles.numberDisplay}>
//                 <Text style={styles.numberText}>{numWorkersInjured}</Text>
//               </View>
//               <TouchableOpacity style={styles.circleButton} onPress={handleIncrement}>
//                 <Text style={styles.buttonText}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* FIELD THREE - REPORT TYPE */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>I am reporting about*</Text>
//             <View style={styles.reportButtonContainer}>{renderReportButtons()}</View>

//             {/* Add other options with TextInput */}
//             <Text style={styles.label}>Add other</Text>
//             <TextInput
//               style={styles.otherEmergencyInput}
//               placeholder="Type the emergency here"
//               value={otherEmergencyType}
//               onChangeText={handleOtherEmergencyTypeChange}
//             />
//           </View>
//           {/* FIELD FOUR - DEGREE OF URGENCY */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Select degree of urgency*</Text>
//             {renderUrgencyCircles()}
//           </View>
//           {/* FIELD FIVE - NEED ASSISTANCE */}
//           {renderAssistanceField()}
//         </View>
        
//         {/* SEND REPORT */}
//         <View style={styles.requiredTextContainer}>
//           <Text style={styles.requiredText}>All the above fields are required</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//         <CommonButton
//           // buttonType="default"
//           disabled={
//             !(
//               numWorkersInjured >= 0 &&
//               reportType &&
//               (reportType !== 'Type7' || otherEmergencyType.trim() !== '') &&
//               urgencyLevel !== null
//             )
//           }
//           onPress={sendAlert}
//         >
//           <Text>Send Alert</Text>
//         </CommonButton>
//         </View>
//         <View style={styles.buttonContainer}>
//           <CommonButton 
//             // buttonType="underline"
//             >
//             <Text>Cancel Alert</Text>
//           </CommonButton>
//         </View>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   </ScreenLayout>  
//   );
// };

// const styles = StyleSheet.create({
//   fieldContainer: {
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     fontWeight: 'bold',
//   },
//   radioButtonContainerHorizontal: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   radioButton: {
//     height: 24,
//     width: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   radioButtonSelected: {
//     borderColor: '#000',
//   },
//   innerCircle: {
//     height: 16,
//     width: 16,
//     borderRadius: 8,
//     backgroundColor: '#000',
//   },
//   radioButtonLabel: {
//     marginRight: 16,
//   },
//   numberInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   circleButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 18,
//   },
//   numberDisplay: {
//     minWidth: 80,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   numberText: {
//     fontSize: 16,
//   },
//   reportButtonContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   reportButton: {
//     width: '30%',
//     backgroundColor: 'white',
//     aspectRatio: 1,
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   reportButtonText: {
//     marginTop: 8,
//     color: 'black',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   reportButtonSelected: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#FD9201',
//   },
//   reportButtonTextSelected: {
//     fontWeight: 'bold',
//   },
//   otherEmergencyInput: {
//     height: 40,
//     borderColor: '#000',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 8,
//   },
//   urgencySliderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   urgencyCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedUrgencyCircle: {
//     borderWidth: 2,
//   },
//   urgencyCircleText: {
//     fontSize: 16,
//     color: 'black',
//   },
//   requiredTextContainer: {
//     marginTop: 0,
//   },
//   requiredText: {
//     color: 'red',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     marginTop: 16,
//   },
// });

// export default EmergencyForm;


import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  CircleIcon,
  FormControl,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  Textarea,
  TextareaInput,
  ScrollView,
  Button,
} from "@gluestack-ui/themed";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from '../../components/common/typography';
import CommonButton from '../../components/common/button';
import FallIcon from '../../assets/icons/fall';
import FireHazardIcon from '../../assets/icons/fireHazard';
import ElectricIcon from '../../assets/icons/electric';
import InjuredIcon from '../../assets/icons/injured';
import SpaceIcon from '../../assets/icons/space';
import DangerIcon from '../../assets/icons/danger';
import ScreenLayout from '../../components/layout/screenLayout';
import { BACKEND_BASE_URL } from '../../config/api';

interface EmergencyItem {
  text: string;
  icon: React.FC<any>;
}

const AlertReport: React.FC = () => {
  const [reportingFor, setReportingFor] = useState<'Myself' | 'OtherWorker'>('Myself');
  const [numWorkersInjured, setNumWorkersInjured] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState(2);
  const [needAssistance, setNeedAssistance] = useState<'Yes' | 'No'>('Yes');
  const [showAssistanceForm, setShowAssistanceForm] = useState(false);

  const emergencies: EmergencyItem[] = [
    { text: 'A worker fell', icon: FallIcon },
    { text: 'Fire hazard', icon: FireHazardIcon },
    { text: 'Electrical hazard', icon: ElectricIcon },
    { text: 'Injury', icon: InjuredIcon },
    { text: 'Confined spaces', icon: SpaceIcon },
    { text: 'Struck by hazard', icon: DangerIcon },
  ];

  const chunkedEmergencies = chunkArray(emergencies, 3);

  const handleEmergencySelection = (text: string) => {
    setSelectedEmergency(text === selectedEmergency ? null : text);
  };

  const handleChangeUrgency = (value: number) => {
    setUrgencyLevel(value);
  };

  const getTrackColor = () => {
    switch (urgencyLevel) {
      case 1:
        return "#FFC24B";
      case 2:
        return "$highlight";
      case 3:
        return "$alert";
      default:
        return "$neutral";
    }
  };

  const getThumbColor = () => {
    switch (urgencyLevel) {
      case 1:
        return "#FFC24B";
      case 2:
        return "$highlight";
      case 3:
        return "$alert";
      default:
        return "$neutral";
    }
  };

  const BoxIconWithText: React.FC<{ icon: React.FC<any>; text: string }> = ({ icon: IconComponent, text }) => {
    const isSelected = selectedEmergency === text;
    return (
      <TouchableOpacity
        onPress={() => handleEmergencySelection(text)}
        style={[
          styles.boxContainer,
          isSelected ? styles.selectedBox : null
        ]}
      >
        <VStack space='sm' width={110} height={110} style={{ alignItems: 'center', justifyContent: 'center' }} p={10} borderRadius={22}>
          <IconComponent size={34} color="#1E1E1E" />
          <Typography textAlign="center" bold>{text}</Typography>
        </VStack>
      </TouchableOpacity>
    );
  };

  const handleAssistanceSelection = (value: 'Yes' | 'No') => {
    setNeedAssistance(value);
    if (value === 'Yes') {
      setShowAssistanceForm(true);
    } else {
      setShowAssistanceForm(false);
    }
  };

  const AssistanceForm = () => {
    return (
      <FormControl>
        <VStack space="md">
        <Typography bold>Photo of Incident Location (Optional)</Typography>
        <CommonButton variant="rounded" action="positive" showIcon={true} buttonTextSize={18} >   
          Take a Photo
        </CommonButton> 
        </VStack>    
      </FormControl>
    );
  };

  return (
    <>
      <ScrollView>
        <ScreenLayout>
          <VStack space="2xl">

            {/* FIELD 1 - REPORT FOR */}
            <FormControl>
              <RadioGroup value={reportingFor} onChange={setReportingFor}>
                <VStack space="md">
                  <Typography bold>I am reporting for*</Typography>
                  <HStack space="2xl">
                    <Radio size='lg' value="Myself">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>Myself</Typography>
                    </Radio>
                    <Radio size='lg' value="Other worker">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>Other worker</Typography>
                    </Radio>
                  </HStack>
                </VStack>
              </RadioGroup>
            </FormControl>

            {/* FIELD 2 - NUMBER OF WORKERS INJURED */}
            <FormControl>
              <VStack space="md">
                <Typography bold>Number of workers injured*</Typography>
                <View style={styles.numberInputContainer}>
                  <TouchableOpacity style={styles.circleButton} onPress={() => setNumWorkersInjured(numWorkersInjured - 1)}>
                    <Typography bold>-</Typography>
                  </TouchableOpacity>
                  <View style={styles.numberDisplay}>
                    <Typography bold>{numWorkersInjured}</Typography>
                  </View>
                  <TouchableOpacity style={styles.circleButton} onPress={() => setNumWorkersInjured(numWorkersInjured + 1)}>
                    <Typography bold>+</Typography>
                  </TouchableOpacity>
                </View>
              </VStack>
            </FormControl>

            {/* FIELD 3 - REPORT TYPE */}
            <FormControl>
              <VStack space="md">
                <Typography bold>I am reporting about*</Typography>
                <VStack space="md">
                  {chunkedEmergencies.map((chunk: EmergencyItem[], index: number) => (
                    <HStack key={index} space="md">
                      {chunk.map((emergency: EmergencyItem, innerIndex: number) => (
                        <BoxIconWithText key={innerIndex} icon={emergency.icon} text={emergency.text} />
                      ))}
                    </HStack>
                  ))}
                  {/* Render Textarea if no emergency is selected */}
                  {selectedEmergency === null && (
                    <FormControl>
                      <Typography bold>Describe the emergency*</Typography>
                      <Textarea>
                        <TextareaInput />
                      </Textarea>
                    </FormControl>
                  )}
                </VStack>
              </VStack>
            </FormControl>

            {/* FIELD 4 - DEGREE OF URGENCY */}
            <FormControl>
              <Typography bold>Select degree of urgency*</Typography>
              <HStack space="lg" p={25}>
                <Slider
                  step={1}
                  maxValue={3}
                  minValue={1}
                  size='lg'
                  defaultValue={urgencyLevel}
                  onChange={handleChangeUrgency}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg={getTrackColor()} />
                  </SliderTrack>
                  <SliderThumb bg={getThumbColor()} p='$1' width={40} height={40} $active-outlineColor={getThumbColor()}>
                    <Typography textAlign="center" color="white" size="2xl" bold>{urgencyLevel}</Typography>
                  </SliderThumb>
                </Slider>
              </HStack>
            </FormControl>

            {/* FIELD 5 - NEED ASSISTANCE */}
            <FormControl>
              <RadioGroup value={needAssistance} onChange={handleAssistanceSelection}>
                <VStack space="md">
                  <Typography bold>Do you need assistance on the spot?*</Typography>
                  <HStack space="2xl">
                    <Radio size='lg' value="Yes">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>Yes</Typography>
                    </Radio>
                    <Radio size='lg' value="No">
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Typography>No</Typography>
                    </Radio>
                  </HStack>
                </VStack>
              </RadioGroup>
            </FormControl>

            {showAssistanceForm && <AssistanceForm />}

          </VStack>
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
  boxContainer: {
    borderWidth: 2,
    borderColor: '#C7C7C7',
    borderRadius: 22,
  },
  selectedBox: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
});

function chunkArray(arr: any[], size: number) {
  return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
}

export default AlertReport;
