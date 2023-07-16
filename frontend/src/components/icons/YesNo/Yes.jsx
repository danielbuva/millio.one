function Yes({ onClick, yes = "yes" }) {
  return (
    <div className="yes-no-option" onClick={onClick}>
      <svg
        width="75"
        height="75"
        viewBox="0 0 75 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="37.5" cy="37.5" r="37.5" fill="#ffffff" />
      </svg>
      {yes}
    </div>
  );
}

export default Yes;
