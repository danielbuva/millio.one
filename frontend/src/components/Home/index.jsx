import useSessionUser from "../../hooks/useSessionUser";

import { NavBar, PageWrapper } from "../Layout";
import { Link, useNavigate } from "react-router-dom";

import CheckIn from "./CheckIn";

import "./Home.css";

function Home() {
  const user = useSessionUser();
  const navigate = useNavigate();

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
        {greeting} {user?.name}
      </h1>
      <p>{time.toDateString()}</p>
      <div id="check-ins">
        <CheckIn p1="morning" p2="preparation" p3="let's start your day" />
        <CheckIn p1="evening" p2="reflection" p3="how was your day" />
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
