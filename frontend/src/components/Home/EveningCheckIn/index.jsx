import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PageWrapper } from "../../Layout";

import Level0 from "../../icons/Levels/Level0";
import Level1 from "../../icons/Levels/Level1";
import Level2 from "../../icons/Levels/Level2";
import Level3 from "../../icons/Levels/Level3";
import Level4 from "../../icons/Levels/Level4";

import Cleaning from "../../icons/origin/Cleaning";
import Creativity from "../../icons/origin/Creativity";
import Dating from "../../icons/origin/Dating";
import Family from "../../icons/origin/Family";
import Friends from "../../icons/origin/Friends";
import Fitness from "../../icons/origin/Fitness";
import Eating from "../../icons/origin/Eating";
import Health from "../../icons/origin/Health";
import HelpingOthers from "../../icons/origin/HelpingOthers";
import Music from "../../icons/origin/Music";
import Nature from "../../icons/origin/Nature";
import Partner from "../../icons/origin/Partner";
import Party from "../../icons/origin/Party";
import Pet from "../../icons/origin/Pet";
import Relaxing from "../../icons/origin/Relaxing";
import SelfCare from "../../icons/origin/SelfCare";
import Spirituality from "../../icons/origin/Spirituality";
import TimeAlone from "../../icons/origin/TimeAlone";
import Travel from "../../icons/origin/Travel";
import Work from "../../icons/origin/Work";

import "./EveningCheckIn.css";
import { createEntry } from "../../../store/joruney";

//@TODO fix page 1, it makes the arrows slightly smaller in width
//@TODO make db enums and origin names match or parse them to match

