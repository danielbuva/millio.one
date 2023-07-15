function Date({ active, onClick }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const stroke = active ? "#000000" : "#ffffff";

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
        d="M35.8267 48.7466C35.3734 48.9066 34.6267 48.9066 34.1734 48.7466C30.3067 47.4266 21.6667 41.92 21.6667 32.5866C21.6667 28.4666 24.9867 25.1333 29.0801 25.1333C31.5067 25.1333 33.6534 26.3066 35.0001 28.12C35.6851 27.1945 36.5774 26.4423 37.6054 25.9236C38.6334 25.405 39.7686 25.1343 40.9201 25.1333C45.0134 25.1333 48.3334 28.4666 48.3334 32.5866C48.3334 41.92 39.6934 47.4266 35.8267 48.7466Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Date;
