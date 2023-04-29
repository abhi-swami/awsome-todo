import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,

} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import url from "../url";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const obj = { email: "", password: "" };

export default function Login() {
  const [data, setData] = useState(obj);
  const toast = useToast();
  const navigate=useNavigate();
  const {login}=useContext(AuthContext)


  const handleChange = (e) => {
    const { type, value } = e.target;
    setData({ ...data, [type]: value });
  };
  const handleClick = async () => {
    try {
      const response = await axios.post(`${url}/login`, { ...data });
      localStorage.setItem("token",response.data.token)
      login();
      if(response.data.token){
        toast({
          title: 'Logged in Successfully.',
          description: `Dear user now you can create your todos`,
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        navigate("/todo")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={data.email} onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={data.password}
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleClick}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
