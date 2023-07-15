import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { restoreUser } from "../store/session";

export default function useIsValidated() {
  const [useIsValidated, setIsValidated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsValidated(true));
  }, [dispatch]);

  return useIsValidated;
}
