import { useNavigate } from "react-router-dom";
import { logout, toggleMute } from "../../store/session";
import { PageWrapper } from "../ClientWrapper/Layout";
import { useDispatch, useSelector } from "react-redux";

function Yes() {
  const mute = useSelector((s) => s.session.preferences.mute);
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
          {mute ? "unmute" : "mute"}
        </p>
      </div>
    </PageWrapper>
  );
}

export default Yes;
