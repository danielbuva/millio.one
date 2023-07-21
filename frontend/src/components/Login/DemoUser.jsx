import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useNavigate } from "react-router-dom";

function DemoUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDemo = () => {
    dispatch(login({ email: "demo@user.io", password: "password" }))
      .then(() => navigate("/home"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          console.error(data);
        }
      });
  };

  return (
    <button onClick={handleDemo} className="demo-button">
      demo user
    </button>
  );
}

export default DemoUser;
