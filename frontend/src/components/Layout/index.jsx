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

export function PageWrapper({ onPageLeft, onPageRight, children }) {
  return (
    <>
      <ArrowLeft onClick={onPageLeft} />
      <div className="base-content">{children}</div>
      <ArrowRight onClick={onPageRight} />
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
