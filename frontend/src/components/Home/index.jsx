import useSessionUser from "../../hooks/useSessionUser";

import { PageWrapper } from "../Layout";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSessionUser();
  const navigate = useNavigate();

  const handlePageRight = () => navigate("/mood");
  const handlePageLeft = () => navigate("/journey");

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      homeeeeeeeee
      {user?.name}
    </PageWrapper>
  );
}

export default Home;
