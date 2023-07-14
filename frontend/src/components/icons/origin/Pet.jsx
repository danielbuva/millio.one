function Pet({ active, onClick }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const pathFill = active ? "#000000" : "#ffffff";

  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-selection"
      onClick={onClick}
    >
      <circle cx="35" cy="35" r="34.5" fill={circleFill} stroke="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.9997 24.719C32.108 24.719 31.8197 25.0208 30.3231 25.0208C29.076 25.0208 25.3347 22 23.4641 22C21.5935 22 19.4111 23.0875 19.4111 26.2292V29.8542C19.4149 30.8057 19.7642 33.7226 21.1315 32.9431C19.515 34.8339 19.3517 37.0386 19.3739 39.173C18.9385 39.2975 18.4943 39.4379 18.0632 39.5837C16.7273 40.0359 15.3105 40.6124 14.6704 41.0215C13.9907 41.4559 13.7956 42.3536 14.2345 43.0262C14.6735 43.699 15.5804 43.8921 16.2601 43.4577C16.5653 43.2626 17.669 42.782 19.0112 42.3278C19.1595 42.2776 19.3081 42.2287 19.4559 42.1813C19.5463 43.02 19.7706 43.7856 20.1041 44.4831L20.058 44.5071C19.2576 44.9257 18.515 45.4063 18.0414 45.7127C17.9595 45.7657 17.8856 45.8134 17.8209 45.8548C17.1412 46.2892 16.946 47.1869 17.385 47.8595C17.824 48.5323 18.7309 48.7254 19.4106 48.291C19.4909 48.2396 19.5765 48.1843 19.6669 48.1259C20.1461 47.8164 20.7589 47.4204 21.427 47.0711C21.5836 46.9891 21.7343 46.9149 21.8785 46.848C25.2586 49.9846 31.3268 51 34.9997 51C38.6723 51 44.7407 49.9846 48.1207 46.848C48.2649 46.9149 48.4155 46.9891 48.5722 47.0711C49.2402 47.4204 49.853 47.8164 50.3322 48.1259C50.4226 48.1843 50.5082 48.2396 50.5885 48.291C51.2683 48.7254 52.1751 48.5323 52.6142 47.8595C53.0531 47.1869 52.858 46.2892 52.1782 45.8548C52.1135 45.8134 52.0397 45.7657 51.9577 45.7127C51.4841 45.4063 50.7414 44.9257 49.9411 44.5071L49.8952 44.4831C50.2287 43.7854 50.4529 43.02 50.5434 42.1811C50.6914 42.2285 50.8403 42.2774 50.9888 42.3278C52.331 42.782 53.4348 43.2626 53.74 43.4577C54.4196 43.8921 55.3266 43.699 55.7655 43.0262C56.2044 42.3536 56.0093 41.4559 55.3297 41.0215C54.6895 40.6124 53.2727 40.0359 51.9368 39.5837C51.5054 39.4377 51.061 39.2975 50.6254 39.1728C50.6475 37.0384 50.4842 34.8339 48.8677 32.9431C50.2351 33.7226 50.5844 30.8057 50.5883 29.8542V26.2294C50.5883 23.0877 48.4057 22.0002 46.5351 22.0002C44.6645 22.0002 40.9233 25.0208 39.6762 25.0208C38.1797 25.0208 37.8915 24.719 34.9997 24.719ZM33.6799 42.4941C34.0757 42.3607 34.5428 42.3 34.9997 42.3C35.4566 42.3 35.9236 42.3607 36.3194 42.4941C36.5136 42.5595 36.7511 42.6627 36.9601 42.8293C37.1701 42.9966 37.4415 43.3065 37.4415 43.75C37.4415 44.1935 37.1701 44.5034 36.9601 44.6707C36.7511 44.8373 36.5136 44.9405 36.3194 45.0059C35.9236 45.1393 35.4566 45.2 34.9997 45.2C34.5428 45.2 34.0757 45.1393 33.6799 45.0059C33.4857 44.9405 33.2482 44.8373 33.039 44.6707C32.829 44.5034 32.5579 44.1935 32.5579 43.75C32.5579 43.3065 32.829 42.9966 33.039 42.8293C33.2482 42.6627 33.4857 42.5595 33.6799 42.4941ZM39.2386 36.501C39.5053 36.0594 40.0315 35.5333 40.8209 35.5333C41.6103 35.5333 42.1365 36.0594 42.403 36.501C42.681 36.9615 42.8134 37.5196 42.8134 38.0708C42.8134 38.622 42.681 39.1802 42.403 39.6407C42.1365 40.0823 41.6103 40.6083 40.8209 40.6083C40.0315 40.6083 39.5053 40.0823 39.2386 39.6407C38.9606 39.1802 38.8284 38.622 38.8284 38.0708C38.8284 37.5196 38.9606 36.9615 39.2386 36.501ZM27.5962 36.501C27.8627 36.0594 28.389 35.5333 29.1784 35.5333C29.9678 35.5333 30.4941 36.0594 30.7606 36.501C31.0386 36.9615 31.1709 37.5196 31.1709 38.0708C31.1709 38.622 31.0386 39.1802 30.7606 39.6407C30.4941 40.0823 29.9678 40.6083 29.1784 40.6083C28.389 40.6083 27.8627 40.0823 27.5962 39.6407C27.3183 39.1802 27.1859 38.622 27.1859 38.0708C27.1859 37.5196 27.3183 36.9615 27.5962 36.501Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Pet;
