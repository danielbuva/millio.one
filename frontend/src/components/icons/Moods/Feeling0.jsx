function Feeling0({ active, onClick, noStroke }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const pathFill = active ? "#000000" : "#ffffff";
  const stroke = noStroke ? "000000" : "#ffffff";

  return (
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
