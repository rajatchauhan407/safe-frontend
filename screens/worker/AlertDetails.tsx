import { HStack,Box,Text } from "@gluestack-ui/themed";
import {useToken} from "@gluestack-style/react";
import React from "react";
import { useFonts } from "expo-font";
import {NunitoSans_400Regular} from "@expo-google-fonts/nunito-sans";
const AlertDetails:React.FC = () => {
    const [fontsLoaded] = useFonts({
        NunitoSans_400Regular,
    });
    console.log(fontsLoaded)
    return (
        <HStack padding={22} >
            <Box bgColor="$success" w="$full" >
                <Text>Reported By</Text>
                <Text bold={true} italic={true} fontFamily="Nunito Sans">Worker Name</Text>
            </Box>
        </HStack>
    )
}

export default AlertDetails;