function CircleArrow({ up }) {
  return (
    <svg
      fill="#ffffff"
      height="32"
      width="32"
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32.00 32.00"
      stroke="#ffffff"
      transform={up ? "rotate(180)" : "rotate(0)"}
      strokeWidth="0.00032"
    >
      <g strokeWidth="0"></g>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#ffffff"
        strokeWidth="0.704"
      ></g>
      <g>
        <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M21.7,14.7l-5,5C16.5,19.9,16.3,20,16,20s-0.5-0.1-0.7-0.3 l-5-5c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4.3,4.3l4.3-4.3c0.4-0.4,1-0.4,1.4,0S22.1,14.3,21.7,14.7z"></path>{" "}
      </g>
    </svg>
  );
}

export default CircleArrow;
