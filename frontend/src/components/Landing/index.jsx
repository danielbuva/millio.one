import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
  const [pageIndex, setPageIndex] = useState(
    parseInt(localStorage.getItem("lpIndex") || "0")
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSessionUser();

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
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          className="auth-input"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
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
        onChange={(e) => setName(e.currentTarget.value)}
      />
    </React.Fragment>
  );

  const updateFocus = (e) => {
    setFocus((state) => {
      const focus = e.target.innerText;
      if (focus.length > 14) return state;
      if (state.includes(focus)) {
        return state.filter((s) => s !== focus);
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
    if (pageIndex < pages.length - 1) {
      setPageIndex((previousPage) => {
        localStorage.setItem("lpIndex", previousPage + 1);
        return previousPage + 1;
      });
    } else {
      // if (password !== confirmPassword) {
      //   return setErrors({
      //     confirmPassword:
      //       "Confirm password field must be the same as the Password field",
      //   });
      // }

      dispatch(
        signup({
          email,
          name,
          password,
        })
      )
        .then(() => {
          navigate("/home");
          localStorage.setItem("lpIndex", "0");
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            // setErrors(data.errors);
            console.log(data.errors);
          }
        });
    }
  };

  const handlePageLeft = () => {
    if (pageIndex > 0) {
      setPageIndex((previousPage) => {
        localStorage.setItem("lpIndex", previousPage - 1);
        return previousPage - 1;
      });
    }
  };

  return (
    <PageWrapper onPageLeft={handlePageLeft} onPageRight={handlePageRight}>
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
