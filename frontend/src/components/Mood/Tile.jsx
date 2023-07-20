import { Link } from "react-router-dom";

function Tile({ p1, p2, p3, icon, show, to }) {
  return (
    <Link className="check-in-tile" to={to}>
      <div className="check-in-tile-header">
        {p1} <br /> <span>{p2}</span>
      </div>
      {show && <p className="begin">begin</p>}
      {icon}
    </Link>
  );
}

export default Tile;
