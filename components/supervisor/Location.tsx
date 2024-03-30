import React from "react";
import { HStack } from "@gluestack-ui/themed";
import LocationIcon from "../../assets/icons/location";
import Typography from "../common/typography";

interface LocationProps {
  siteLocation: string;
}

const LocationComponent: React.FC<LocationProps> = ({ siteLocation }) => {
  return (
    <HStack mt="$2" mb="$3" alignItems="center" pl={"$3"}>
      <LocationIcon size={13} color={""} focussed={false} />
      <Typography size="md" pl={5}>
        {siteLocation}
      </Typography>
    </HStack>
  );
};

export default LocationComponent;
