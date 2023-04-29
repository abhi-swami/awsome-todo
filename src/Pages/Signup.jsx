import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import url from "../url";
import{useNavigate} from "react-router-dom"


const obj={
  email:"",
  password:"",
  location:"",
  age:""
}
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData]=useState(obj);
  const toast = useToast()
  const navigate=useNavigate()




  const handleChange=(e)=>{
    const {name,value}=e.target;
    const val=name==="age"?Number(value):value;
    setData({...data,[name]:val});
  }
  const handleClick = async () => {
    try {
      const res = await axios.post(`${url}/registration`, { ...data });
      if(res.data.mesg===`user registered successfully`){
        toast({
          title: 'Account created.',
          description: "User registered Successfully",
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        navigate("/login")
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
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
              <Input type="email" name="email" value={data.email} onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} name="password" value={data.password} onChange={handleChange} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            
              <FormLabel>Location</FormLabel>
              <Input type="text" name="location" value={data.location} onChange={handleChange}/>


            <FormControl id="number">
              <FormLabel>Age</FormLabel>
              <Input type="number" name="age"   value={data.age} onChange={handleChange}/>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleClick}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
