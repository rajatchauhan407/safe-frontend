import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const CustomCheckbox = ({ checked }: { checked: boolean }) => (
  <View style={[styles.checkbox, checked && { backgroundColor: "#FD9201" }]} />
);

const SMSModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [isChecked1, setIsChecked1] = React.useState(false);
  const [isChecked2, setIsChecked2] = React.useState(false);
  const [isChecked3, setIsChecked3] = React.useState(false);
  const [isChecked4, setIsChecked4] = React.useState(false);

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
          <View style={styles.checklistContainer}>
            <TouchableOpacity
              style={styles.checklistItem}
              onPress={() => setIsChecked1(!isChecked1)}
            >
              <Text style={styles.checklistText}>First Aid Option 1</Text>
              <CustomCheckbox checked={isChecked1} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checklistItem}
              onPress={() => setIsChecked2(!isChecked2)}
            >
              <Text style={styles.checklistText}>First Aid Option 2</Text>
              <CustomCheckbox checked={isChecked2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checklistItem}
              onPress={() => setIsChecked3(!isChecked3)}
            >
              <Text style={styles.checklistText}>First Aid Option 3</Text>
              <CustomCheckbox checked={isChecked3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checklistItem}
              onPress={() => setIsChecked4(!isChecked4)}
            >
              <Text style={styles.checklistText}>First Aid Option 4</Text>
              <CustomCheckbox checked={isChecked4} />
            </TouchableOpacity>
          </View>

          {/* Button "Send" */}
          <TouchableOpacity style={styles.sendButton}>
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
