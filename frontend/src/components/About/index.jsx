import { useNavigate } from "react-router-dom";
import { NavBar, PageWrapper } from "../ClientWrapper/Layout";

function About() {
  const navigate = useNavigate();
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
      <h1>about.</h1>
      <div>
        <p>millio one.</p>
        <p>I made this in less than two weeks.</p>
        <p>
          this is a clone-ish of&nbsp;
          <a
            href="https://www.getstoic.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            stoic app
          </a>
        </p>
        <p>
          I saw the arrows on&nbsp;
          <a
            href="https://intracbr.com.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            intra
          </a>
          , but mine are cooler
        </p>
        <p>made this for fun, but also so I can pass my class</p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          enjoy &nbsp; <span style={{ fontSize: "25px" }}>☺</span>
        </p>
      </div>
      <NavBar
        left={
          <a
            className="auth-link"
            href="https://github.com/danielbuva/millio.one"
            target="_blank"
            rel="noopener noreferrer"
          >
            code
          </a>
        }
        middle={
          <a
            className="auth-link"
            href="https://github.com/danielbuva"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        }
        right={
          <a
            className="auth-link"
            href="https://www.linkedin.com/in/daniel-valdecantos-14792a210/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
        }
      />
    </PageWrapper>
  );
}

export default About;
