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
        x="1.17053"
        y="0.5"
        width="81.9259"
        height="81.9259"
        rx="10.5"
        fill={fill}
        stroke="#ffffff"
        className="transition"
      />
      <path
        d="M39.5354 23.2446C40.6901 21.2446 43.5768 21.2446 44.7315 23.2446L62.6627 54.3023C63.8174 56.3023 62.374 58.8023 60.0646 58.8023H24.2023C21.8929 58.8023 20.4495 56.3023 21.6042 54.3023L39.5354 23.2446Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        className="transition"
      />
      <path
        d="M59.0222 50.6326C60.4182 50.6326 61.7132 51.3603 62.439 52.5528L63.151 53.7225C64.7735 56.3881 62.8548 59.8023 59.7342 59.8023H24.6694C21.6065 59.8023 19.68 56.5005 21.1871 53.834L21.8483 52.6644C22.5579 51.4089 23.8884 50.6326 25.3305 50.6326H59.0222Z"
        fill={stroke}
        className="transition"
      />
    </svg>
  );
}

export default Level2;
