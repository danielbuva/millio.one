import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../Layout";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePageRight = () => {
    navigate("/home");
  };

  const handlePageLeft = () => {
    navigate("/");
  };

  return (
    <PageWrapper onPageLeft={handlePageLeft} onPageRight={handlePageRight}>
      <div id="land-container">
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
