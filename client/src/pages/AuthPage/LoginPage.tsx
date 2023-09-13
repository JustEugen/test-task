import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { AuthService } from "../../api/auth/auth.service";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});

export const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const loginForm = useFormik({
    initialValues: { name: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const { data } = await AuthService.login({ name: values.name, password: values.password });

        localStorage.setItem("token", data);

        navigate("/");
      } catch (e) {
        toast({
          title: (e as Error).message,
          status: "error",
        });
        console.log(e);
      }

      setLoading(false);
    },
  });

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "lg" }}
          borderRadius="xl"
          borderTopRadius={0}
          style={{ marginTop: 0 }}
          _dark={{ backgroundColor: "gray.700" }}
        >
          <Stack spacing="6">
            <Heading
              size={{ base: "xs", md: "lg" }}
              fontWeight="medium"
              textAlign="center"
              _light={{ color: "blackAlpha.700" }}
            >
              Log In
            </Heading>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginForm.handleSubmit();
              }}
            >
              <Stack spacing="5">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" onChange={loginForm.handleChange} value={loginForm.values.name} />
                  <FormErrorMessage>{loginForm.errors["name"]}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                  />
                  <FormErrorMessage>{loginForm.errors["password"]}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack mt={1} mb={2}>
                <Text>
                  Don't have an account,{" "}
                  <ChakraLink as={ReactRouterLink} to={"/auth/register"}>
                    create one
                  </ChakraLink>
                  ?
                </Text>
              </Stack>
              <Stack spacing="6">
                <Button type="submit" mt={2} colorScheme="blue" isLoading={loading}>
                  Sign In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
