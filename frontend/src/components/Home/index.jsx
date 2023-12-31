import useSessionUser from "../../hooks/useSessionUser";

import { NavBar, PageWrapper } from "../ClientWrapper/Layout";
import { Link, useNavigate } from "react-router-dom";

import CheckInTile from "./CheckInTile";

import "./Home.css";

function Home() {
  const user = useSessionUser();
  const navigate = useNavigate();

  if (!user) return null;

  const handlePageRight = () => navigate("/mood");
  const handlePageLeft = () => navigate("/journey");

  const time = new Date();
  let greeting;

  if (time.getHours() < 12) {
    // < 12pm
    greeting = "good morning";
  } else if (time.getHours() >= 12 && time.getHours() < 17) {
    // 12pm - 5pm
    greeting = "good afternoon";
  } else if (time.getHours() >= 17) {
    // > 5pm
    greeting = "good evening";
  }

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      <h1>
        {greeting}
        {user.email === "demo@user.io" ? "." : " " + user.name}
      </h1>
      <p className="home-date">
        {time.toLocaleDateString("en-us", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="divider" />
      <p className="reflections">DAILY REFLECTIONS</p>
      <div id="check-ins">
        <CheckInTile
          p1="morning"
          p2="preparation"
          p3="let's start your day"
          show={user.hasDayEntryToday < 1}
          src="Clouds.mp4"
        />
        <CheckInTile
          p1="evening"
          p2="reflection"
          p3="how was your day"
          show={user.hasNightEntryToday < 1}
          src="Sparkles.mp4"
        />
      </div>
      <NavBar
        left={
          <Link className="nav-link-active" replace>
            home
          </Link>
        }
        middle={
          <Link className="nav-link" to="/mood" replace>
            mood
          </Link>
        }
        right={
          <Link className="nav-link" to="/journey" replace>
            journey
          </Link>
        }
      />
    </PageWrapper>
  );
}

export default Home;
