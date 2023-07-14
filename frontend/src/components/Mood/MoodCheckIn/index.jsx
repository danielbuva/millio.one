import { toCapitalCamelCase } from "../../../utils";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageWrapper } from "../../Layout";

import Feeling0 from "../../icons/Moods/Feeling0";
import Feeling1 from "../../icons/Moods/Feeling1";
import Feeling2 from "../../icons/Moods/Feeling2";
import Feeling3 from "../../icons/Moods/Feeling3";
import Feeling4 from "../../icons/Moods/Feeling4";

import Cleaning from "../../icons/origin/Cleaning";
import Creativity from "../../icons/origin/Creativity";
import Date from "../../icons/origin/Date";
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
import Relax from "../../icons/origin/Relax";
import SelfCare from "../../icons/origin/SelfCare";
import Spirituality from "../../icons/origin/Spirituality";
import TimeAlone from "../../icons/origin/TimeAlone";
import Travel from "../../icons/origin/Travel";
import Work from "../../icons/origin/Work";

import "./MoodCheckIn.css";

//@TODO fix page 1, it makes the arrows slightly smaller in width

function MoodCheckIn() {
  const [feeling, setFeeling] = useState(null);
  const [description, setDescription] = useState([]);
  const descRef = useRef(null);

  const [origin, setOrigin] = useState([]);
  const [prompt1, setPrompt1] = useState("");
  const [response, setResponse] = useState(null);

  const [pageIndex, setPageIndex] = useState(0);
  const disabledRight = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    const desc = descRef.current;
    if (pageIndex === 1 && desc) {
      switch (feeling) {
        case 1:
          desc.scrollTo(0, 424);
          break;
        case 2:
          desc.scrollTo(0, 944);
          break;
        case 3:
          desc.scrollTo(0, 1368);
          break;
        case 4:
          desc.scrollTo(0, 1740);
          break;
        default:
          desc.scrollTo(0, 0);
          return;
      }
    }
  }, [feeling, pageIndex]);

  const page1 = (
    <div>
      <h1>how are you feeling?</h1>
      <div className="selection">
        <Feeling0
          active={feeling === 0}
          onClick={() => {
            disabledRight.current = false;
            setFeeling(0);
          }}
        />
        <Feeling1
          active={feeling === 1}
          onClick={() => {
            disabledRight.current = false;
            setFeeling(1);
          }}
        />
        <Feeling2
          active={feeling === 2}
          onClick={() => {
            disabledRight.current = false;
            setFeeling(2);
          }}
        />
        <Feeling3
          active={feeling === 3}
          onClick={() => {
            disabledRight.current = false;
            setFeeling(3);
          }}
        />
        <Feeling4
          active={feeling === 4}
          onClick={() => {
            disabledRight.current = false;
            setFeeling(4);
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

      import(`./Responses/${toCapitalCamelCase(description)}`)
        .then((module) => {
          const Response = module.default;
          setResponse(<Response />);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

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

  const page2 = (
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
    Relax,
    Family,
    Friends,
    Date,
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

  const page3 = (
    <div id="origin">
      <h1>what's going on, what's making you feel {description[0]}?</h1>
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

  const page4 = (
    <div>
      <h1>
        Think how {origin[0]} is bringing the feeling of being{" "}
        {description[0]}
      </h1>
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

  const page5 = <div>{response}</div>;

  const page6 = (
    <div>
      <h1>would you like to do a breathing exercise?</h1>
      <p>no</p>
      <p>yes</p>
    </div>
  );

  const page7 = (
    <div>
      <h1>good job!</h1>
      <p>you completed a mood check-in</p>
    </div>
  );

  const pages = [page1, page2, page3, page4, page5, page6, page7];

  const handlePageRight = () => {
    if (pageIndex === 1 && descRef.current) {
      descRef.current.scrollTo(0, 0);
    }

    if (pageIndex < pages.length - 1) {
      setPageIndex((previousPage) => {
        return previousPage + 1;
      });
    } else {
      navigate("/journey");
    }

    switch (pageIndex) {
      case 0:
        console.log("entering0", description);
        if (description.length < 1) {
          console.log("entering1");
          disabledRight.current = true;
        }
        break;
      case 1:
        if (origin.length < 1) {
          disabledRight.current = true;
        }
        break;
      case 2:
        if (!prompt1) {
          disabledRight.current = true;
        }
        break;
      default:
        return;
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
      mood check in
      <div className="check-in-wrapper">
        <div className="page-container">{pages[pageIndex]}</div>
      </div>
    </PageWrapper>
  );
}

export default MoodCheckIn;
