import React from "react";
import { HStack } from "@gluestack-ui/themed";
import LocationIcon from "../../assets/icons/location";
import Typography from "../common/typography";

interface LocationProps {
  siteLocation: string;
}

const LocationComponent: React.FC<LocationProps> = ({ siteLocation }) => {
  // console.log(`LocationComponent: siteLocation: ${siteLocation}`);
  return (
    <HStack mt={10} mb={5} alignItems="center">
      <LocationIcon size={13} color={""} focussed={false} />
      <Typography size="md" pl={5}>
        {siteLocation}
      </Typography>
    </HStack>
  );
};

export default LocationComponent;
