// Component Imports===============================================
import React, { useState , useEffect} from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
// ============================================================================

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onEvacuation: boolean | null;
}
// Emergency Contacts==============================
const emergencyContacts = [
  { id: "1", name: "Emergency Services (911)", phoneNumber: "+16726736640" },
  { id: "2", name: "BC Workers", phoneNumber: "+16729998362" },
  { id: "3", name: "Fire Department", phoneNumber: "+16043633286" },
  { id: "4", name: "Site Manager", phoneNumber: "+16047206967" },
  { id: "5", name: "First Aid Team", phoneNumber: "+17789565141" },
];
// ===============================================

const SMSModal: React.FC<ModalProps> = ({ showModal, setShowModal, onEvacuation  }) => {
  const [checkedContacts, setCheckedContacts] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  // ===============================================
// Getting the construction Site Id from redux slice
const { isAuthenticated, status, user, token } = useSelector(
  (state: RootState) => state.auth
);
let siteId = "";
if (user) {
  siteId = user.constructionSiteId || "";
}

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
// =============================================
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

        const header = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };

      await axios.post(`${BACKEND_BASE_URL}/sms`, {
        contacts: contactsArray,
        // message: message,
        constructionSiteId: siteId,
      },header);
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
                  Emergency Alert Sent
                </Typography>
              </Heading>
            </VStack>
          </ModalHeader>

          <Box borderWidth={1} borderRadius="$2xl" m="$4" mt="$2">
            <ModalBody width="$full" m="$0">
              {/* CHECKLIST TITLE */}
              <Text textAlign="center" py="$3" borderBottomWidth={1}>
                <Typography bold>Select SMS Alert Contacts</Typography>
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
                        // $checked={checkedContacts.includes(contact.id)}
                        $checked={{ backgroundColor: checkedContacts.includes(contact.id) ? 'blue' : 'white' }}
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
                    <Typography bold>Send SMS Alerts</Typography>
                  </ButtonText>
                </CommonButton>

                {/* SKIP SMS  */}
                <ModalCloseButton
                    mt="$4"
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate("Dashboard", { alertSent: true, alertCanceled: false, onEvacuation});
                    }}
                  >
                  <Typography textDecorationLine="underline">
                    Skip sending SMS
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
        icon={<SucessIcon color={"#00AE8C"} size={60} focussed={false} />}
        title="SMS Alert Sent!"
        description="Your alert has been successfully sent."
        buttonText="Go to Dashboard"
        buttonAction={() => {
          navigation.navigate("Dashboard", { alertSent: false, alertCanceled: false, onEvacuation});
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
