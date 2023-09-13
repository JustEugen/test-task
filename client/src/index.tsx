import './global.css';
import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios, { AxiosError, AxiosHeaders } from "axios";

axios.interceptors.request.use(
  (config) => {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error?.response?.status === 401) {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

const container = document.getElementById("root");

if (!container) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

root.render(
  <>
    <ColorModeScript />
    <RouterProvider router={router} />
  </>
);
