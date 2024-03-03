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
} from "@gluestack-ui/themed";

const Dropdown = () => {
  return (
    <Select>
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
          <SelectItem label="site 1" value="site 1" />
          <SelectItem label="site 2" value="site 2" />
          <SelectItem label="site 3" value="site 3" />
          <SelectItem label="site 4" value="site 4" isDisabled={true} />
          <SelectItem label="site 5" value="site 5" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default Dropdown;
