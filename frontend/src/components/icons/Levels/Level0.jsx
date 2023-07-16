function Level0({ active, onClick }) {
  const fill = active ? "#ffffff" : "#000000";
  const stroke = active ? "#000000" : "#ffffff";

  return (
    <svg
      width="83"
      height="83"
      viewBox="0 0 83 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-selection"
      onClick={onClick}
    >
      <rect
        x="0.5"
        y="0.5"
        width="81.9259"
        height="81.9259"
        rx="10.5"
        fill={fill}
        stroke="#ffffff"
        className="transition"
      />
      <path
        d="M38.8648 23.2446C40.0195 21.2446 42.9063 21.2446 44.061 23.2446L61.9921 54.3023C63.1468 56.3023 61.7035 58.8023 59.3941 58.8023H23.5318C21.2224 58.8023 19.779 56.3023 20.9337 54.3023L38.8648 23.2446Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        className="transition"
      />
    </svg>
  );
}

export default Level0;
