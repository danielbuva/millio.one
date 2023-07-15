function Level4({ active, onClick }) {
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
        x="0.574158"
        y="0.5"
        width="81.9259"
        height="81.9259"
        rx="10.5"
        fill={fill}
        stroke="#ffffff"
      />
      <path
        d="M38.073 22.7446C39.6126 20.078 43.4616 20.078 45.0012 22.7446L62.9323 53.8023C64.4719 56.469 62.5474 59.8023 59.4682 59.8023H23.6059C20.5267 59.8023 18.6022 56.469 20.1418 53.8023L38.073 22.7446Z"
        fill={stroke}
      />
    </svg>
  );
}
export default Level4;
