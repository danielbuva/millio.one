import { BrowserRouter } from "react-router-dom";

import Layout from "../Layout";

import useIsValidated from "../../hooks/useIsValidated";

function ClientWrapper({ children }) {
  const isLoaded = useIsValidated();
  if (!isLoaded) return false;
  return (
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  );
}

export default ClientWrapper;
