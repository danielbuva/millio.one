function Feeling3({ active, onClick, noStroke }) {
  const circleFill = active ? "#d2d2d2" : "#000000";
  const pathFill = active ? "#000000" : "#d2d2d2";
  const stroke = noStroke ? "000000" : "#d2d2d2";

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
      <rect x="17" y="46" width="41" height="5" fill={pathFill} />
    </svg>
  );
}

export default Feeling3;
