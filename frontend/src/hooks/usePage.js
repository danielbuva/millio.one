import { PageContext } from "../components/BaseLayout";
import { useContext } from "react";

function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error(
      "BaseLayout.* component muse be rendered as a child of Tile component"
    );
  }
  return context;
}

export default usePage;
