function Feeling3({ active, onClick, noStroke, sm }) {
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
        cx="20.6487"
        cy="20.4053"
        r="18.5"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.1399 23.0051C12.2203 26.8183 16.2657 29.4052 20.9154 29.4052C25.5651 29.4052 29.6105 26.8183 31.6909 23.0051H29.1958C27.3609 25.5864 24.3361 27.2718 20.9156 27.2718C17.495 27.2718 14.4702 25.5864 12.6353 23.0051H10.1399Z"
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
