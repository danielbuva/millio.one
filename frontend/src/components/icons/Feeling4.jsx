function Feeling4({ active, onClick, noStroke }) {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.545 42C17.828 52.2983 27.0146 59.9998 38 59.9998C48.9854 59.9998 58.172 52.2983 60.4549 42H56.3564C54.188 50.0624 46.7913 55.9999 38 55.9999C29.2087 55.9999 21.812 50.0624 19.6436 42H15.545Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Feeling4;
