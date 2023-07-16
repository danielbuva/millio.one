function Feeling0({ active, onClick, noStroke, sm }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const pathFill = active ? "#000000" : "#ffffff";
  const stroke = noStroke ? "000000" : "#ffffff";

  return sm ? (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20.4053"
        r="18.5"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.4851 28.3384C31.2676 22.8459 26.368 18.7383 20.5091 18.7383C14.6502 18.7383 9.7506 22.8459 8.53307 28.3384L10.7192 28.3384C11.8756 24.0383 15.8206 20.8715 20.5094 20.8715C25.1981 20.8715 29.1431 24.0383 30.2995 28.3384L32.4851 28.3384Z"
        fill="#ffffff"
      />
    </svg>
  ) : (
    <svg
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-selection"
      onClick={onClick}
    >
      <circle
        cx="37.5"
        cy="37.5"
        r="36"
        fill={circleFill}
        stroke={stroke}
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.9099 57.9998C58.6269 47.7015 49.4403 39.9999 38.455 39.9999C27.4696 39.9999 18.283 47.7015 16 57.9998L20.0986 57.9998C22.2669 49.9373 29.6637 43.9998 38.455 43.9998C47.2462 43.9998 54.643 49.9373 56.8113 57.9998L60.9099 57.9998Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Feeling0;
