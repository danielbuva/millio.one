function Level2({ active, onClick }) {
  const fill = active ? "#ffffff" : "#000000";
  const stroke = active ? "#000000" : "#ffffff";

  return (
    <svg
      width="84"
      height="83"
      viewBox="0 0 84 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-selection"
      onClick={onClick}
    >
      <rect
        x="0.638428"
        y="0.5"
        width="81.9259"
        height="81.9259"
        rx="10.5"
        fill={fill}
        stroke="#ffffff"
        className="transition"
      />
      <path
        d="M39.0033 23.2446C40.158 21.2446 43.0447 21.2446 44.1994 23.2446L62.1306 54.3023C63.2853 56.3023 61.8419 58.8023 59.5325 58.8023H23.6702C21.3608 58.8023 19.9174 56.3023 21.0721 54.3023L39.0033 23.2446Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        className="transition"
      />
      <path
        d="M52.8835 40.2668C54.293 40.2668 55.5985 41.0087 56.3199 42.2196L62.717 52.9577C64.3055 55.624 62.3842 59.0049 59.2806 59.0049H24.5913C21.516 59.0049 19.591 55.6791 21.1229 53.0124L27.2916 42.2744C28.005 41.0325 29.3279 40.2668 30.76 40.2668H52.8835Z"
        fill={stroke}
        className="transition"
      />
    </svg>
  );
}

export default Level2;
