import { useLocation, useNavigate } from "react-router-dom";
import { createEntry } from "../../../../store/journey";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavBar, PageWrapper } from "../../../ClientWrapper/Layout";
import Windmill from "../../../icons/Entry/Windmill";
import CirclePulse from "./CirclePulse";
import Timer from "../../../icons/Entry/Timer";
import { setShow } from "../../../../store/layout";

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
  const [duration, setDuration] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const show = useSelector((s) => s.layout.show);

  const navigate = useNavigate();

  const submit = () => {
    if (duration > 20 && !submitted) {
      dispatch(
        createEntry(
          {
            duration,
            pace: +state?.breathsPerMinute,
          },
          "breathe"
        )
      ).then(() => {
        setSubmitted(true);
        setFinished(true);
      });
    }
  };

  useEffect(() => {
    let intervalBell;
    const interval = setInterval(() => {
      if (state?.intervalBell === "i") {
        intervalBell = new Audio(`/gong.wav`);
        intervalBell.volume = state.volume;
        intervalBell.play();
      } else if (state?.intervalBell && state?.intervalBell !== "none") {
        intervalBell = new Audio(`/${state.intervalBell}.mp3`);
        intervalBell.volume = state.volume;
        intervalBell.play();
      }
    }, state?.seconds * 1000);
    if (finished) {
      clearInterval(interval);
      submit();
    }
    return () => {
      clearInterval(interval);
      if (intervalBell) {
        intervalBell.pause();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state?.intervalBell,
    state?.volume,
    finished,
    state?.seconds,
    dispatch,
  ]);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setAction((s) => {
        if (s > 5) {
          clearInterval(interval);
        }
        return s + 1;
      });
    }, state?.seconds * 1000);

    return () => clearInterval(interval);
  }, [state?.seconds]);

  useEffect(() => {
    let timeout;
    if (state?.duration) {
      timeout = setTimeout(() => {
        setFinished(true);
      }, state?.duration);
    }
    return () => clearTimeout(timeout);
  }, [state?.duration]);

  useEffect(() => {
    let interval;
    if (show) {
      interval = setInterval(() => {
        dispatch(setShow(false));
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dispatch, show]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((s) => s + 1);
    }, 1000);

    if (finished) clearInterval(interval);

    return () => clearInterval(interval);
  }, [finished]);

  if (!state) return navigate("/breathe");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
      onMouseMove={() => dispatch(setShow(true))}
      onClick={() => dispatch(setShow(true))}
    >
      <PageWrapper
        onPageLeft={() => {
          if (!show) {
            dispatch(setShow(true));
          } else {
            if (duration < 20 || finished) {
              navigate("/breathe");
            } else {
              setFinished(true);
            }
          }
        }}
        onPageRight={() => {
          if (!show) {
            dispatch(setShow(true));
          } else {
            if (duration < 20) {
              navigate("/journey");
            } else {
              setFinished(true);
            }
            if (finished && submitted) {
              navigate("/journey");
            }
          }
        }}
        hideLeft={!show && !finished}
        hideRight={!show && !finished}
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
            <div className="breaths-good-job">
              <h1>good job!</h1>
              <div className="stat-cards">
                <div className="stat-card">
                  <Windmill boxSize="25" />{" "}
                  {Math.ceil(
                    state.breathsPerMinute * (duration / 60).toFixed(2)
                  )}
                  &nbsp; breaths
                </div>
                <div className="stat-card timer">
                  <Timer />
                  {secondsToMinutesAndSeconds(duration)}
                </div>
              </div>
            </div>
          )}
        </div>
        <NavBar
          middle={
            <button
              style={{ opacity: show && !finished ? 1 : 0 }}
              onClick={() => {
                setFinished(true);
                if (duration < 20) {
                  navigate("/breathe");
                }
              }}
              disabled={finished}
            >
              finish earlier
            </button>
          }
        />
      </PageWrapper>
    </div>
  );
}

function secondsToMinutesAndSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default BreatheNow;
