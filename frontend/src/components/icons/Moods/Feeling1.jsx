function Feeling1({ active, onClick, noStroke, sm }) {
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
        cx="20.2161"
        cy="20.4053"
        r="18.5"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.1924 24.6057C29.0361 21.0866 25.1549 18.7387 20.7254 18.7387C16.2958 18.7387 12.4146 21.0866 10.2583 24.6057L12.8513 24.6057C14.7092 22.3278 17.5464 20.8719 20.7256 20.8719C23.9048 20.8719 26.7421 22.3278 28.5999 24.6057L31.1924 24.6057Z"
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
        d="M58.0803 51C54.0373 44.4019 46.7602 39.9999 38.455 39.9999C30.1498 39.9999 22.8727 44.4019 18.8297 51L23.6913 51C27.1748 46.7293 32.4944 43.9998 38.455 43.9998C44.4157 43.9998 49.7352 46.7293 53.2187 51L58.0803 51Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Feeling1;
