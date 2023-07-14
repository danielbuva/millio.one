import { isAsyncFunction } from "../../utils";

import { useEffect, useState } from "react";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";

import "./index.css";

export function Layout({ children }) {
  return (
    <div id="base">
      <div id="base-container">{children}</div>
    </div>
  );
}

export function PageWrapper({
  children,
  disableLeft,
  disableRight,
  onPageLeft,
  onPageRight,
}) {
  const [pageLeft, setPageLeft] = useState(
    Boolean(localStorage.getItem("pageLeft")) || false
  );
  const [pageRight, setPageRight] = useState(
    Boolean(localStorage.getItem("pageRight")) || false
  );

  const playSound = () => {
    const pageTurnSound = new Audio("/PageTurn.mp3");
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
        className={`left-arrow ${pageLeft ? "page-turn-left" : ""}`}
        onClick={handlePageLeft}
        disabled={disableLeft}
      />
      <div className="base-content">{children}</div>
      <ArrowRight
        className={`right-arrow ${pageRight ? "page-turn-right" : ""}`}
        onClick={handlePageRight}
        disabled={disableRight}
      />
    </>
  );
}

export default Layout;
