import { Link, useNavigate } from "react-router-dom";
import { readAvgMood } from "../../store/journey";
import { NavBar, PageWrapper } from "../ClientWrapper/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Tile from "./Tile";

import "./Mood.css";

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
      <div className="tiles">
        <Tile
          to="/mood/check-in"
          p1="mood"
          p2="check-in"
          p3="hi"
          src="Mood.png"
        />

        <Tile
          to="/breathe"
          p1="breathe"
          p2={`clear your mind, relax your body, and improve your focus`}
          src="Breathe.png"
        />
      </div>
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
