import { logout, toggleMute } from "../../store/session";
import useSessionUser from "../../hooks/useSessionUser";
import { PageWrapper } from "../ClientWrapper/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Yes() {
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

  return (
    <PageWrapper onPageLeft={() => navigate(-1)} disabledRight={true}>
      <h1>you.</h1>
      <div>
        <p className="dark pointer" onClick={handleLogout}>
          logout
        </p>
        <p className="dark pointer no-select" onClick={handleMute}>
          {user.mute ? "unmute" : "mute"}
        </p>
      </div>
    </PageWrapper>
  );
}

export default Yes;
