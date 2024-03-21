import React,{useEffect, useState} from "react";
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
import { BACKEND_BASE_URL } from "../../config/api";

interface Site {
  _id: string;
  name: string;
}

const Dropdown = () => {
  const [siteList, setSiteList] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<string | undefined>("7100 Gilbert Rd, Richmond");;

  useEffect(() => {
    console.log("in useeffect")
    const fetchData = async () => {
      try {
          const res = await fetch(`${BACKEND_BASE_URL}/sitelist`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        
        if (data) {
          setSiteList(data)
          console.log(data)        
        } 
      } 
      catch (error) {
        //Error while connecting with backend
        console.error('Error:', error);
      }
    };
    fetchData();
    
  }, []);

  return (
    <Box>
      <Typography bold>Site</Typography>
      <Select isRequired defaultValue={selectedSite}>
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
            {/* <SelectItem
              label="Langara College 49th Ave"
              value="LangaraCollege49thAve"
            />
            <SelectItem
              label="Cascade Heights Development"
              value="CascadeHeightsDevelopment"
            />
            <SelectItem
              label="Pacific Harbor Construction Zone"
              value="PacificHarborConstructionZone"
            />
            <SelectItem
              label="Emerald City Building Site"
              value="EmeraldCityBuildingSite"
              isDisabled={true}
            />
            <SelectItem
              label="Mountview Estates Project Area"
              value="MountviewEstatesProjectArea"
            /> */}
             {siteList.map((site) => (
              <SelectItem
                key={site._id}
                label={site.name}
                value={site._id}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </Box>
  );
};

export default Dropdown;
