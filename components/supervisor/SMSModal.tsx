// Component Imports===============================================
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
// Connection to backend Imports===============================================
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config/api'
// =================================================================
// HardCoded Emergency Contacts
const emergencyContacts = [
  { id: '1', name: '911', phoneNumber: '+16726736640' },
  { id: '2', name: 'BC Workers', phoneNumber: '+16729998362' },
  { id: '3', name: 'FireFighter', phoneNumber: '+16043633286' },
  { id: '4', name: 'Manager', phoneNumber: '+16047206967' },
];
const CustomCheckbox = ({ checked }: { checked: boolean }) => (
  <View style={[styles.checkbox, checked && { backgroundColor: "#FD9201" }]} />
);

const SMSModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [checkedContacts, setCheckedContacts] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState('');
// =============================================
// Emergency Contact Toggle Function:
const toggleContact = (contactId: string) => {
  const isChecked = checkedContacts.includes(contactId);
  if (isChecked) {
    setCheckedContacts(checkedContacts.filter(id => id !== contactId));
  } else {
    setCheckedContacts([...checkedContacts, contactId]);
  }
};
// Send SMS to Backend Function
const sendSMS = async () => {
  try {
    const contactsArray = checkedContacts.map(contactId => {
      const selectedContact = emergencyContacts.find(contact => contact.id === contactId);
      if (selectedContact) {
        return { phoneNumber: selectedContact.phoneNumber };
      }
      return null;
    }).filter(Boolean);
    await axios.post(
      `${BACKEND_BASE_URL}/sms`, 
      {
        contacts: contactsArray,
        message: 'This is an Emergency Alert From SAFE App',
      }
    );
    console.log('SMS sent successfully');
    console.log('Checked Contacts:', checkedContacts);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};



// =============================================
// Renderin the Component:======================
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backgroundContainer}>
        <View style={styles.modalContainer}>
          {/* Centered small image on top */}
          {/* <Image source={require("./Image.png")} style={styles.image} /> */}

          <Text style={styles.boldText}>
            Your emergency whistle has been triggered.
          </Text>

          {/* Checklist title */}
          <Text style={styles.checklistTitle}>Choose SMS alert contacts</Text>

          {/* Checklist options */}
          {emergencyContacts.map(contact => (
          <View key={contact.id} style={styles.checklistContainer} >
            <TouchableOpacity
              style={styles.checklistItem}
              onPress={() => toggleContact(contact.id)}
            >
              <Text style={styles.checklistText}>{contact.name}</Text>
              <CustomCheckbox
                  checked={checkedContacts.includes(contact.id)} />
            </TouchableOpacity>
          </View>
          ))}

          {/* Button "Send" */}
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendSMS}
            >
             <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>

          {/* "Skip SMS Messages" */}
          <TouchableOpacity onPress={onClose} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip SMS Messages</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "rgba(30, 30, 30, 0.96)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#F8F8FF",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  checklistTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  checklistContainer: {
    marginBottom: 20,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  checklistText: {
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  sendButton: {
    backgroundColor: "#FD9201",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  skipButton: {
    alignSelf: "center",
  },
  skipButtonText: {
    textDecorationLine: "underline",
  },
});

export default SMSModal;
