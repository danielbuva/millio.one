function Feeling2({ active, onClick, noStroke, sm }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const pathFill = active ? "#000000" : "#ffffff";
  const stroke = noStroke ? "000000" : "#ffffff";

  return sm ? (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20.4324"
        cy="20.4053"
        r="18.5"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <rect
        x="9.49927"
        y="21.9387"
        width="21.8667"
        height="2.66667"
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
        className="transition"
      />
      <rect
        x="17"
        y="46"
        width="41"
        height="5"
        fill={pathFill}
        className="transition"
      />
    </svg>
  );
}

export default Feeling2;
