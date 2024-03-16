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
              <Feather name="chevron-down" size={24} color="#1E1E1E" />
            </Typography>
          </Box>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem
              label="Cascade Heights Development"
              value="CascadeHeightsDevelopment"
            />
            <SelectItem
              label="Pacific Harbor Construction Zone"
              value="PacificHarborConstructionZone"
            />
            <SelectItem
              label="Mountview Estates Project Area"
              value="MountviewEstatesProjectArea"
            />
            <SelectItem
              label="Emerald City Building Site"
              value="EmeraldCityBuildingSite"
              isDisabled={true}
            />
            <SelectItem
              label="Langara College 49th Ave"
              value="LangaraCollege49thAve"
            />
          </SelectContent>
        </SelectPortal>
      </Select>
    </Box>
  );
};

export default Dropdown;
