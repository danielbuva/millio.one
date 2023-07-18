import { PageWrapper } from "./ClientWrapper/Layout";

import useSessionUser from "../hooks/useSessionUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/session";

import YesNo from "./icons/YesNo";

function ConfirmLogout() {
  const user = useSessionUser();
  const dispatch = useDispatch();
  const navigtion = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  const goHome = () => {
    navigtion("/home");
  };

  return (
    <PageWrapper onPageLeft={goHome} onPageRight={goHome}>
      <h1 style={{ marginBottom: "300px" }}>signed in as {user.name}.</h1>
      <div className="center">
        <YesNo
          onNo={handleLogout}
          no="logout"
          onYes={goHome}
          yes="go home"
        />
      </div>
    </PageWrapper>
  );
}

export default ConfirmLogout;
