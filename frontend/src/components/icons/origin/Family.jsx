function Family({ active, onClick }) {
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
        d="M23.2649 47.9602H47.3388"
        stroke={col}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2669 47.9604L23.3336 31.9204H20L33.6936 22.5604C34.1631 22.1971 34.7399 22 35.3336 22C35.9272 22 36.5041 22.1971 36.9736 22.5604L50 31.9204H47L47.3336 47.9604"
        stroke={col}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M34.1 36H36.9C38.825 36 38.825 36 39 39.6V48H32V39.6C32 36 32 36 34.1 36Z"
        stroke={col}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M44 27L43.9797 22H41V25"
        stroke={col}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 31L34.5 23.5H35.5H36L46.5 31L47 47H39V35.5H32V47H24V31Z"
        fill={col}
      />
    </svg>
  );
}

export default Family;
