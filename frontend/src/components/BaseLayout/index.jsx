import ArrowRight from "../icons/ArrowRight";
import ArrowLeft from "../icons/ArrowLeft";
import { createContext, useState } from "react";

import "./index.css";

export const PageContext = createContext(null);

export default function BaseLayout({
  children,
  pageRightFunction,
  setPageRightFunction,
}) {
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [infinitePagination, setInfinitePagination] = useState(false);

  const handlePageRight = () => {
    if (pageRightFunction) {
      pageRightFunction();
    } else {
      if (pageIndex < numberOfPages - 1) {
        setPageIndex((previousPage) => previousPage + 1);
      } else if (infinitePagination) {
        setPageIndex(0);
      }
    }
  };

  const handlePageLeft = () => {
    if (pageIndex > 0) {
      setPageIndex((previousPage) => previousPage - 1);
    } else if (infinitePagination) {
      setPageIndex(numberOfPages - 1);
    }
  };

  //@TODO add dynamic left and right button functionality
  //@TODO add current pageIndex to localstorge

  const value = {
    pageIndex,
    setInfinitePagination,
    setNumberOfPages,
    setPageIndex,
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
