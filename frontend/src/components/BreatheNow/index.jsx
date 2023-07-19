import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CirclePulse from "./CirclePulse";
import { PageWrapper } from "../ClientWrapper/Layout";

const actions = [
  "get comfortable",
  "inhale",
  "hold",
  "exhale",
  "hold",
  "inhale",
];

function BreatheNow() {
  const [finished, setFinished] = useState(false);
  const [action, setAction] = useState(0);
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    let intervalBell;
    const interval = setInterval(() => {
      if (state.intervalBell) {
        intervalBell = new Audio(`/${state.intervalBell}.mp3`);
        intervalBell.volume = state.volume;
        intervalBell.play();
      }
    }, 5000);
    if (finished) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      if (intervalBell) {
        intervalBell.pause();
      }
    };
  }, [state.intervalBell, state.volume, finished]);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setAction((s) => {
        if (s > 5) {
          clearInterval(interval);
        }
        return s + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout;
    if (state.duration) {
      timeout = setTimeout(() => {
        setFinished(true);
      }, state.duration);
    }
    return () => clearTimeout(timeout);
  }, [state.duration]);

  return (
    <PageWrapper
      onPageRight={() => {
        navigate("/journey");
      }}
    >
      <div
        style={{
          position: "relative",
          height: "75%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!finished ? (
          <>
            <CirclePulse />
            <h1 style={{ position: "absolute", bottom: "10%" }}>
              {actions[action]}
            </h1>
          </>
        ) : (
          <>
            <h1>good job!</h1>
            <p></p>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

export default BreatheNow;
