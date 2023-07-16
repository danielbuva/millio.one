function Yes({ active, onClick, yes = "yes" }) {
  const fill = active ? "#000000" : "#ffffff";
  return (
    <div
      className="yes-no-option"
      onClick={onClick}
      style={
        active ? { backgroundColor: "#fff", color: "#000" } : undefined
      }
    >
      <svg
        width="75"
        height="75"
        viewBox="0 0 75 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="37.5" cy="37.5" r="37.5" fill={fill} />
      </svg>
      {yes}
    </div>
  );
}

export default Yes;
