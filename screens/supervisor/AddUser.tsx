import {
  AlertCircleIcon,
  Box,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import Typography from "../../components/common/typography";
import ScreenLayout from "../../components/layout/screenLayout";
import { InputField } from "@gluestack-ui/themed";
import CommonButton from "../../components/common/button";

const AddUser: React.FC = () => {
  return (
    <>
      <ScrollView>
        <ScreenLayout>
          <Box mb={"$5"}>
            <Typography bold size={"lg"}>
              Enter users information
            </Typography>
          </Box>

          <VStack space="lg">
            {/* USERNAME */}
            <FormControl size="lg" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>
                  <Typography bold>Username</Typography>
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  /* defaultValue="12345" */
                  placeholder="Worker name"
                />
              </Input>
              {/* <FormControlHelper>
                  <FormControlHelperText size="xs">
                    <Typography size={"$xs"}>This field is required</Typography>
                  </FormControlHelperText>
                </FormControlHelper> */}
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Enter a valid username.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* EMAIL */}
            <FormControl size="lg" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>
                  <Typography bold>Email</Typography>
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  /* defaultValue="12345" */
                  placeholder="Worker email "
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Enter a valid email.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* PHONE */}
            <FormControl size="lg" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>
                  <Typography bold>Phone</Typography>
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  /* defaultValue="12345" */
                  placeholder="Worker phone"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Enter a valid phone number.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* PASSWORD */}
            <FormControl size="lg" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>
                  <Typography bold>Password</Typography>
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  /* defaultValue="12345" */
                  placeholder="Enter new password"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Enter a valid password.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* BLOOD TYPE */}
            <FormControl size="lg" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>
                  <Typography bold>Blood Type</Typography>
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  /* defaultValue="12345" */
                  placeholder="Worker blood type"
                />
              </Input>
            </FormControl>

            {/* PREVIOUS INJURY */}
            <FormControl size="lg" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>
                  <Typography bold>Previous Injury</Typography>
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  /* defaultValue="12345" */
                  placeholder="Worker previous injury"
                />
              </Input>
            </FormControl>

            {/* BUTTON */}
            <FormControl mt={"$4"} mb={"$9"}>
              <CommonButton variant="rounded">
                <ButtonText>
                  <Typography bold>Create User</Typography>
                </ButtonText>
              </CommonButton>
            </FormControl>
          </VStack>
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

export default AddUser;
