import { Link } from "react-router-dom";

function CheckIn({ p1, p2, p3 }) {
  return (
    <Link className="check-in-tile" to={`/${p1}/check-in`}>
      {p1} <br /> {p2} <br /> <span>{p3}</span>
    </Link>
  );
}

export default CheckIn;
