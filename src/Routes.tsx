import React from "react";
import {Routes as Router, Route} from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

type Props = {};

const Routes = (props: Props) => {
  return (
    <Router>
      <Route path="/login" element={<AuthLayout />} />
      <Route path="/dashboard" element={<MainLayout />} />
    </Router>
  )
}

export default Routes;