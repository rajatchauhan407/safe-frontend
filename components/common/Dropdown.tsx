import React from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectIcon,
  Icon,
  Box,
  Text,
} from "@gluestack-ui/themed";

const Dropdown = () => {
  return (
    <Box>
      <Text fontWeight="$bold">Site</Text>
      <Select isRequired>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select option" />
          {/* <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon> */}
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem label="Banmode" value="banmode" />
            <SelectItem label="Marcopolo" value="marcopolo" />
            <SelectItem label="49 Avenue" value="49 avenue" />
            <SelectItem label="Riverside" value="riverside" isDisabled={true} />
          </SelectContent>
        </SelectPortal>
      </Select>
    </Box>
  );
};

export default Dropdown;
