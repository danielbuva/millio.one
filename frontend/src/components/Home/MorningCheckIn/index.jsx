import { createEntry, updateEntry } from "../../../store/journey";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
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

import useEditState from "../../../hooks/useEditState";

import "./MorningCheckIn.css";

//@TODO fix page 1, it makes the arrows slightly smaller in width
//@TODO make db enums and origin names match or parse them to match

function MorningCheckIn() {
  const { isEditing, state } = useEditState();

  const [sleep, setSleep] = useState(state.sleep);
  const [motivation, setMotivation] = useState(state.motivation);
  const descRef = useRef(null);

  const [focus, setFocus] = useState(state.focus ?? []);
  const [prompt1, setPrompt1] = useState(state.prompt1 ?? "");
  const [prompt2, setPrompt2] = useState(state.prompt2 ?? "");
  // const [response, setResponse] = useState(null);
  // const [prepared, setPrepared] = useState(null);

  const [pageIndex, setPageIndex] = useState(0);
  const disabledRight = useRef(!isEditing);

  const createdAt = new Date();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page1 = (
    <div>
      <h1>how was your sleep?</h1>
      <div className="selection">
        <Level0
          active={sleep === 0}
          onClick={() => {
            disabledRight.current = false;
            setSleep(0);
          }}
        />
        <Level1
          active={sleep === 1}
          onClick={() => {
            disabledRight.current = false;
            setSleep(1);
          }}
        />
        <Level2
          active={sleep === 2}
          onClick={() => {
            disabledRight.current = false;
            setSleep(2);
          }}
        />
        <Level3
          active={sleep === 3}
          onClick={() => {
            disabledRight.current = false;
            setSleep(3);
          }}
        />
        <Level4
          active={sleep === 4}
          onClick={() => {
            disabledRight.current = false;
            setSleep(4);
          }}
        />
      </div>
    </div>
  );

  const page2 = (
    <div>
      <h1>how motivated are you feeling?</h1>
      <div className="selection">
        <Level0
          active={motivation === 0}
          onClick={() => {
            disabledRight.current = false;
            setMotivation(0);
          }}
        />
        <Level1
          active={motivation === 1}
          onClick={() => {
            disabledRight.current = false;
            setMotivation(1);
          }}
        />
        <Level2
          active={motivation === 2}
          onClick={() => {
            disabledRight.current = false;
            setMotivation(2);
          }}
        />
        <Level3
          active={motivation === 3}
          onClick={() => {
            disabledRight.current = false;
            setMotivation(3);
          }}
        />
        <Level4
          active={motivation === 4}
          onClick={() => {
            disabledRight.current = false;
            setMotivation(4);
          }}
        />
      </div>
    </div>
  );

  const foci = [
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

  const page3 = (
    <div id="origin">
      <h1>what's your main focus for today?</h1>
      <div id="origin-options">
        {foci.map((Option, i) => {
          const name = Option.name.toLowerCase();
          return (
            <div className="origin-option" key={i}>
              <Option
                active={focus.includes(name)}
                onClick={() =>
                  setFocus((state) => {
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

  const page5 = (
    <div>
      <h1>generate promps here</h1>
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

  const page6 = (
    <div>
      <h1>good job!</h1>
      <p>you completed your morning preparation</p>
    </div>
  );

  const pages = [page1, page2, page3, page4, page5, page6];

  const handlePageRight = () => {
    switch (pageIndex) {
      case 0:
        if (motivation == null) {
          disabledRight.current = true;
        }
        break;
      case 1:
        if (focus.length < 1) {
          disabledRight.current = true;
        }
        break;
      case 2:
        if (focus.length < 1) {
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
              origin: focus,
              motivation,
              prepared: false,
              prompt1,
              prompt2,
              sleep,
            },
            "morning"
          )
        );
        // ).then(() => navigate(`/journey/morning/${state.id}`));
        navigate(`/journey/morning/${state.id}`);
      } else {
        dispatch(
          createEntry(
            {
              createdAt,
              origin: focus,
              motivation,
              prepared: false,
              prompt1,
              prompt2,
              sleep,
            },
            "morning"
          )
        ).then(() => navigate("/journey"));
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

export default MorningCheckIn;
