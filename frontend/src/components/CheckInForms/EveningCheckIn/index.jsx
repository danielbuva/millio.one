import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import YesNo from "../../iconsw/YesNo";

import { createEntry, updateEntry } from "../../../store/journey";
import useEditState from "../../../hooks/useEditState";

import "./EveningCheckIn.css";

//@TODO fix page 1, it makes the arrows slightly smaller in width

function EveningCheckIn() {
  const { isEditing, state } = useEditState();

  const [rest, setRest] = useState(state.rest);
  const [stress, setStress] = useState(state.stress);
  const [productive, setProductive] = useState(state.productive);
  const [description, setDescription] = useState(state.description ?? []);
  const descRef = useRef(null);

  const [origin, setOrigin] = useState(state.origin ?? []);
  const [prompt1, setPrompt1] = useState(state.prompt1 ?? "");
  const [prompt2, setPrompt2] = useState(state.prompt2 ?? "");
  // const [response, setResponse] = useState(null);
  const [prepared, setPrepared] = useState(state.prepared);

  const [pageIndex, setPageIndex] = useState(0);
  const disabledRight = useRef(!isEditing);

  const [show, setShow] = useState();

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
      <h1>
        how stressful was your day?
        <br />
        <span className="hidden">hi</span>
      </h1>
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
          active={productive === 0}
          onClick={() => {
            disabledRight.current = false;
            setProductive(0);
          }}
        />
        <Level1
          active={productive === 1}
          onClick={() => {
            disabledRight.current = false;
            setProductive(1);
          }}
        />
        <Level2
          active={productive === 2}
          onClick={() => {
            disabledRight.current = false;
            setProductive(2);
          }}
        />
        <Level3
          active={productive === 3}
          onClick={() => {
            disabledRight.current = false;
            setProductive(3);
          }}
        />
        <Level4
          active={productive === 4}
          onClick={() => {
            disabledRight.current = false;
            setProductive(4);
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
    "disrespected",
    "embarrassed",
    "fearful",
    "frustrated",
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
      <h1 className="desc-options-header">
        how would you describe how you are feeling?
      </h1>
      <p className="select-up-to">select up to three</p>
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
      <h1>which of these might be influencing your feelings?</h1>
      <p className="select-up-to d">select up to three</p>
      <div id="origin-options">
        {origins.map((Option, i) => {
          let name = Option.name.toLowerCase();
          name =
            name === "selfcare"
              ? "self-care"
              : name === "timealone"
              ? "time alone"
              : name === "helpingothers"
              ? "helping others"
              : name;
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

  const page7 = (
    <div>
      <h1>generate prompt 2 here</h1>
      <textarea
        value={prompt2}
        placeholder="start writing..."
        onChange={(e) => {
          setPrompt2(e.currentTarget.value);
          if (prompt2.trim().length <= 1) {
            disabledRight.current = true;
          } else {
            disabledRight.current = false;
          }
        }}
      />
    </div>
  );

  useEffect(() => {
    let show;
    if (pageIndex === 7) {
      show = setTimeout(() => {
        setShow(true);
      }, 50);
    } else {
      setShow(false);
    }
    return () => clearTimeout(show);
  }, [pageIndex]);

  const page8 = (
    <div className="last-page">
      <h1>good job!</h1>
      <p>you completed your evening reflection.</p>
      <div className={`prepared-container ${show ? "show" : ""}`}>
        <p>do you feel prepared for your day?</p>

        <YesNo
          activeNo={prepared === false}
          activeYes={prepared === true}
          center
          onYes={() => setPrepared(true)}
          onNo={() => setPrepared(false)}
        />
      </div>
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
        if (!productive) {
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
      if (isEditing) {
        dispatch(
          updateEntry(
            {
              id: state.id,
              description,
              stress,
              rest,
              origin,
              prepared,
              productive,
              prompt1,
              prompt2,
            },
            "evening"
          )
        ).then(() => navigate(`/journey/evening/${state.id}`));
      } else {
        dispatch(
          createEntry(
            {
              createdAt,
              description,
              stress,
              rest,
              origin,
              prepared,
              productive,
              prompt1,
              prompt2,
            },
            "evening"
          )
        ).then(() => navigate("/journey"));
        navigate("/journey");
      }
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
