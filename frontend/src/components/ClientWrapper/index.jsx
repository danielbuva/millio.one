import { BrowserRouter } from "react-router-dom";

import { ColorProvider } from "../ColorProvider";
import { ModalProvider } from "../Modal";
import Layout from "../Layout";

function ClientWrapper({ children }) {
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
