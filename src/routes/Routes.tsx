import React from "react";
import { Routes as Router, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./ProtectedRoutes";

import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import NotFoundLayout from "../layouts/NotFoundLayout";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Auth />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFoundLayout />} />
    </Router>
  );
};

export default Routes;
