import React from "react";
import { Route, Routes } from "react-router-dom";

import Datasets from "./Datasets/Datasets";
import Requests from "./Datasets/Requests";
import Tensors from "./Datasets/Tensors";
import Homepage from "./Homepage";
import Infrastructure from "./Infrastructure/Infrastructure";
import Nodes from "./Infrastructure/Nodes";
import Workers from "./Infrastructure/Workers";
import Associations from "./Settings/Associations";
import Branding from "./Settings/Branding";
import Monetization from "./Settings/Monetization";
import Settings from "./Settings/Settings";
import InfraSettings from "./Settings/Infrastructure";
import Users from "./Users/Users";
import Groups from "./Users/Groups";
import Roles from "./Users/Roles";
import Models from "./Models";
import Finances from "./Finances";
import NoMatch from "./NoMatch";

const ApplicationRoutes = () => (
  <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="datasets" element={<Datasets/>}>
      <Route path="requests" element={<Requests/>} />
      <Route path="tensors" element={<Tensors/>} />
    </Route>
    <Route path="infrastructure" element={<Infrastructure/>}>
      <Route path="nodes" element={<Nodes/>} />
      <Route path="workers" element={<Workers/>} />
    </Route>
    <Route path="settings" element={<Settings/>}>
      <Route path="associations" element={<Associations/>} />
      <Route path="branding" element={<Branding/>} />
      <Route path="infrastructure" element={<InfraSettings/>} />
      <Route path="monetization" element={<Monetization/>} />
    </Route>
    <Route path="users" element={<Users/>}>
      <Route path="groups" element={<Groups/>} />
      <Route path="roles" element={<Roles/>} />
    </Route>
    <Route path="models" element={<Models/>} />
    <Route path="finances" element={<Finances/>} />
    <Route path="*" element={<NoMatch/>} />
  </Routes>
);

export default ApplicationRoutes;
