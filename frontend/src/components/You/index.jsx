import { logout, toggleMute } from "../../store/session";
import useSessionUser from "../../hooks/useSessionUser";
import { PageWrapper } from "../ClientWrapper/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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

  const handlePageLeft = () => {
    window.getSelection().empty();
    if (!sessionStorage.getItem("hasVisited")) {
      sessionStorage.setItem("hasVisited", "true");
      navigate("/home");
    } else {
      navigate(-1);
    }
  };

  return (
    <PageWrapper onPageLeft={handlePageLeft} onPageRight={handlePageLeft}>
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
