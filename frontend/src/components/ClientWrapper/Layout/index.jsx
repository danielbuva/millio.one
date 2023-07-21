import useSessionUser from "../../../hooks/useSessionUser";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../../../store/layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import ArrowLeft from "../../icons/ArrowLeft";
import ArrowRight from "../../icons/ArrowRight";

import { isAsyncFunction } from "../../../utils";

import "./index.css";

export function Layout({ children }) {
  const show = useSelector((s) => s.layout.show);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const style = show ? undefined : { cursor: "none" };

  return (
    <div
      id="base"
      style={style}
      onClick={
        pathname === "/breathe/now"
          ? () => {
              dispatch(setShow(true));
            }
          : undefined
      }
    >
      <div id="base-container">{children}</div>
    </div>
  );
}

const sounds = [
  "/PageTurn1.mp3",
  "/PageTurn2.mp3",
  "/PageTurn3.mp3",
  "/PageTurn4.mp3",
];

export function PageWrapper({
  children,
  disabledLeft,
  disabledRight,
  onPageLeft,
  onPageRight,
  hide,
}) {
  const [pageLeft, setPageLeft] = useState(
    Boolean(localStorage.getItem("pageLeft")) || false
  );
  const [pageRight, setPageRight] = useState(
    Boolean(localStorage.getItem("pageRight")) || false
  );
  const user = useSessionUser();

  const playSound = () => {
    if (user?.mute) return null;
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const pageTurnSound = new Audio(sounds[randomIndex]);
    pageTurnSound.volume = 0.3;
    pageTurnSound.play();
  };

  useEffect(() => {
    const pageTurnLeft = setTimeout(() => {
      setPageLeft(false);
      localStorage.setItem("pageLeft", "");
    }, 50);

    return () => clearTimeout(pageTurnLeft);
  }, [pageLeft]);

  useEffect(() => {
    const pageTurnRight = setTimeout(() => {
      setPageRight(false);
      localStorage.setItem("pageRight", "");
    }, 50);

    return () => clearTimeout(pageTurnRight);
  }, [pageRight]);

  const handlePageLeft = isAsyncFunction(onPageLeft)
    ? async () => {
        setPageLeft(true);
        localStorage.setItem("pageLeft", ": )");
        await onPageLeft();
        playSound();
      }
    : () => {
        setPageLeft(true);
        localStorage.setItem("pageLeft", ": )");
        onPageLeft();
        playSound();
      };

  const handlePageRight = isAsyncFunction(onPageRight)
    ? async () => {
        setPageRight(true);
        localStorage.setItem("pageRight", "( :");
        await onPageRight();
        playSound();
      }
    : () => {
        setPageRight(true);
        localStorage.setItem("pageRight", "( :");
        onPageRight();
        playSound();
      };

  return (
    <>
      <ArrowLeft
        hide={hide}
        className={`left-arrow ${pageLeft ? "page-turn-left" : ""}`}
        onClick={handlePageLeft}
        disabled={disabledLeft}
      />
      <div className="base-content">{children}</div>
      <ArrowRight
        hide={hide}
        className={`right-arrow ${pageRight ? "page-turn-right" : ""}`}
        onClick={handlePageRight}
        disabled={disabledRight}
      />
    </>
  );
}

export function NavBar({ left, middle, right }) {
  return (
    <div className="nav-bar">
      {left} {middle} {right}
    </div>
  );
}

export default Layout;
