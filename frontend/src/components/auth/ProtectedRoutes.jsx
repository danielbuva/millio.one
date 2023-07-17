import useIsValidated from "../../hooks/useIsValidated";

import { Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoutes = () => {
  const notValid = useIsValidated();

  if (notValid) return null;
  return <Outlet />;
};

export default ProtectedRoutes;
