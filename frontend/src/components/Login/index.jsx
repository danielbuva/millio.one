import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import useSessionUser from "../../hooks/useSessionUser";
import { login } from "../../store/session";
import { PageWrapper } from "../Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const currentUser = useSessionUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageRight = async () => {
    return await dispatch(login({ email, password }))
      .then(() => navigate("/home"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors({ email: data.message });
      });
  };

  const handlePageLeft = () => {
    navigate(-1);
  };

  // const handleDemo = async () => {
  //   await dispatch(login({ email: "demo@user.io", password: "password" }))
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.message) setErrors({ credentials: data.message });
  //     });
  // };

  console.log({ errors });
  console.log({ currentUser });
  return (
    <PageWrapper onPageLeft={handlePageLeft} onPageRight={handlePageRight}>
      <div id="land-container">
        <Link
          className="auth-link"
          to="/"
          onClick={() => {
            localStorage.setItem("lpIndex", "1");
          }}
        >
          sign up
        </Link>
        <div id="page">
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
    </PageWrapper>
  );
}

export default Login;
