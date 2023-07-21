import { logout, toggleMute } from "../../store/session";
import useSessionUser from "../../hooks/useSessionUser";
import { PageWrapper } from "../ClientWrapper/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useNavigateBack from "../../hooks/useNavigateBack";

function You() {
  const user = useSessionUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleMute = () => {
    dispatch(toggleMute());
  };

  const navigateBack = useNavigateBack();

  return (
    <PageWrapper onPageLeft={navigateBack} onPageRight={navigateBack}>
      <h1>you.</h1>
      <div>
        <p className="auth-link pointer" onClick={handleLogout}>
          logout
        </p>
        <p className="auth-link pointer" onClick={handleMute}>
          {user.mute ? "unmute" : "mute"}
        </p>
        <Link className="auth-link" to="/about">
          about
        </Link>
      </div>
    </PageWrapper>
  );
}

export default You;
