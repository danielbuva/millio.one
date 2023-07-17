import { BrowserRouter } from "react-router-dom";

import Layout from "./Layout";

function ClientWrapper({ children }) {
  return (
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  );
}

export default ClientWrapper;
