import React, { useEffect, useState } from "react";
import usePage from "../../hooks/usePage";

import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState([]);

  const {
    pageIndex,
    setNumberOfPages,
    setPageRightFunction,
    setInfinitePagination,
  } = usePage();

  const navigate = useNavigate();

  const page1 = (
    <h1 id="land-text-1" key="millio">
      millio one.
      <br />
      <span>
        Building better habits and take care if your mental well-being
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

  const focusOptions = [
    "mood",
    "focus",
    "productivity",
    "sleep",
    "stress",
    "anxiety",
    "something else",
  ];

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

  useEffect(() => {
    setNumberOfPages(pages.length + 1); // +1 because the last page is navigation
  }, [setNumberOfPages, pages.length]);

  useEffect(() => {
    if (pageIndex === pages.length) {
      setPageRightFunction(() => {
        navigate("/home");
        localStorage.setItem("pageIndex", "0");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  return (
    <div id="land-container">
      <div id="page">{pages[pageIndex]}</div>
    </div>
  );
}

export default Landing;
