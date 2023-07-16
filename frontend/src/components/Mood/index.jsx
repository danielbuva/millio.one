import { Link, useNavigate } from "react-router-dom";
import { NavBar, PageWrapper } from "../Layout";

function Mood() {
  const navigate = useNavigate();

  const handlePageRight = () => navigate("/journey");
  const handlePageLeft = () => navigate("/home");

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      mood
      <Link to="/mood/check-in" replace>
        mood check in
      </Link>
      <NavBar
        left={
          <Link className="nav-link" to="/home" replace>
            home
          </Link>
        }
        middle={<Link className="nav-link-active">mood</Link>}
        right={
          <Link className="nav-link" to="/journey" replace>
            journey
          </Link>
        }
      />
    </PageWrapper>
  );
}

export default Mood;
