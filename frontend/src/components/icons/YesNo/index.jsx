import Yes from "./Yes";
import No from "./No";

import "./YesNo.css";

function YesNo({ activeNo, activeYes, onNo, onYes, no, yes, center }) {
  return (
    <div
      className="yes-no"
      style={center ? { justifyContent: "center" } : undefined}
    >
      <No no={no} onClick={onNo} active={activeNo} />
      <Yes onClick={onYes} yes={yes} active={activeYes} />
    </div>
  );
}

export default YesNo;
