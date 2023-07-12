import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../Layout";

function Mood() {
  const navigate = useNavigate();

  const handlePageRight = () => navigate("/journey");
  const handlePageLeft = () => navigate("/home");

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      mood
    </PageWrapper>
  );
}

export default Mood;
