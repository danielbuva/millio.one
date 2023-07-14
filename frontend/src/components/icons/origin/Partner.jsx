function Partner({ active, onClick }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const pathFill = active ? "#000000" : "#ffffff";

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
        d="M35.5 31.5C39.5041 31.5 42.75 28.2541 42.75 24.25C42.75 20.2459 39.5041 17 35.5 17C31.4959 17 28.25 20.2459 28.25 24.25C28.25 28.2541 31.4959 31.5 35.5 31.5Z"
        fill={pathFill}
      />
      <path
        d="M50 45.0938C50 49.5984 50 53.25 35.5 53.25C21 53.25 21 49.5984 21 45.0938C21 40.5891 27.4919 36.9375 35.5 36.9375C43.5082 36.9375 50 40.5891 50 45.0938Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Partner;
