function Relax({ active, onClick }) {
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
      <circle cx="35" cy="35" r="34.5" fill={circleFill} stroke="white" />
      <circle cx="34.5" cy="35.5" r="10.5" fill={stroke} />
      <line x1="34.5" y1="14" x2="34.5" y2="22" stroke={stroke} />
      <line x1="34.5" y1="49" x2="34.5" y2="57" stroke={stroke} />
      <line x1="12" y1="35.5" x2="20" y2="35.5" stroke={stroke} />
      <line x1="49" y1="35.5" x2="57" y2="35.5" stroke={stroke} />
      <line
        x1="18.3536"
        y1="20.6464"
        x2="24.0104"
        y2="26.3033"
        stroke={stroke}
      />
      <line
        x1="44.3536"
        y1="44.6464"
        x2="50.0104"
        y2="50.3033"
        stroke={stroke}
      />
      <line
        x1="51.3536"
        y1="19.3536"
        x2="45.3536"
        y2="25.3536"
        stroke={stroke}
      />
      <line
        x1="24.3536"
        y1="45.3536"
        x2="18.3536"
        y2="51.3536"
        stroke={stroke}
      />
    </svg>
  );
}

export default Relax;
