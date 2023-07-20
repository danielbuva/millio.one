function Windmill({ boxSize = "40" }) {
  return (
    <svg
      width={boxSize}
      height={boxSize}
      viewBox="0 0 48.00 48.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(45)matrix(1, 0, 0, 1, 0, 0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.288"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect
          width="48"
          height="48"
          fill="white"
          fillOpacity="0.01"
        ></rect>
        <path
          d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4V24Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="0.00048000000000000007"
          strokeLinejoin="round"
        ></path>
        <path
          d="M24 24C24 29.5228 28.4772 34 34 34C39.5228 34 44 29.5228 44 24H24Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="0.00048000000000000007"
          strokeLinejoin="round"
        ></path>
        <path
          d="M24 24C24 18.4772 19.5228 14 14 14C8.47715 14 4 18.4772 4 24H24Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="0.00048000000000000007"
          strokeLinejoin="round"
        ></path>
        <path
          d="M24 24C18.4772 24 14 28.4772 14 34C14 39.5228 18.4772 44 24 44V24Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="0.00048000000000000007"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
}

export default Windmill;
