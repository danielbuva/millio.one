import Yes from "./Yes";
import No from "./No";

import "./YesNo.css";

function YesNo({ onNo, onYes, no, yes }) {
  return (
    <div className="yes-no">
      <No no={no} onClick={onNo} /> <Yes onClick={onYes} yes={yes} />
    </div>
  );
}

export default YesNo;
