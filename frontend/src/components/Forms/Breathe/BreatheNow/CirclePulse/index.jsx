import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./CirclePulse.css";

function CirclePulse() {
  const halfClip = useRef(null);
  const innerHalfClip = useRef(null);
  const clipped = useRef(null);
  const innerClipped = useRef(null);
  const fix = useRef(null);
  const innerfix = useRef(null);
  const pulseRef = useRef(null);
  const containerRef = useRef(null);

  const { state } = useLocation();

  useEffect(() => {
    const current1 = halfClip.current;
    const current2 = clipped.current;
    const current3 = fix.current;
    const current4 = innerHalfClip.current;
    const current5 = innerClipped.current;
    const current6 = innerfix.current;
    const pulse = pulseRef.current;
    const container = containerRef.current;

    let interval1;
    let interval2;

    container.classList.add("no-border");
    pulse.classList.add("no-border");
    current4.classList.add("animate-d");
    current5.classList.add("animate-e");
    current6.classList.add("animate-f");

    const timeout1 = setTimeout(() => {
      container.classList.remove("no-border");
      pulse.classList.remove("no-border");
      pulse.classList.add("animate");
      current1.classList.add("animate-a");
      current2.classList.add("animate-b");
      current3.classList.add("animate-c");
      interval1 = setInterval(() => {
        current1.classList.add("animate-a");
        current2.classList.add("animate-b");
        current3.classList.add("animate-c");
      }, state.seconds * 4000);
    }, state.seconds * 1000);

    interval2 = setInterval(() => {
      current4.classList.add("half-clipped-inner", "animate-d");
      current5.classList.add(
        "half-circle-inner",
        "clipped-inner",
        "animate-e"
      );
      current6.classList.add(
        "half-circle-inner",
        "fixed-inner",
        "animate-f"
      );
    }, state.seconds * 4000);

    const handleAnimationEndOuter = () => {
      current1.classList.remove("animate-a");
      current2.classList.remove("animate-b");
      current3.classList.remove("animate-c");
    };
    const handleAnimationEndInner = () => {
      current4.classList.remove("animate-d");
      current5.classList.remove("animate-e");
      current6.classList.remove("animate-f");
    };

    current1.addEventListener("animationend", handleAnimationEndOuter);
    current4.addEventListener("animationend", handleAnimationEndInner);

    return () => {
      clearTimeout(timeout1);
      clearInterval(interval1);
      clearInterval(interval2);
      current1.removeEventListener(
        "animationend",
        handleAnimationEndOuter
      );
      current2.removeEventListener(
        "animationend",
        handleAnimationEndInner
      );
      current1.classList.remove("animate-a");
      current2.classList.remove("animate-b");
      current3.classList.remove("animate-c");
      current4.classList.remove("animate-d");
      current5.classList.remove("animate-e");
      current6.classList.remove("animate-f");
    };
  }, [state.seconds]);

  const time = state.seconds + "s";

  return (
    <div className="circle-container">
      <div ref={containerRef} className="circle-pulse-container">
        <div
          ref={pulseRef}
          className="circle-pulse"
          style={{ animationDuration: state.seconds * 4 + "s" }}
        />
      </div>

      <div className="trace-container-inner">
        <div
          ref={innerHalfClip}
          className="half-clipped-inner"
          style={{ animationDuration: time }}
        >
          <div
            ref={innerClipped}
            className="half-circle-inner clipped-inner"
            style={{
              animationDuration: state.seconds / 2 + "s",
            }}
          />
        </div>
        <div
          ref={innerfix}
          className="half-circle-inner fixed-inner"
          style={{ animationDuration: time }}
        />
      </div>

      <div className="trace-container">
        <div
          ref={halfClip}
          className="half-clipped"
          style={{ animationDuration: time, animationDelay: time }}
        >
          <div
            ref={clipped}
            className="half-circle clipped"
            style={{
              animationDuration: state.seconds / 2 + "s",
              animationDelay: time,
            }}
          />
        </div>
        <div
          ref={fix}
          className="half-circle fixed"
          style={{ animationDuration: time, animationDelay: time }}
        />
      </div>
    </div>
  );
}

export default CirclePulse;
