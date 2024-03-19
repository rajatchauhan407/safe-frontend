// Component Imports===============================================
import React from "react";
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
import { Checkbox } from "@gluestack-ui/themed";
import { CheckboxIcon } from "@gluestack-ui/themed";
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
];

const SMSModal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const [checkedContacts, setCheckedContacts] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
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
      <Modal borderRadius="$2xl" isOpen={showModal}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader justifyContent="center">
            <VStack>
              {/* Icon */}
              <Center>
                <SucessIcon size={60} color="#00AE8C" focussed={false} />
              </Center>
              {/* Title */}
              <Heading mt="$4" textAlign="center">
                <Typography bold size="xl">
                  Your emergency whistle has been triggered.
                </Typography>
              </Heading>
            </VStack>
          </ModalHeader>

          <Box borderWidth={1} borderRadius="$2xl" m="$4" mt="$2">
            <ModalBody width="$full" m="$0">
              {/* Checklist title */}
              <Text textAlign="center" py="$3" borderBottomWidth={1}>
                <Typography bold>Choose SMS alert contacts</Typography>
              </Text>
              {/* Checklist*/}
              <VStack space="md" mt="$3">
                {emergencyContacts.map((contact) => (
                  <Box key={contact.id} p="$3" pt="$0" borderBottomWidth={1}>
                    <Checkbox
                      justifyContent="space-between"
                      value={contact.id}
                      onPress={() => toggleContact(contact.id)}
                    >
                      <CheckboxLabel>
                        <Typography>{contact.name}</Typography>
                      </CheckboxLabel>
                      <CheckboxIndicator
                        $checked={checkedContacts.includes(contact.id)}
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
                <CommonButton
                  onPress={() => {
                    sendSMS();
                    setTimeout(() => {
                      setShowModal(false);
                    }, 2000);
                  }}
                >
                  <ButtonText>
                    <Typography>Send</Typography>
                  </ButtonText>
                </CommonButton>
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
