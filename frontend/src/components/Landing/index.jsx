import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import useSessionUser from "../../hooks/useSessionUser";
import { signup } from "../../store/session";

import { PageWrapper } from "../ClientWrapper/Layout";
import ConfirmLogout from "../ConfirmLogout";

import "./Landing.css";

//@TODO add unique email validation

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSessionUser();
  const disabledRight = useRef(false);

  if (user) return <ConfirmLogout />;

  const page1 = (
    <h1 id="land-text-1" key="millio">
      millio one.
      <br />
      <span>
        Building better habits and take care of your mental well-being
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
          }}
        />
      </div>
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

  const pages = [page1, page2, page3, page4];

  const handlePageRight = () => {
    switch (pageIndex) {
      case 0:
        if (!email || !password) {
          disabledRight.current = true;
        }
        break;
      case 1:
        if (!name) {
          disabledRight.current = true;
        }
        break;
      case 2:
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
  };

  return (
    <PageWrapper
      onPageLeft={handlePageLeft}
      onPageRight={handlePageRight}
      disabledRight={disabledRight.current}
    >
      <div className="page-container">
        {pageIndex !== 0 && (
          <Link className="auth-link" to="/login">
            log in
          </Link>
        )}
        <div className="page">{pages[pageIndex]}</div>
      </div>
    </PageWrapper>
  );
}

export default Landing;
