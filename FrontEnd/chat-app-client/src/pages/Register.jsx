import React, { useState } from "react";
import * as Yup from "yup";
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";
import registerLogo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../utils/baseUrl";

const inputStyle = {
  backgroundColor: "transparent",
  padding: "1rem",
  border: "0.1rem solid #4e0eff",
  fontSize: "1rem",
};

function Register() {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  console.log('process.env.apiBase', process.env.REACT_APP_apiBase)
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  //  validationSchema: RegisterSchema,
    onSubmit:  async () => {
    const userData = {userName:values?.userName, email: values?.email }
    await axios.post(`${apiBaseUrl}/register`, userData)
    .then((res) => console.log('res', res))
    .catch((err) => console.log('err', err));
      alert("submitted");
      navigate("/");
    }
})

  const navigateHandler = () => {
    navigate("/login");
  };

  console.log("formik", formik);

  const { getFieldProps, touched, errors, values } = formik;

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
        <Flex
          justifyContent="center"
          alignItems="center"
          color="#ffffff"
          bgColor="#00000076"
          p="3rem 5rem"
        >
          <Form style={{ width: "400px" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box as="img" src={registerLogo} h="5rem" alt="registerLogo" />
              <Heading>Register</Heading>
            </Box>

            <FormControl>
              <FormLabel mt={4}>userName</FormLabel>
              <Input
                placeholder="username"
                name="userName"
                type="text"
                size="lg"
                sx={inputStyle}
                {...getFieldProps("userName")}
              />

              <FormLabel mt={8}>Email</FormLabel>
              <Input
                placeholder="email"
                name="email"
                type="email"
                size="lg"
                sx={inputStyle}
                isInvalid={Boolean(touched.email && errors.email)}
                {...getFieldProps("email")}
              />
              {errors.email && (
                <Box as="span" color="red">
                  Email is required
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
                  Password is required
                </Box>
              )}

              <FormLabel color="#ffffff" mt={8}>
                Confirm Password
              </FormLabel>
              <Input
                placeholder="confirm password"
                type="password"
                size="lg"
                sx={inputStyle}
                {...getFieldProps("confirmPassword")}
              />
              {errors?.confirmPassword && (
                <Box as="span" color="red">
                  {errors?.confirmPassword}
                </Box>
              )}
            </FormControl>

            <Button color="#000000" mt={8} type="submit" size="lg">
              Submit
            </Button>
            <Box mt={4} style={{ display: "flex" }}>
              <Text mr={4}>Alredy have an account?</Text>
              <Text color="#4e0eff" cursor="pointer" onClick={navigateHandler}>
                Login
              </Text>
            </Box>
          </Form>
        </Flex>
      </FormikProvider>
    </Box>
  );
}

export default Register;
