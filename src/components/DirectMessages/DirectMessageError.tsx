import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import LightningIcon from "../icons/LightningIcon";

interface Props {}

const DirectMessageError = (props: Props) => {
  return (
    <Flex w="full" p={50} alignItems="center" justifyContent="center">
      <Flex
        maxW="sm"
        w="full"
        mx="auto"
        shadow="md"
        rounded="lg"
        overflow="hidden"
      >
        <Flex justifyContent="center" alignItems="center" w={12} bg="red.500">
          <LightningIcon />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <Text color="red.400" fontWeight="bold">
              Error
            </Text>
            <Text color="gray.500" fontSize="sm">
              You cannot chat with yourself!
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DirectMessageError;
