import React, { useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";
import registerLogo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../utils/APIRoutes";

const inputStyle = {
  backgroundColor: "transparent",
  padding: "1rem",
  border: "0.1rem solid #4e0eff",
  fontSize: "1rem",
};

function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  const [userData, setUserData] = useState();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  // const setUser = useCallback(() => {
  // setUserData(localStorage.getItem('chat-app'))
  // }, [userData]);

  useEffect(() => {
  // setUserData(localStorage.getItem('chat-app'))
   if(localStorage.getItem('chat-app')){
    navigate('/')
   }
   }
  ,[]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  //  validationSchema: LoginSchema,
    onSubmit: () => {
      const userData = {email: values?.email, password: values?.password}
      axios.post(`${loginUrl}`, userData)
      .then((res) => {
        console.log('res in login', res)
        if(res?.data?.status == 400){
          toast({
            title: res?.data?.msg,
            position: 'top-right',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        } else {
          if(res?.data?.status == 200){
              toast({
              title: res?.data?.msg,
              position: 'top-right',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          localStorage.setItem('chat-app', JSON.stringify(res?.data?.data))
          // setUser(); 
          // if(userData?.email){
          //   navigate('/')
          // }
        } 
        }
      })
      .catch((err) => {
      console.log('err', err)
      })
      
    },
  });
  console.log("formik", formik);

  const { getFieldProps, values, errors } = formik;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      backgroundColor="#131324"
    >
      <FormikProvider value={formik}>
        <Flex color="#ffffff" bgColor="#00000076" p="3rem 5rem" w="400px">
          <Form style={{ width: "400px" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box as="img" src={registerLogo} h="5rem" alt="registerLogo" />
              <Heading>Login</Heading>
            </Box>
            <FormControl isRequired>
              <FormLabel mt={8}>Email</FormLabel>
              <Input
                placeholder="email"
                name="email"
                type="email"
                size="lg"
                sx={inputStyle}
                {...getFieldProps("email")}
              />
              {errors?.email && (
                <Box as="span" color="red">
                  Email is Required
                </Box>
              )}
              <FormLabel mt={8}>Password</FormLabel>
              <Input
                placeholder="password"
                name="password"
                type="password"
                size="lg"
                sx={inputStyle}
                {...getFieldProps("password")}
              />
              {errors?.password && (
                <Box as="span" color="red">
                  Password is Required
                </Box>
              )}
            </FormControl>

            <Button size="lg" color="#000000" mt={8} type="submit">
              Submit
            </Button>
            <Box mt={4} style={{ display: "flex" }}>
              <Text mr={4}>Not Registered?</Text>
              <Text
                color="#4e0eff"
                cursor="pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </Text>
            </Box>
          </Form>
        </Flex>
      </FormikProvider>
    </Box>
  );
}

export default Login;
