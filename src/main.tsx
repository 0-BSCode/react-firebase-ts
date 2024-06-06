import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import backend from "@server/index.ts";
// CSS Reset
import { CssBaseline } from "@mui/material";
// Sample font. Can be replaced with others
import "@fontsource/roboto";

backend.ok();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <App />
    </CssBaseline>
  </React.StrictMode>
);
