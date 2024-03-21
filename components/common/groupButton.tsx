import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, ButtonText } from "@gluestack-ui/themed";
import Typography from "./typography";

type Action = "One Whistle" | "Evacuation";

interface ButtonProps {
  action: Action;
  onSelect: (action: Action) => void; // Callback function to handle button selection
}

const GroupButton: React.FC<ButtonProps> = ({ onSelect }) => {
  const buttons: ButtonProps[] = [
    { label: "Worker Injured", action: "One Whistle" },
    { label: "Evacuation", action: "Evacuation" },
  ];

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Set the initial selected button based on the type prop
    if (buttons.some((button) => button.action === "One Whistle")) {
      onSelect("One Whistle");
      setSelectedButtonIndex(
        buttons.findIndex((button) => button.action === "One Whistle")
      );
    }
  }, []);

  const handlePress = (index: number, action: Action) => {
    setSelectedButtonIndex(index);
    onSelect(action);
  };

  return (
    <Box>
      <ButtonGroup isAttached w={"$full"}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant="solid"
            size="xl"
            flex={1}
            bgColor={
              selectedButtonIndex === index
                ? button.action === "One Whistle"
                  ? "$highlight"
                  : "$alert"
                : "#eaeaea"
            }
            onPress={() => handlePress(index, button.action)}
            borderTopLeftRadius={index === 0 ? "$full" : undefined}
            borderBottomLeftRadius={index === 0 ? "$full" : undefined}
            borderTopRightRadius={
              index === buttons.length - 1 ? "$full" : undefined
            }
            borderBottomRightRadius={
              index === buttons.length - 1 ? "$full" : undefined
            }
            borderRightWidth={index === buttons.length - 1 ? "$0" : undefined}
          >
            <ButtonText>
              <Typography bold>{button.label}</Typography>
            </ButtonText>
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default GroupButton;
