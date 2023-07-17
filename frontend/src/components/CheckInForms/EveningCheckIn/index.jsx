import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { origins } from "../utils";

import CheckInForm, { Descriptions, Selection } from "../CheckInForm";

import YesNo from "../../icons/YesNo";

import { createEntry, updateEntry } from "../../../store/journey";

import useEditState from "../../../hooks/useEditState";

import "./EveningCheckIn.css";

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
    <Selection
      disabledRight={disabledRight}
      prompt={<h1>how well rested did you feel today?</h1>}
      setState={setRest}
      state={rest}
    />
  );

  const page2 = (
    <Selection
      disabledRight={disabledRight}
      prompt={
        <h1>
          how stressful was your day?
          <br />
          <span className="hidden">hi</span>
        </h1>
      }
      setState={setStress}
      state={stress}
    />
  );

  const page3 = (
    <Selection
      disabledRight={disabledRight}
      prompt={<h1>how productive did you feel today?</h1>}
      setState={setProductive}
      state={productive}
    />
  );

  const updateDescription = (e) => {
    setDescription((state) => {
      const description = e.target.innerText;
      if (description.length > 14) return state;

      if (state.includes(description)) {
        if (state.length === 1) {
          disabledRight.current = true;
        }
        return state.filter((s) => s !== description);
      }

      if (state.length < 1) {
        disabledRight.current = false;
      }

      return [...state, description];
    });
  };

  const page4 = (
    <Descriptions
      updateDescription={updateDescription}
      description={description}
    />
  );

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
                onClick={() => {
                  setOrigin((state) => {
                    if (name.length > 14) return state;
                    if (state.includes(name)) {
                      if (state.length === 1) {
                        disabledRight.current = true;
                      }
                      return state.filter((s) => s !== name);
                    }
                    if (state.length < 1) {
                      disabledRight.current = false;
                    }
                    return [...state, name];
                  });
                }}
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
          onYes={() => {
            setPrepared(true);
            disabledRight.current = false;
          }}
          onNo={() => {
            setPrepared(false);
            disabledRight.current = false;
          }}
        />
      </div>
    </div>
  );

  const pages = [page1, page2, page3, page4, page5, page6, page7, page8];

  const handlePageRight = () => {
    switch (pageIndex) {
      case 0:
        if (stress == null) {
          disabledRight.current = true;
        }
        break;
      case 1:
        if (productive == null) {
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
      case 4:
        if (prompt1.length < 1) {
          disabledRight.current = true;
        }
        break;
      case 5:
        if (prompt2.length < 1) {
          disabledRight.current = true;
        }
        break;
      case 6:
        if (prepared == null) {
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
    <CheckInForm
      handlePageLeft={handlePageLeft}
      handlePageRight={handlePageRight}
      disabledRight={disabledRight.current}
      page={pages[pageIndex]}
    />
  );
}

export default EveningCheckIn;
