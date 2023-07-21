import useNavigateBack from "../../../hooks/useNavigateBack";
import { PageWrapper } from "../../ClientWrapper/Layout";
import { useNavigate } from "react-router-dom";

import { useRef, useState } from "react";

import "./Breathe.css";

const fill = ["", "", ""];
const chimes = ["none", "bell", "i", "bowl", "chime", "wind"];

function Breathe() {
  const [breathsPerMinute, setBreathsPerMinute] = useState(4);
  const [minutes, setMinutes] = useState(3);
  const [intervalBell, setIntervalBell] = useState(chimes[1]);
  const [volume, setVolume] = useState(0.3);
  const [space, setSpace] = useState(false);
  const currentSoundRef = useRef(null);

  const navigate = useNavigate();
  const navigateBack = useNavigateBack();

  const seconds =
    breathsPerMinute === 3 ? 5 : breathsPerMinute === 4 ? 4 : 3;

  const handlePageRight = () => {
    if (currentSoundRef.current) {
      currentSoundRef.current.pause();
      currentSoundRef.current.currentTime = 0;
    }
    navigate("/breathe/now", {
      state: {
        intervalBell,
        duration: minutes * 60000 + 5000, // convert to ms add 5 seconds
        breathsPerMinute,
        volume,
        seconds,
      },
    });
  };

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.volume = volume;
    audio.play().catch((err) => {
      console.error("Error while playing audio:", err);
    });
    currentSoundRef.current = audio;
  };

  return (
    <PageWrapper
      onPageLeft={() => navigateBack()}
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
                      i === breathsPerMinute - 3 ? "active-b" : ""
                    }`}
                    key={i}
                    onClick={() => setBreathsPerMinute(i + 3)}
                  >
                    {i + 3}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="breathe-form-group chimes"
              style={space ? { marginBottom: "70px" } : undefined}
            >
              <p>chimes.</p>
              <div className="space-around">
                {chimes.map((c, i) => (
                  <p
                    key={c}
                    className={`dark pointer ${
                      i === chimes.indexOf(intervalBell) ? "active-b" : ""
                    }`}
                    onClick={() => {
                      if (currentSoundRef.current) {
                        currentSoundRef.current.pause();
                        currentSoundRef.current.currentTime = 0;
                      }
                      setIntervalBell((bell) => {
                        if (c === bell) {
                          setSpace(false);
                          return "none";
                        }
                        if (c !== "none" && c !== "i") {
                          setSpace(false);
                          playSound(`/${c}.mp3`);
                        } else if (c === "i") {
                          setSpace(true);
                          playSound(`/gong.wav`);
                        } else {
                          setSpace(false);
                        }
                        return c;
                      });
                    }}
                    style={c === "i" ? { border: "none" } : undefined}
                  >
                    {c === "i" ? (
                      <>
                        {space && (
                          <span className="space-holder">
                            copper-plated aluminium, 26cm diameter, and
                            16cm deep singing bowl struck with a
                            felt-tipped mallet.
                          </span>
                        )}
                        <span className="bowl">
                          copper-plated aluminium, 26cm diameter, and 16cm
                          deep singing bowl struck with a felt-tipped
                          mallet.
                        </span>
                      </>
                    ) : (
                      c
                    )}
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
                    i === minutes - 1 ? "active-b" : ""
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
                <p>{seconds} sec</p>
              </div>
              <div className="row">
                <p>hold </p>
                <p>{seconds} sec</p>
              </div>
              <div className="row">
                <p>exhale through your nose </p>
                <p>{seconds} sec</p>
              </div>
              <div className="row">
                <p>hold </p>
                <p>{seconds} sec</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Breathe;
