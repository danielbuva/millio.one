function Friends({ active, onClick }) {
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
        d="M35.5 42C35.5 37.5495 31.518 34.95 26 34.95C20.482 34.95 16 38.5495 16 43M26 31.5C27.5438 31.5 29.0243 30.8942 30.1159 29.8159C31.2075 28.7375 31.8207 27.275 31.8207 25.75C31.8207 24.225 31.2075 22.7625 30.1159 21.6841C29.0243 20.6058 27.5438 20 26 20C24.4562 20 22.9757 20.6058 21.8841 21.6841C20.7925 22.7625 20.1793 24.225 20.1793 25.75C20.1793 27.275 20.7925 28.7375 21.8841 29.8159C22.9757 30.8942 24.4562 31.5 26 31.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition"
      />
      <path
        d="M53.9067 49.6667C53.9067 44.5067 48.7733 40.3333 42.4533 40.3333C36.1333 40.3333 31 44.5067 31 49.6667M42.4533 36.3333C44.2214 36.3333 45.9171 35.631 47.1674 34.3807C48.4176 33.1305 49.12 31.4348 49.12 29.6667C49.12 27.8986 48.4176 26.2029 47.1674 24.9526C45.9171 23.7024 44.2214 23 42.4533 23C40.6852 23 38.9895 23.7024 37.7393 24.9526C36.489 26.2029 35.7867 27.8986 35.7867 29.6667C35.7867 31.4348 36.489 33.1305 37.7393 34.3807C38.9895 35.631 40.6852 36.3333 42.4533 36.3333Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition"
      />
    </svg>
  );
}

export default Friends;
