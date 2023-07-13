import useSessionUser from "../../hooks/useSessionUser";

import { PageWrapper } from "../Layout";
import { useNavigate } from "react-router-dom";

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
    </PageWrapper>
  );
}

export default Home;
