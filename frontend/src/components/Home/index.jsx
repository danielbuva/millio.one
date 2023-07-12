import { PageWrapper } from "../Layout";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handlePageRight = () => navigate("/mood");
  const handlePageLeft = () => navigate("/journey");

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      homeeeeeeeee
    </PageWrapper>
  );
}

export default Home;
