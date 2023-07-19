import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../ClientWrapper/Layout";

import { useState } from "react";

import "./Breathe.css";

const fill = ["", "", "", "", ""];
const chimes = ["bell", "bowl", "chime", "wind"];

function Breathe() {
  const [breathsPerMinute, setBreathsPerMinute] = useState(5);
  const [minutes, setMinutes] = useState(3);
  const [intervalBell, setIntervalBell] = useState(chimes[1]);
  const [volume, setVolume] = useState(0.3);

  const navigate = useNavigate();

  const handlePageRight = () => {
    navigate("/breathe/now", {
      state: {
        intervalBell,
        duration: minutes * 60000 + 5000, // convert to ms add 5 seconds
        breathsPerMinute,
        volume,
      },
    });
  };

  return (
    <PageWrapper
      onPageLeft={() => navigate("/mood")}
      onPageRight={handlePageRight}
    >
      <h1>breathe.</h1>
      <div className="breathe-form-wrapper">
        <div className="page-container">
          <div className="breathe-form">
            <div className="breathe-form-group">
              <p>breaths per minute.</p>
              <div className="space-around">
                {fill.map((_, i) => (
                  <p
                    className={`dark pointer ${
                      i === breathsPerMinute - 3 ? "active" : ""
                    }`}
                    key={i}
                    onClick={() => setBreathsPerMinute(i + 3)}
                  >
                    {i + 3}
                  </p>
                ))}
              </div>
            </div>

            <div className="breathe-form-group">
              <p>chimes.</p>
              <div className="space-around">
                {chimes.map((c, i) => (
                  <p
                    key={c}
                    className={`dark pointer ${
                      i === chimes.indexOf(intervalBell) ? "active" : ""
                    }`}
                    onClick={() => {
                      const preview = new Audio(`/${c}.mp3`);
                      preview.volume = volume;
                      preview.play();
                      setIntervalBell(c);
                    }}
                  >
                    {c}
                  </p>
                ))}
              </div>
            </div>
            <div className="breathe-form-group">
              <p>volume</p>
              <input
                type="range"
                value={volume}
                onChange={(e) => setVolume(e.currentTarget.value)}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
            <div className="space-around">
              {fill.map((_, i) => (
                <p
                  className={`dark pointer ${
                    i === minutes - 1 ? "active" : ""
                  }`}
                  key={i}
                  onClick={() => setMinutes(i + 1)}
                >
                  {i + 1} min
                </p>
              ))}
            </div>
            <div className="breathe-form-group">
              <div className="row">
                <p>inhale through your nose </p>
                <p>5 sec</p>
              </div>
              <div className="row">
                <p>hold </p>
                <p>5 sec</p>
              </div>
              <div className="row">
                <p>exhale through your nose </p>
                <p>5 sec</p>
              </div>
              <div className="row">
                <p>hold </p>
                <p>5 sec</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Breathe;