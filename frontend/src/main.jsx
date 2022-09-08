import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import App from "./App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AgentView from "./pages/AgentView";
import SupervisorView from "./pages/SupervisorView";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* Customer Auth */}
        <Route
          path="customer-signup"
          element={
            <Signup
              headerText={"Customer Signup"}
              redirectURLPrefix={"customer"}
            />
          }
        />
        <Route
          path="customer-login"
          element={
            <Login
              headerText={"Customer Login"}
              redirectURLPrefix={"customer"}
            />
          }
        />

        {/* Agent Auth */}
        <Route
          path="agent-login"
          element={
            <Login headerText={"Agent Login"} redirectURLPrefix={"agent"} />
          }
        />

        {/* Supervisor Auth */}
        <Route
          path="supervisor-login"
          element={
            <Login
              headerText={"Supervisor Login"}
              redirectURLPrefix={"supervisor"}
            />
          }
        />
        <Route path="/agent" element={<AgentView />} />
        <Route path="/supervisor" element={<SupervisorView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
