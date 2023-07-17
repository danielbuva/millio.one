import useIsValidated from "../../hooks/useIsValidated";

import { Outlet } from "react-router-dom";
import React from "react";
import UserMenu from "../icons/UserMenu";

const ProtectedRoutes = () => {
  if (useIsValidated()) return null;
  return (
    <>
      <UserMenu />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
