import { NavBar, PageWrapper } from "../ClientWrapper/Layout";
import useNavigateBack from "../../hooks/useNavigateBack";

function About() {
  const navigateBack = useNavigateBack();

  return (
    <PageWrapper onPageLeft={navigateBack} onPageRight={navigateBack}>
      <h1>about.</h1>
      <p>millio one.</p>
      <div className="divider" />
      <div>
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
