function Feeling3({ active, onClick, noStroke }) {
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
        r="35.5"
        fill={circleFill}
        stroke={stroke}
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7961 48C21.697 55.1494 29.2821 59.9998 38 59.9998C46.718 59.9998 54.3031 55.1494 58.2039 48H53.5255C50.085 52.8399 44.4136 55.9999 38 55.9999C31.5864 55.9999 25.9151 52.8399 22.4745 48H17.7961Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Feeling3;
