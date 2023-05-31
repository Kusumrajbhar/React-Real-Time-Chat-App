import React, { useState } from "react";
import * as Yup from "yup";
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

const inputStyle = {
  backgroundColor: "transparent",
  padding: "1rem",
  border: "0.1rem solid #4e0eff",
  fontSize: "1rem",
};

function Login() {
  const toast = useToast();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      alert("submitted");
      // if (errors?.password){
      //    console.log(errors.password, "toast")
      //    toast({
      //        title: 'Login',
      //        description: "We've created your account for you.",
      //        status: 'success',
      //        duration: 9000,
      //        isClosable: true,
      //      })
      // }
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
            <Box mt={4} style={{ display: "flex" }}></Box>
          </Form>
        </Flex>
      </FormikProvider>
    </Box>
  );
}

export default Login;
