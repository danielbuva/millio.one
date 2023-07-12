import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../Layout";

function Journey() {
  const navigate = useNavigate();

  const handlePageRight = () => navigate("/home");
  const handlePageLeft = () => navigate("/mood");

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      journey
    </PageWrapper>
  );
}

export default Journey;
