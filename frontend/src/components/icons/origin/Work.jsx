function Work({ active, onClick }) {
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
      <circle
        cx="35"
        cy="35"
        r="34.5"
        fill={circleFill}
        stroke="white"
        className="transition"
      />
      <path
        d="M18 26.5H52C52.8284 26.5 53.5 27.1716 53.5 28V47.7143C53.5 48.5427 52.8284 49.2143 52 49.2143H18C17.1716 49.2143 16.5 48.5427 16.5 47.7143V28C16.5 27.1716 17.1716 26.5 18 26.5Z"
        stroke={col}
        strokeWidth="3"
        strokeLinejoin="round"
        className="transition"
      />
      <path
        d="M29 20.5H41C41.8284 20.5 42.5 21.1716 42.5 22V26.5H27.5V22C27.5 21.1716 28.1716 20.5 29 20.5Z"
        stroke={col}
        strokeWidth="3"
        strokeLinejoin="round"
        className="transition"
      />
      <path
        d="M17 35L52.4286 35V39L17 39V35Z"
        fill={col}
        className="transition"
      />
    </svg>
  );
}

export default Work;
