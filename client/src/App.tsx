import * as React from "react";
import { ChakraProvider, Container, Grid, GridItem, HStack, Tooltip, IconButton } from "@chakra-ui/react";
// import { CategoryMenu, Header } from "./components";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import { StoresListPage, PlatformsListPage, GamesListPage, GamePage, LoginPage } from "./pages";
import { GrLogout } from "react-icons/all";
import { LoginPage } from "./pages/AuthPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { useEffect, useState } from "react";
import { AuthService } from "./api/auth/auth.service";

export const App = () => {
  const navigate = useNavigate();

  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: "top-right", isClosable: true } }}>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </ChakraProvider>
  );
};
