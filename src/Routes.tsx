import React from "react";
import { Routes as Router, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./ProtectedRoutes";


import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import NotFoundLayout from "./layouts/NotFoundLayout";

type Props = {};


const Routes = (props: Props) => {
  return (
    <Router>
      <Route path='*' element={<NotFoundLayout />} />
      <Route path="/"  element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<AuthLayout />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<MainLayout />} />
      </Route>
    </Router>
  );
};

export default Routes;
