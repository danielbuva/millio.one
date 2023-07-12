import ArrowRight from "../icons/ArrowRight";
import ArrowLeft from "../icons/ArrowLeft";
import { createContext, useState } from "react";

import "./index.css";

export const PageContext = createContext(null);

export default function Layout({
  children,
  pageRightFunction,
  setPageRightFunction,
  pageLeftFunction,
  setPageLeftFunction,
}) {
  const [infinitePagination, setInfinitePagination] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(
    parseInt(localStorage.getItem("pageIndex") || "0")
  );

  const handlePageRight = () => {
    if (pageRightFunction) {
      pageRightFunction();
    } else {
      if (pageIndex < numberOfPages - 1) {
        setPageIndex((previousPage) => {
          localStorage.setItem("pageIndex", previousPage + 1);
          return previousPage + 1;
        });
      } else if (infinitePagination) {
        setPageIndex(0);
        localStorage.setItem("pageIndex", "0");
      }
    }
  };

  const handlePageLeft = () => {
    if (pageLeftFunction) {
      pageLeftFunction();
    } else {
      if (pageIndex > 0) {
        setPageIndex((previousPage) => {
          localStorage.setItem("pageIndex", previousPage - 1);
          return previousPage - 1;
        });
      } else if (infinitePagination) {
        setPageIndex(numberOfPages - 1);
        localStorage.setItem("pageIndex", numberOfPages - 1);
      }
    }
  };

  //@TODO add current pageIndex to localstorge

  const value = {
    pageIndex,
    setInfinitePagination,
    setNumberOfPages,
    setPageIndex,
    setPageLeftFunction,
    setPageRightFunction,
  };

  return (
    <PageContext.Provider value={value}>
      <div id="base">
        <div id="base-container">
          <ArrowLeft onClick={handlePageLeft} />
          <div id="base-content">{children}</div>
          <ArrowRight onClick={handlePageRight} />
        </div>
      </div>
    </PageContext.Provider>
  );
}
