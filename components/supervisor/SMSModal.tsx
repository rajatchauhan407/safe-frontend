// Component Imports===============================================
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Button,
  ButtonText,
  Center,
  CheckIcon,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import SucessIcon from "../../assets/icons/sucess";
import Typography from "../common/typography";
import CommonButton from "../common/button";
import CustomModal from "../common/modal";
import { Checkbox } from "@gluestack-ui/themed";
import { CheckboxIcon } from "@gluestack-ui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
// Connection to backend Imports===============================================
import axios from "axios";
import { BACKEND_BASE_URL } from "../../config/api";
// =================================================================
// HardCoded Emergency Contacts

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const emergencyContacts = [
  { id: "1", name: "911", phoneNumber: "+16726736640" },
  { id: "2", name: "BC Workers", phoneNumber: "+16729998362" },
  { id: "3", name: "FireFighter", phoneNumber: "+16043633286" },
  { id: "4", name: "Manager", phoneNumber: "+16047206967" },
  { id: "5", name: "First Aid Team", phoneNumber: "+16726736640" },
];

const SMSModal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const [checkedContacts, setCheckedContacts] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // =============================================
  // Emergency Contact Toggle Function:
  const toggleContact = (contactId: string) => {
    setCheckedContacts((prevContacts) =>
      prevContacts.includes(contactId)
        ? prevContacts.filter((id) => id !== contactId)
        : [...prevContacts, contactId]
    );
  };

  // Send SMS to Backend Function
  const sendSMS = async () => {
    try {
      const contactsArray = checkedContacts
        .map((contactId) => {
          const selectedContact = emergencyContacts.find(
            (contact) => contact.id === contactId
          );
          if (selectedContact) {
            return { phoneNumber: selectedContact.phoneNumber };
          }
          return null;
        })
        .filter(Boolean);
      await axios.post(`${BACKEND_BASE_URL}/sms`, {
        contacts: contactsArray,
        message: "This is an Emergency Alert From SAFE App",
      });
      console.log("SMS sent successfully");
      console.log("Checked Contacts:", checkedContacts);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  // =============================================
  // Renderin the Component:======================
  return (
    <Center>
      <Modal isOpen={showModal}>
        <ModalBackdrop />
        <ModalContent borderRadius="$3xl">
          <ModalHeader justifyContent="center">
            <VStack>
              {/* ICON */}
              <Center>
                <SucessIcon size={60} color="#00AE8C" focussed={false} />
              </Center>
              {/* TITLE */}
              <Heading mt="$4" textAlign="center">
                <Typography bold size="xl">
                  Your emergency whistle has been triggered.
                </Typography>
              </Heading>
            </VStack>
          </ModalHeader>

          <Box borderWidth={1} borderRadius="$2xl" m="$4" mt="$2">
            <ModalBody width="$full" m="$0">
              {/* CHECKLIST TITLE */}
              <Text textAlign="center" py="$3" borderBottomWidth={1}>
                <Typography bold>Choose SMS alert contacts</Typography>
              </Text>
              {/* CHECKLIST */}
              <VStack space="md" mt="$3">
                {emergencyContacts.map((contact) => (
                  <Box key={contact.id} p="$3" pt="$0" borderBottomWidth={1}>
                    <Checkbox
                      justifyContent="space-between"
                      value={contact.id}
                      onPress={() => toggleContact(contact.id)}
                      accessibilityLabel={contact.name}
                    >
                      <CheckboxLabel>
                        <Typography>{contact.name}</Typography>
                      </CheckboxLabel>
                      <CheckboxIndicator
                        $checked={checkedContacts.includes(contact.id)}
                        // $checked={{ backgroundColor: checkedContacts.includes(contact.id) ? 'blue' : 'white' }}
                      >
                        <CheckboxIcon bg="$neutral" as={CheckIcon} />
                      </CheckboxIndicator>
                    </Checkbox>
                  </Box>
                ))}
              </VStack>
            </ModalBody>

            <ModalFooter justifyContent="center">
              <VStack>
                {/* SEND SMS */}
                <CommonButton
                  onPress={() => {
                    sendSMS();
                    setTimeout(() => {
                      setShowModal(false);
                      setShowConfirmation(true);
                    }, 2000);
                  }}
                >
                  <ButtonText>
                    <Typography>Send</Typography>
                  </ButtonText>
                </CommonButton>

                {/* SKIP SMS  */}
                <ModalCloseButton mt="$4" onPress={() => setShowModal(false)}>
                  <Typography textDecorationLine="underline">
                    Skip SMS Messages
                  </Typography>
                </ModalCloseButton>
              </VStack>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>

      <CustomModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        icon={<SucessIcon size={40} color="#00AE8C" focussed={false} />}
        title="Success"
        description="The SMS Alert messages to on-site First Aid Workers have been sent."
        buttonText="Go to Dashboard"
        buttonAction={() => {
          navigation.navigate("Dashboard" as never);
          setShowConfirmation(false);
        }}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default SMSModal;
