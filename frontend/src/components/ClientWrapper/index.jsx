import { BrowserRouter } from "react-router-dom";
import { ColorProvider } from "../ColorProvider";
import { ModalProvider } from "../Modal";
import Layout from "../Layout";
import { useState } from "react";

function ClientWrapper({ childrem }) {
  const [pageRightFunction, setPageRightFunction] = useState(null);
  const [pageLeftFunction, setPageLeftFunction] = useState(null);
  return (
    <BrowserRouter>
      <ColorProvider>
        <ModalProvider>
          <Layout
            pageRightFunction={pageRightFunction}
            setPageRightFunction={setPageRightFunction}
            pageLeftFunction={pageLeftFunction}
            setPageLeftFunction={setPageLeftFunction}
          >
            {childrem}
          </Layout>
        </ModalProvider>
      </ColorProvider>
    </BrowserRouter>
  );
}

export default ClientWrapper;