function EveningCheckIn() {
  const [rest, setRest] = useState(null);
  const [stress, setStress] = useState(null);
  const [productivity, setProductivity] = useState(null);
  const [description, setDescription] = useState([]);
  const descRef = useRef(null);

  const [origin, setOrigin] = useState([]);
  const [prompt1, setPrompt1] = useState("");
  const [summary, setSummary] = useState("");
  // const [response, setResponse] = useState(null);
  // const [prepared, setPrepared] = useState(null);

  const [pageIndex, setPageIndex] = useState(0);
  const disabledRight = useRef(true);

  const createdAt = new Date();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page1 = (
    <div>
      <h1>how well rested did you feel today?</h1>
      <div className="selection">
        <Level0
          active={rest === 0}
          onClick={() => {
            disabledRight.current = false;
            setRest(0);
            setRest(0);
            setRest(0);
          }}
        />
        <Level1
          active={rest === 1}
          onClick={() => {
            disabledRight.current = false;
            setRest(1);
            setRest(1);
            setRest(1);
          }}
        />
        <Level2
          active={rest === 2}
          onClick={() => {
            disabledRight.current = false;
            setRest(2);
            setRest(2);
            setRest(2);
          }}
        />
        <Level3
          active={rest === 3}
          onClick={() => {
            disabledRight.current = false;
            setRest(3);
            setRest(3);
            setRest(3);
          }}
        />
        <Level4
          active={rest === 4}
          onClick={() => {
            disabledRight.current = false;
            setRest(4);
            setRest(4);
            setRest(4);
          }}
        />
      </div>
    </div>
  );

  const page2 = (
    <div>
      <h1>how stressful was your day?</h1>
      <div className="selection">
        <Level0
          active={stress === 0}
          onClick={() => {
            disabledRight.current = false;
            setStress(0);
          }}
        />
        <Level1
          active={stress === 1}
          onClick={() => {
            disabledRight.current = false;
            setStress(1);
          }}
        />
        <Level2
          active={stress === 2}
          onClick={() => {
            disabledRight.current = false;
            setStress(2);
          }}
        />
        <Level3
          active={stress === 3}
          onClick={() => {
            disabledRight.current = false;
            setStress(3);
          }}
        />
        <Level4
          active={stress === 4}
          onClick={() => {
            disabledRight.current = false;
            setStress(4);
          }}
        />
      </div>
    </div>
  );

  const page3 = (
    <div>
      <h1>how productive did you feel today?</h1>
      <div className="selection">
        <Level0
          active={productivity === 0}
          onClick={() => {
            disabledRight.current = false;
            setProductivity(0);
          }}
        />
        <Level1
          active={productivity === 1}
          onClick={() => {
            disabledRight.current = false;
            setProductivity(1);
          }}
        />
        <Level2
          active={productivity === 2}
          onClick={() => {
            disabledRight.current = false;
            setProductivity(2);
          }}
        />
        <Level3
          active={productivity === 3}
          onClick={() => {
            disabledRight.current = false;
            setProductivity(3);
          }}
        />
        <Level4
          active={productivity === 4}
          onClick={() => {
            disabledRight.current = false;
            setProductivity(4);
          }}
        />
      </div>
    </div>
  );

  const updateDescription = (e) => {
    setDescription((state) => {
      const description = e.target.innerText;
      if (description.length > 14) return state;

      if (state.includes(description)) {
        disabledRight.current = true;
        return state.filter((s) => s !== description);
      }

      disabledRight.current = false;

      return [...state, description];
    });
  };

  const desc0Options = [
    "angry",
    "anxious",
    "despairful",
    "disgusted",
    "disrespectful",
    "embarrassed",
    "fearful",
    "grieved",
    "rejected",
    "shameful",
  ];

  const desc1Options = [
    "annoyed",
    "guilty",
    "insecure",
    "jealous",
    "let down",
    "lonely",
    "nervous",
    "overwhelmed",
    "pessimistic",
    "sad",
    "shocked",
    "unfulfilled",
    "unmotivated",
    "weak",
    "worried",
  ];

  const desc2Options = [
    "awkward",
    "bored",
    "busy",
    "confused",
    "critiqued",
    "desire",
    "distracted",
    "impatient",
    "suspicious",
    "tired",
    "unsure",
  ];

  const desc3Options = [
    "appreciated",
    "calm",
    "comfortable",
    "curious",
    "grateful",
    "inspired",
    "motivated",
    "nostalgic",
    "optimistic",
    "relieved",
    "satisfied",
    "surprised",
  ];

  const desc4Options = [
    "brave",
    "confident",
    "creative",
    "excited",
    "free",
    "happy",
    "love",
    "proud",
    "respected",
  ];

  const page4 = (
    <div>
      <h1>how would you describe how you are feeling?</h1>
      <div
        className="desc-options"
        onClick={updateDescription}
        ref={descRef}
      >
        <div className="desc-container">
          {desc0Options.map((option) => {
            const active = description.includes(option);
            return (
              <p
                key={option}
                style={{
                  color: active ? "#000" : "#fff",
                  backgroundColor: active ? "#fff" : "#000",
                }}
                className="desc-option"
              >
                {option}
              </p>
            );
          })}
        </div>
        <div className="desc-container">
          {desc1Options.map((option) => {
            const active = description.includes(option);
            return (
              <p
                key={option}
                style={{
                  color: active ? "#000" : "#fff",
                  backgroundColor: active ? "#fff" : "#000",
                }}
                className="desc-option"
              >
                {option}
              </p>
            );
          })}
        </div>
        <div className="desc-container">
          {desc2Options.map((option) => {
            const active = description.includes(option);
            return (
              <p
                key={option}
                style={{
                  color: active ? "#000" : "#fff",
                  backgroundColor: active ? "#fff" : "#000",
                }}
                className="desc-option"
              >
                {option}
              </p>
            );
          })}
        </div>
        <div className="desc-container">
          {desc3Options.map((option) => {
            const active = description.includes(option);
            return (
              <p
                key={option}
                style={{
                  color: active ? "#000" : "#fff",
                  backgroundColor: active ? "#fff" : "#000",
                }}
                className="desc-option"
              >
                {option}
              </p>
            );
          })}
        </div>
        <div className="desc-container" id="last">
          {desc4Options.map((option) => {
            const active = description.includes(option);
            return (
              <p
                key={option}
                style={{
                  color: active ? "#000" : "#fff",
                  backgroundColor: active ? "#fff" : "#000",
                }}
                className="desc-option"
              >
                {option}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );

  const origins = [
    Work,
    Relaxing,
    Family,
    Friends,
    Dating,
    Pet,
    Fitness,
    SelfCare,
    Partner,
    Travel,
    Nature,
    Party,
    Music,
    Eating,
    Cleaning,
    Creativity,
    Spirituality,
    TimeAlone,
    HelpingOthers,
    Health,
  ];

  const page5 = (
    <div id="origin">
      <h1>which of these things is influencing your feelings today?</h1>
      <div id="origin-options">
        {origins.map((Option, i) => {
          const name = Option.name.toLowerCase();
          return (
            <div className="origin-option" key={i}>
              <Option
                active={origin.includes(name)}
                onClick={() =>
                  setOrigin((state) => {
                    if (name.length > 14) return state;
                    if (state.includes(name)) {
                      disabledRight.current = true;
                      return state.filter((s) => s !== name);
                    }
                    disabledRight.current = false;
                    return [...state, name];
                  })
                }
              />
              <p className="origin-name">{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const page6 = (
    <div>
      <h1>summarize your day.</h1>
      <textarea
        value={summary}
        placeholder="start writing..."
        onChange={(e) => {
          setSummary(e.currentTarget.value);
          if (prompt1.trim().length <= 1) {
            disabledRight.current = true;
          } else {
            disabledRight.current = false;
          }
        }}
      />
    </div>
  );

  const page7 = (
    <div>
      <h1>generate promps here</h1>
      <textarea
        value={prompt1}
        placeholder="start writing..."
        onChange={(e) => {
          setPrompt1(e.currentTarget.value);
          if (prompt1.trim().length <= 1) {
            disabledRight.current = true;
          } else {
            disabledRight.current = false;
          }
        }}
      />
    </div>
  );

  const page8 = (
    <div>
      <h1>good job!</h1>
      <p>you completed your evening reflection</p>
    </div>
  );

  const pages = [page1, page2, page3, page4, page5, page6, page7, page8];

  const handlePageRight = () => {
    switch (pageIndex) {
      case 0:
        if (!stress) {
          disabledRight.current = true;
        }
        break;
      case 1:
        if (!productivity) {
          disabledRight.current = true;
        }
        break;
      case 2:
        if (description.length < 1) {
          disabledRight.current = true;
        }
        break;
      case 3:
        if (origin.length < 1) {
          disabledRight.current = true;
        }
        break;
      default:
        break;
    }

    if (pageIndex === 1 && descRef.current) {
      descRef.current.scrollTo(0, 0);
    }

    if (pageIndex < pages.length - 1) {
      setPageIndex((previousPage) => {
        return previousPage + 1;
      });
    } else {
      dispatch(
        createEntry(
          {
            prompt1,
            createdAt,
            stress,
            rest,
            origin,
            // prepared,
          },
          "night"
        )
      ).then(() => navigate("/journey"));
      navigate("/journey");
    }
  };

  const handlePageLeft = () => {
    if (pageIndex > 0) {
      setPageIndex((previousPage) => {
        return previousPage - 1;
      });
    } else {
      navigate(-1);
    }
    disabledRight.current = false;
  };

  return (
    <PageWrapper
      onPageLeft={handlePageLeft}
      onPageRight={handlePageRight}
      disabledRight={disabledRight.current}
    >
      <div className="check-in-wrapper">
        <div className="page-container">{pages[pageIndex]}</div>
      </div>
    </PageWrapper>
  );
}

export default EveningCheckIn;