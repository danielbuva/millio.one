import { useEffect, useState } from "react";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";

import "./index.css";
import { isAsyncFunction } from "../../utils";

export function Layout({ children }) {
  return (
    <div id="base">
      <div id="base-container">{children}</div>
    </div>
  );
}

export function PageWrapper({ onPageLeft, onPageRight, children }) {
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

  return (
    <>
      <ArrowLeft
        className={`left-arrow ${pageLeft ? "page-turn-left" : ""}`}
        onClick={
          isAsyncFunction(onPageLeft)
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
              }
        }
      />
      <div className="base-content">{children}</div>
      <ArrowRight
        className={`right-arrow ${pageRight ? "page-turn-right" : ""}`}
        onClick={
          isAsyncFunction(onPageRight)
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
              }
        }
      />
    </>
  );
}

export default Layout;

// example pagination
//   const handlePageRight = () => {
//     if (pageIndex < numberOfPages - 1) {
//       setPageIndex((previousPage) => {
//         localStorage.setItem("landingPageIndex", previousPage + 1);
//         return previousPage + 1;
//       });
//     } else {
//       setPageIndex(0);
//       localStorage.setItem("landingPageIndex", "0");
//     }
//   };

//   const handlePageLeft = () => {
//     if (pageIndex > 0) {
//       setPageIndex((previousPage) => {
//         localStorage.setItem("landingPageIndex", previousPage - 1);
//         return previousPage - 1;
//       });
//     } else {
//       setPageIndex(numberOfPages - 1);
//       localStorage.setItem("landingPageIndex", numberOfPages - 1);
//     }
//   };
