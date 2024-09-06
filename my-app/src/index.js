import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router";
import {ThemeProvider,createTheme} from "@mui/material";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  palette: {
    primary: {
      main: '#33186B',
      hover: '#2C4E80',
    },
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={Router} />
    </React.StrictMode>
  </ThemeProvider>
);

reportWebVitals();
