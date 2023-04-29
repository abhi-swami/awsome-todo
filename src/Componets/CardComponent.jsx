import {
  Stack,
  Flex,
  Button,
  Text,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";

export default function Card({ data, handleToggle, handleDelete }) {
  const { _id, subject, title, created_on, status } = data;

  return (
    <Box
      px={useBreakpointValue({ base: 4, md: 8 })}
      py={useBreakpointValue({ base: 4, md: 8 })}
      bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
    >
      <Stack align={"flex-start"} spacing={1}>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          gap={17}
        >
          <Text
            as={"span"}
            color={"white"}
            fontWeight={400}
            lineHeight={1.2}
            fontSize={"30px"}
          >
            {subject}
          </Text>
          <Text
            as={"span"}
            color={"white"}
            fontWeight={400}
            lineHeight={1.2}
            fontSize={"md"}
          >
            {created_on}
          </Text>
        </Flex>
        <Text
          color={"white"}
          fontWeight={700}
          fontSize={"lg"}
          textDecor={status === false ? "none" : "line-through"}
        >
          {title}
        </Text>
        <Stack direction={"row"}>
          <Button
            bgColor={status === false ? "blue.400" : "green.400"}
            rounded={"full"}
            color={"white"}
            _hover={status === false ? { bg: "blue.500" } : { bg: "green.500" }}
            onClick={() => handleToggle(_id, !status)}
          >
            {status === false ? `Not Done` : `Done`}
          </Button>

          <Button
            bg={"red.400"}
            rounded={"full"}
            color={"white"}
            _hover={{ bg: "red.500" }}
            onClick={() => handleDelete(_id)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
