import { useState } from "react";
import { useLocation } from "react-router-dom";

function useEditState() {
  const location = useLocation();
  const state = location.state ?? {};
  const [isEditing, setIsEditing] = useState(!!state.id);
  const shouldNavigateBack =
    location.pathname.includes("edit") && !isEditing;

  return { isEditing, state, setIsEditing, shouldNavigateBack };
}

export default useEditState;
