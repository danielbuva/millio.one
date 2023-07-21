import { useNavigate } from "react-router-dom";

export default function useNavigateBack() {
  const navigate = useNavigate();
  return () => {
    window.getSelection().empty();
    if (!sessionStorage.getItem("hasVisited")) {
      sessionStorage.setItem("hasVisited", "true");
      navigate("/home");
    } else {
      navigate(-1);
    }
  };
}
