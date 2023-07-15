function Level3({ active, onClick }) {
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
        x="1.1062"
        y="0.5"
        width="81.9259"
        height="81.9259"
        rx="10.5"
        fill={fill}
        stroke="#ffffff"
      />
      <path
        d="M39.471 23.2446C40.6257 21.2446 43.5125 21.2446 44.6672 23.2446L62.5984 54.3023C63.753 56.3023 62.3097 58.8023 60.0003 58.8023H24.138C21.8286 58.8023 20.3852 56.3023 21.5399 54.3023L39.471 23.2446Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M48.8919 32.6919C50.341 32.6919 51.6768 33.4756 52.3837 34.7406L63.063 53.851C64.553 56.5173 62.6256 59.8023 59.5713 59.8023H24.2562C21.1821 59.8023 19.2569 56.4789 20.7863 53.8122L31.7467 34.7018C32.4597 33.4586 33.7834 32.6919 35.2165 32.6919H48.8919Z"
        fill={stroke}
      />
    </svg>
  );
}

export default Level3;
