import { useState } from "react";
import { useLocation } from "react-router-dom";

function useEditState() {
  const location = useLocation();
  const state = location.state ?? {};
  const [isEditing, setIsEditing] = useState(!!state.id);

  return { isEditing, state, setIsEditing };
}

export default useEditState;
