function Music({ active, onClick }) {
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
        d="M34.96 43.0001C34.96 44.4146 34.3981 45.7711 33.3979 46.7713C32.3977 47.7715 31.0412 48.3334 29.6267 48.3334C28.2122 48.3334 26.8556 47.7715 25.8554 46.7713C24.8552 45.7711 24.2933 44.4146 24.2933 43.0001C24.2933 41.5856 24.8552 40.229 25.8554 39.2288C26.8556 38.2286 28.2122 37.6667 29.6267 37.6667C31.0412 37.6667 32.3977 38.2286 33.3979 39.2288C34.3981 40.229 34.96 41.5856 34.96 43.0001ZM34.96 43.0001V24.3334M38.48 21.8134L44.3733 23.7734C45.8 24.2534 46.9733 25.8667 46.9733 27.3734V28.9334C46.9733 30.9734 45.4 32.1067 43.4667 31.4667L37.5733 29.5067C36.1467 29.0267 34.9733 27.4134 34.9733 25.9067V24.3334C34.96 22.3067 36.5467 21.1601 38.48 21.8134Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition"
      />
    </svg>
  );
}

export default Music;
