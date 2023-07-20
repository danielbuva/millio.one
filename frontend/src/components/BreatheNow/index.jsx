import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CirclePulse from "./CirclePulse";
import { NavBar, PageWrapper } from "../ClientWrapper/Layout";
import { useDispatch } from "react-redux";
import { createEntry } from "../../store/journey";

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
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState(0);
  const { state } = useLocation();
  const dispatch = useDispatch();

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
      intervalBell.pause();
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

  useEffect(() => {
    let interval;
    if (show) {
      interval = setInterval(() => {
        setShow(false);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [show]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!state) return null;

  const pace =
    +state.breathesPerMinute <= 1
      ? "slower"
      : +state.breathesPerMinute === 2
      ? "neutral"
      : "faster";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        cursor: show ? "default" : "none",
      }}
      onMouseMove={() => setShow(true)}
      onClick={() => {
        setShow(true);
      }}
    >
      <PageWrapper
        onPageLeft={() => {
          if (!show) {
            setShow(true);
          } else {
            navigate(-1);
          }
        }}
        onPageRight={() => {
          if (!show) {
            setShow(true);
          } else {
            navigate("/journey");
          }
        }}
        hide={!show}
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
        <NavBar
          middle={
            <button
              style={{ opacity: show && !finished ? 1 : 0 }}
              onClick={() => {
                dispatch(
                  createEntry(
                    {
                      duration:
                        duration > state.duration
                          ? state.duration
                          : duration,
                      pace,
                    },
                    "breathe"
                  )
                );
              }}
            >
              finish earlier
            </button>
          }
        />
      </PageWrapper>
    </div>
  );
}

export default BreatheNow;
