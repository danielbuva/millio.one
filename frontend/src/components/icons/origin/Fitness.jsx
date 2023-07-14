function Fitness({ active, onClick }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const col = active ? "#000000" : "#ffffff";

  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-selection"
      onClick={onClick}
    >
      <circle cx="35" cy="35" r="34.5" fill={circleFill} stroke="white" />
      <path
        d="M15 25C15 23.3431 16.3431 22 18 22H52C53.6569 22 55 23.3431 55 25V45C55 46.6569 53.6569 48 52 48H18C16.3431 48 15 46.6569 15 45V25Z"
        fill={col}
      />
      <rect x="34" y="22" width="2" height="26" fill={circleFill} />
      <circle cx="35" cy="35" r="5.5" fill={col} stroke={circleFill} />
      <rect
        x="14.5"
        y="29.5"
        width="8"
        height="11"
        rx="0.5"
        fill={col}
        stroke={circleFill}
      />
      <rect
        x="47.5"
        y="29.5"
        width="8"
        height="11"
        rx="0.5"
        fill={col}
        stroke={circleFill}
      />
    </svg>
  );
}

export default Fitness;
