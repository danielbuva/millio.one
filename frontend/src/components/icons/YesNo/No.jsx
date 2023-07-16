function No({ no = "no", onClick }) {
  return (
    <div className="yes-no-option" onClick={onClick}>
      <svg
        width="75"
        height="75"
        viewBox="0 0 75 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="37.5"
          cy="37.5"
          r="37"
          fill="#000000"
          stroke="#ffffff"
        />
      </svg>
      {no}
    </div>
  );
}

export default No;
