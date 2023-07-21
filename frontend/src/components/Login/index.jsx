import useSessionUser from "../../hooks/useSessionUser";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { login } from "../../store/session";

import { NavBar, PageWrapper } from "../ClientWrapper/Layout";
import ConfirmLogout from "../ConfirmLogout";
import DemoUser from "./DemoUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSessionUser();

  if (user) return <ConfirmLogout />;

  const handlePageRight = async () => {
    return await dispatch(login({ email, password }))
      .then(() => navigate("/home"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
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
            <p>{errors.message}</p>
          </div>
        </div>
      </div>
      <NavBar
        left={
          <Link className="auth-link" to="/about">
            about
          </Link>
        }
        middle={<DemoUser />}
        right={
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
      />
    </PageWrapper>
  );
}

export default Login;
