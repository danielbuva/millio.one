import { BrowserRouter } from "react-router-dom";

import { ColorProvider } from "../ColorProvider";
import { ModalProvider } from "../Modal";
import Layout from "../Layout";

import useIsValidated from "../../hooks/useIsValidated";

function ClientWrapper({ children }) {
  const isLoaded = useIsValidated();
  if (!isLoaded) return false;
  return (
    <BrowserRouter>
      <ColorProvider>
        <ModalProvider>
          <Layout>{children}</Layout>
        </ModalProvider>
      </ColorProvider>
    </BrowserRouter>
  );
}

export default ClientWrapper;
