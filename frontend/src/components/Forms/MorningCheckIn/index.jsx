import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createEntry, updateEntry } from "../../../store/journey";
import { csrfFetch } from "../../../store/utils";

import { origins } from "../utils";

import CheckInForm, { Selection } from "../CheckInForm";
import YesNo from "../../icons/YesNo";

import useNavigateBack from "../../../hooks/useNavigateBack";
import useEditState from "../../../hooks/useEditState";

import "./MorningCheckIn.css";

function MorningCheckIn() {
  const { isEditing, state } = useEditState();

  const [sleep, setSleep] = useState(state.sleep);
  const [motivation, setMotivation] = useState(state.motivation);
  const descRef = useRef(null);

  const [focus, setFocus] = useState(state.focus ?? []);
  const [prompt, setPrompt] = useState("");
  const [typrompt, setTyprompt] = useState("");
  const [prompt1, setPrompt1] = useState(state.prompt1 ?? "");
  const [prompt2, setPrompt2] = useState(state.prompt2 ?? "");
  const [prepared, setPrepared] = useState(state.prepared);

  const [pageIndex, setPageIndex] = useState(0);
  const disabledRight = useRef(!isEditing);

  const [show, setShow] = useState();

  const createdAt = new Date();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateBack = useNavigateBack();

  const promptNum = useRef(Math.floor(Math.random() * 8));

  const page1 = (
    <Selection
      disabledRight={disabledRight}
      prompt={
        <h1>
          how was your sleep? <br />
          <span className="hidden">hi</span>
        </h1>
      }
      setState={setSleep}
      state={sleep}
    />
  );

  const page2 = (
    <Selection
      disabledRight={disabledRight}
      prompt={
        <h1>
          how motivated are you? <br />
          <span className="hidden">hi</span>
        </h1>
      }
      setState={setMotivation}
      state={motivation}
    />
  );

  const page3 = (
    <div id="origin">
      <h1>what's today's main focus?</h1>
      <p className="select-up-to d">select up to three</p>
      <div id="origin-options">
        {origins.map(({ Icon, name }, i) => {
          return (
            <div className="origin-option" key={i}>
              <Icon
                active={focus.includes(name)}
                onClick={() => {
                  setFocus((state) => {
                    if (name.length > 14) return state;
                    if (state.includes(name)) {
                      if (state.length === 1) {
                        disabledRight.current = true;
                      }
                      return state.filter((s) => s !== name);
                    }
                    if (state.length === 3) return state;
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

  const prompt1HasError = prompt1.length > 600;

  const prompt1ErrorStyle = prompt1HasError
    ? { color: "#f4212e" }
    : prompt1.length >= 550
    ? { color: "#ffffff" }
    : { opacity: 0 };

  const page4 = (
    <div>
      <h1>{prompt}</h1>
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
      <p style={prompt1ErrorStyle}>{prompt1.length}/600</p>
    </div>
  );

  const prompt2HasError = prompt2.length > 600;

  const prompt2ErrorStyle = prompt2HasError
    ? { color: "#f4212e" }
    : prompt2.length >= 550
    ? { color: "#ffffff" }
    : { opacity: 0 };

  const page5 = (
    <div>
      <h1>{state.tyPrompt ?? typrompt}</h1>
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
      <p style={prompt2ErrorStyle}>{prompt2.length}/600</p>
    </div>
  );

  useEffect(() => {
    let show;
    if (pageIndex === 5) {
      show = setTimeout(() => {
        setShow(true);
      }, 50);
    } else {
      setShow(false);
    }
    return () => clearTimeout(show);
  }, [pageIndex]);

  const page6 = (
    <div className="last-page">
      <h1>good job!</h1>
      <p>you completed your morning preparation.</p>
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

  const pages = [page1, page2, page3, page4, page5, page6];

  const handlePageRight = async () => {
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
        if (prompt1.length < 1 && !prompt1HasError) {
          disabledRight.current = true;
        }
        setPrompt(
          await (
            await csrfFetch(
              `/api/journey/prompt/${focus[focus.length - 1]}/0`
            )
          ).json()
        );
        break;
      case 3:
        if (prompt2.length < 1 && !prompt2HasError) {
          disabledRight.current = true;
        }
        setTyprompt(
          await (
            await csrfFetch(`/api/journey/typrompt/${promptNum.current}`)
          ).json()
        );
        break;
      case 4:
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
              origin: focus,
              motivation,
              prepared,
              prompt1,
              prompt2,
              sleep,
            },
            "morning"
          )
        );
        navigate(`/journey/morning/${state.id}`);
      } else {
        dispatch(
          createEntry(
            {
              createdAt,
              origin: focus,
              motivation,
              prepared,
              prompt1,
              prompt2,
              sleep,
              tyPrompt: promptNum.current,
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
      navigateBack();
    }
    disabledRight.current = false;
  };

  return (
    <CheckInForm
      handlePageLeft={handlePageLeft}
      handlePageRight={handlePageRight}
      disabledRight={
        disabledRight.current ||
        (pageIndex === 3 && prompt1HasError) ||
        (pageIndex === 4 && prompt2HasError)
      }
      page={pages[pageIndex]}
    />
  );
}

export default MorningCheckIn;
