import useIsValidated from "../../hooks/useIsValidated";

import { Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoutes = () => {
  if (useIsValidated()) return null;
  return <Outlet />;
};

export default ProtectedRoutes;
