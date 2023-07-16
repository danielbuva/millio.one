import { useLocation } from "react-router-dom";

function useEditState() {
  const location = useLocation();
  const state = location.state ?? {};
  const isEditing = !!state.id;

  return { isEditing, state };
}

export default useEditState;
