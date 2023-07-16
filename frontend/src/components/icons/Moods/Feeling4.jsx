function Feeling4({ active, onClick, noStroke, sm }) {
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
        cx="20.8647"
        cy="20.4053"
        r="18.5"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.15552 19.8054C10.373 25.2979 15.2726 29.4055 21.1315 29.4055C26.9905 29.4055 31.89 25.2979 33.1076 19.8054H30.9215C29.7651 24.1054 25.8201 27.2721 21.1314 27.2721C16.4428 27.2721 12.4978 24.1054 11.3414 19.8054H9.15552Z"
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.545 42C17.828 52.2983 27.0146 59.9998 38 59.9998C48.9854 59.9998 58.172 52.2983 60.4549 42H56.3564C54.188 50.0624 46.7913 55.9999 38 55.9999C29.2087 55.9999 21.812 50.0624 19.6436 42H15.545Z"
        fill={pathFill}
        className="transition"
      />
    </svg>
  );
}

export default Feeling4;
