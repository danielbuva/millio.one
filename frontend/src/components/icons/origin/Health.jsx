function Health({ active, onClick }) {
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
      <circle
        cx="35"
        cy="35"
        r="34.5"
        fill={circleFill}
        stroke="white"
        className="transition"
      />
      <path
        d="M22 37.3642L27 37.6842L29.5 22.5V22C29.5 22 31.6267 37.0667 32 38L34 50.5449C34.3467 51.4116 35.1533 51.4116 35.5 50.5449L38 24.545C38.2933 23.7983 38.6267 23.8386 39 24.5452L40.9067 37.6842C41.32 38.4709 42.3867 39.1109 43.2667 39.1109H48.68"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition"
      />
    </svg>
  );
}

export default Health;
