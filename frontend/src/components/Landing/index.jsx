import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import useSessionUser from "../../hooks/useSessionUser";
import { signup } from "../../store/session";

import { NavBar, PageWrapper } from "../ClientWrapper/Layout";
import ConfirmLogout from "../ConfirmLogout";
import { csrfFetch } from "../../store/utils";
import DemoUser from "../Login/DemoUser";

import Eyeball from "./images/Eyeball.png";
import Pupil from "./images/Pupil.png";
import Iris from "./images/Iris.png";

import "./Landing.css";

const focusOptions = [
  "mood",
  "focus",
  "productivity",
  "sleep",
  "stress",
  "anxiety",
  "something else",
];

function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [hideRight, setHideRight] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSessionUser();
  const disabledRight = useRef(false);
  const eyeRef = useRef(null);
  const pupilRef = useRef(null);
  const irisRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (pupilRef.current) {
        const x = (e.clientX - 900) / 6;
        const y = (e.clientY - 320) / 6;
        pupilRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (irisRef.current) {
        const x = (e.clientX - 900) / 4.5;
        const y = (e.clientY - 320) / 4.5;
        irisRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    if (pageIndex === 0) {
      document.addEventListener("mousemove", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousemove", handleKeyDown);
    };
  }, [pageIndex]);

  useEffect(() => {
    let timeout;
    if (pageIndex === 0) {
      timeout = setTimeout(() => {
        setHideRight(false);
      }, 3000);
    } else if (timeout) {
      clearTimeout(timeout);
    }
    return () => timeout && clearTimeout(timeout);
  }, [pageIndex]);
  if (user) return <ConfirmLogout />;

  const page0 = (
    <div className="eye" ref={eyeRef}>
      <img alt="eye ball" className="eyeball" src={Eyeball} />
      <img alt="pupil" className="pupil" src={Pupil} ref={pupilRef} />
      <img alt="iris" className="iris" src={Iris} ref={irisRef} />
    </div>
  );

  const page1 = (
    <h1 id="land-text-1" key="millio">
      millio one.
      <br />
      <span>
        Build better habits and take care of your mental well-being
      </span>
    </h1>
  );

  const page2 = (
    <React.Fragment key="signup">
      <h1 className="signup-header">signup</h1>
      <div className="auth-inputs">
        <input
          className="auth-input"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            if (
              email.includes("@") &&
              email.includes(".") &&
              password.length > 6
            ) {
              disabledRight.current = false;
            } else {
              disabledRight.current = true;
            }
            setErrors((e) => ({ ...e, email: undefined }));
          }}
          onBlur={async () => {
            if (email.includes("@") && email.includes(".")) {
              const emailInUse = await (
                await csrfFetch(`/api/session/${email}`)
              ).json();
              if (emailInUse) {
                setErrors((e) => ({ ...e, email: emailInUse }));
              }
            } else {
              setErrors((e) => ({ ...e, email: "☺ invalid email" }));
            }
          }}
        />
        <input
          className="auth-input"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            if (
              email.includes("@") &&
              email.includes(".") &&
              password.length > 6
            ) {
              disabledRight.current = false;
            } else {
              disabledRight.current = true;
            }
            setErrors((e) => ({ ...e, password: undefined }));
          }}
          onBlur={() => {
            if (password.length < 6) {
              setErrors((e) => ({
                ...e,
                password: "☺ use at least 6 characters for password",
              }));
            }
          }}
        />
      </div>
      <p>{errors.email}</p>
      <p>{errors.password}</p>
    </React.Fragment>
  );

  const page3 = (
    <React.Fragment key="name">
      <h1 className="signup-header">what's your name?</h1>
      <input
        className="auth-input"
        placeholder="..."
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
          if (e.currentTarget.value.trim().length < 1) {
            disabledRight.current = true;
          } else {
            disabledRight.current = false;
          }
        }}
      />
    </React.Fragment>
  );

  const updateFocus = (e) => {
    setFocus((state) => {
      const focus = e.target.innerText;
      if (focus.length > 14) return state;
      if (state.includes(focus)) {
        if (state.length === 1) {
          disabledRight.current = true;
        }
        return state.filter((s) => s !== focus);
      }

      if (state.length < 1) {
        disabledRight.current = false;
      }
      return [...state, focus];
    });
  };

  const page4 = (
    <React.Fragment key="focus">
      <h1 className="signup-header">anything you'd like to focus on?</h1>
      <div id="focus-list" onClick={updateFocus}>
        {focusOptions.map((option) => (
          <p
            key={option}
            style={{
              color: focus.includes(option) ? "#d2d2d2" : "#707070",
            }}
          >
            {option}
          </p>
        ))}
      </div>
    </React.Fragment>
  );

  const pages = [page0, page1, page2, page3, page4];

  const handlePageRight = () => {
    switch (pageIndex) {
      case 1:
        if (!email || !password) {
          disabledRight.current = true;
        }
        break;
      case 2:
        if (!name) {
          disabledRight.current = true;
        }
        break;
      case 3:
        if (focus.length < 1) {
          disabledRight.current = true;
        }
        break;
      default:
        break;
    }

    if (pageIndex < pages.length - 1) {
      setPageIndex((previousPage) => {
        return previousPage + 1;
      });
    } else {
      dispatch(
        signup({
          email,
          name,
          password,
        })
      )
        .then(() => {
          navigate("/home");
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            console.error(data.errors);
          }
        });
    }
  };

  const handlePageLeft = () => {
    if (pageIndex > 0) {
      setPageIndex((previousPage) => {
        return previousPage - 1;
      });
    }
    disabledRight.current = false;
    setErrors({});
  };

  return (
    <PageWrapper
      onPageLeft={handlePageLeft}
      onPageRight={handlePageRight}
      disabledRight={
        (pageIndex === 2 && (errors.email || errors.password)) ||
        disabledRight.current
      }
      hideLeft={pageIndex === 0}
      hideRight={hideRight}
    >
      <div className="page-container" onClick={() => setHideRight(false)}>
        <div className={pageIndex === 0 ? "" : "page"}>
          {pages[pageIndex]}
        </div>
        {pageIndex >= 2 && (
          <NavBar
            left={
              <Link className="auth-link" to="/about">
                about
              </Link>
            }
            middle={<DemoUser />}
            right={
              <Link className="auth-link" to="/login">
                log in
              </Link>
            }
          />
        )}
      </div>
    </PageWrapper>
  );
}

export default Landing;
