import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { login } from "../../store/session";
import { NavBar, PageWrapper } from "../Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageRight = async () => {
    return await dispatch(login({ email, password }))
      .then(() => navigate("/home"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          // setErrors({ email: data.message });
          console.log({ errors: data.message });
        }
      });
  };

  const handleDemo = () => {
    dispatch(login({ email: "demo@user.io", password: "password" }))
      .then(() => navigate("/home"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          // setErrors({ credentials: data.message });
          console.log({ errors: data.message });
        }
      });
  };

  return (
    <PageWrapper
      onPageLeft={() => {
        navigate("/");
      }}
      onPageRight={handlePageRight}
    >
      <div className="page-container">
        <div className="page">
          <h1 className="signup-header">login</h1>
          <div className="auth-inputs">
            <input
              className="auth-input"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              className="auth-input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>
      <NavBar
        left={
          <Link
            className="auth-link"
            to="/"
            onClick={() => {
              localStorage.setItem("lpIndex", "1");
            }}
          >
            sign up
          </Link>
        }
        right={<button onClick={handleDemo}>demo user</button>}
      />
    </PageWrapper>
  );
}

export default Login;
