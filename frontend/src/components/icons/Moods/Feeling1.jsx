function Feeling1({ active, onClick, noStroke }) {
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
        d="M58.0803 51C54.0373 44.4019 46.7602 39.9999 38.455 39.9999C30.1498 39.9999 22.8727 44.4019 18.8297 51L23.6913 51C27.1748 46.7293 32.4944 43.9998 38.455 43.9998C44.4157 43.9998 49.7352 46.7293 53.2187 51L58.0803 51Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Feeling1;
