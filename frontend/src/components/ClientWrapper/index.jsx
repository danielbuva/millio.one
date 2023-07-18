import { BrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import { restoreUser } from "../../store/session";
import { useDispatch } from "react-redux";

function ClientWrapper({ children }) {
  const dispatch = useDispatch();
  dispatch(restoreUser(false));
  return (
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  );
}

export default ClientWrapper;
