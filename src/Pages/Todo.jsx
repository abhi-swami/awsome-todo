import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../url";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import Card from "../Componets/CardComponent";

const obj = { subject: "", title: "" };

const Todo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(obj);
  const [token, setToken] = useState("");
  const [todo, setTodo] = useState([]);
  const toast = useToast();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClick = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${url}/todo`,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: { ...data },
      });
      if (res.data) {
        getTodo();
        onClose()
      } else {
        toast({
          title: `${res.data}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTodo = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${url}/todo`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setTodo([...res.data.notes]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      getTodo();
    }
  }, [token]);

  const handleToggle = async (id, stat) => {

    try {
      await axios({
        method: "patch",
        url: `${url}/todo/${id}`,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: { status: stat },
      });
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${url}/todo/${id}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      getTodo();
      if (res.data.mesg === `deleted successfully`) {
        getTodo();
        toast({
          title: "Deleted Successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: `${res.data.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "url(https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Button
        onClick={onOpen}
        bgColor={"green.400"}
        color={"white"}
        _hover={{
          bg: "green.500",
        }}
        m={8}
      >
        Add A new Todo
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Stack>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Create A new Todo</Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    to enjoy all of our cool{" "}
                    <span color={"blue.400"}>features</span> ✌️
                  </Text>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <FormControl id="Subject">
                      <FormLabel>Subject</FormLabel>
                      <Input
                        type="text"
                        name="subject"
                        value={data.subject}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="Title">
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      ></Stack>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={handleClick}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SimpleGrid columns={3} spacing={3} w={"95%"} margin={"auto"}>
        {todo.map((el) => (
          <Card
            key={el._id}
            data={el}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Todo;
