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
  Box,
} from "@gluestack-ui/themed";
import Typography from "./typography";
import { Feather } from "@expo/vector-icons";

const Dropdown = () => {
  return (
    <Box>
      <Typography bold>Site</Typography>
      <Select isRequired>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select option" />
          <Box>
            <Typography>
              <Feather name="chevron-down" size={24} color="$neutral" />
            </Typography>
          </Box>
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
