import React from 'react';
import { Card, Heading, Text, Box } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import Typography from '../common/typography';
import {useToken} from "@gluestack-style/react";

interface CommonCardProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const CommonCard: React.FC<CommonCardProps> = ({ title, content }) => {
  const offWhiteColor = useToken("colors", "offWhite");

  return (
    <Card size="md" variant="elevated" m={0} rounded={10} bg={offWhiteColor}>
      <Heading mb="$1" size="md">
        <Typography size="md">
          {title}
        </Typography>
      </Heading>
      <Box>{content}</Box>
    </Card>
  );
};

export default CommonCard;
