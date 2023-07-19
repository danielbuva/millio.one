import { Link, useNavigate } from "react-router-dom";
import { readAvgMood } from "../../store/journey";
import { NavBar, PageWrapper } from "../ClientWrapper/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Mood() {
  const navigate = useNavigate();

  const handlePageRight = () => navigate("/journey");
  const handlePageLeft = () => navigate("/home");

  const dispatch = useDispatch();
  const avgMood = useSelector((s) => s.journey.avgMood);

  useEffect(() => {
    dispatch(readAvgMood());
  }, [dispatch]);

  const avgMoodText =
    avgMood < 1
      ? "terrible"
      : avgMood < 2
      ? "bad"
      : avgMood < 3
      ? "neutral"
      : avgMood < 4
      ? "good"
      : "excellent";

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      <h1>
        {avgMood ? avgMoodText + " mood." : "check in for mood trends."}
      </h1>
      <Link to="/mood/check-in" replace>
        mood check in
      </Link>
      <Link to="/breathe">breathe</Link>
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
