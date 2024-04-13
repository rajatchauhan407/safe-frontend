import React, { useState } from "react";
import {
  ButtonText,
  Center,
  CloseIcon,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import Typography from "./typography";
import CommonButton from "./button";
import SOSIcon from "../../assets/icons/sos";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const CancelAlertModal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [alertSent, setAlertSent] = useState(false);

  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent borderRadius={"$3xl"}>
          <ModalHeader justifyContent="center">
            <VStack>
              {/*  CLOSE ICON */}
              <ModalCloseButton alignItems="flex-end">
                <Icon as={CloseIcon} />
              </ModalCloseButton>
              {/*  MAIN ICON  */}
              <Center>
                <SOSIcon size={60} color="#D0080F" focussed={true} />
              </Center>
              {/*  TITLE */}
              <Heading mt={"$4"} textAlign="center">
                <Typography bold size={"xl"}>
                  Are you sure you want to cancel this alert?
                </Typography>
              </Heading>
            </VStack>
          </ModalHeader>

          <ModalBody mt={"$4"} mb={"$0"}>
            <Text textAlign="center">
              <Typography>
                You wont be able to access to the alert information again.
              </Typography>
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <CommonButton
              variant="underline"
              onPress={() => {
                setShowModal(false);
                setTimeout(() => {
                  setAlertSent(true);
                  navigation.navigate("Dashboard", { alertSent: true });
                }, 1000);
              }}
            >
              <ButtonText>
                <Typography bold size={"lg"}>
                  Yes, I want to cancel
                </Typography>
              </ButtonText>
            </CommonButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default CancelAlertModal;
