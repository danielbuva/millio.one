import { BrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import { restoreUser } from "../../store/session";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function ClientWrapper({ children }) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasVisited");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const dispatch = useDispatch();
  dispatch(restoreUser(false));
  return (
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  );
}

export default ClientWrapper;
