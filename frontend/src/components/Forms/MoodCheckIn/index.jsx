import { createEntry, updateEntry } from "../../../store/journey";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { origins } from "../utils";

import CheckInForm, { Descriptions, Selection } from "../CheckInForm";
import YesNo from "../../icons/YesNo";

import useEditState from "../../../hooks/useEditState";
import { csrfFetch } from "../../../store/utils";

import "./MoodCheckIn.css";

function MoodCheckIn() {
  let { isEditing, state } = useEditState();

  const [feeling, setFeeling] = useState(state.feeling);
  const [description, setDescription] = useState(state.description ?? []);
  const descRef = useRef(null);

  const [origin, setOrigin] = useState(state.origin ?? []);
  const [tyPrompt, setTyPrompt] = useState("");
  const [prompt1, setPrompt1] = useState(state.prompt1 ?? "");
  const [prompt2, setPrompt2] = useState(state.prompt2 ?? "");
  const [response, setResponse] = useState(null);

  const [pageIndex, setPageIndex] = useState(0);
  const disabledRight = useRef(!isEditing);
  const promptNum = useRef(Math.floor(Math.random() * 8));

  const createdAt = new Date();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Selection
      disabledRight={disabledRight}
      prompt={<h1>how are you feeling?</h1>}
      setState={setFeeling}
      state={feeling}
      type="emotion"
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
      if (state.length === 3) return state;

      if (state.length < 1) {
        disabledRight.current = false;
      }

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

  const page2 = (
    <Descriptions
      updateDescription={updateDescription}
      description={description}
      descRef={descRef}
    />
  );

  const page3 = (
    <div id="origin">
      <h1>
        what's going on, what's making you feel{" "}
        {mapMultipleWords(description)}?
      </h1>
      <p className="select-up-to d">select up to three</p>
      <div id="origin-options">
        {origins.map(({ Icon, name }, i) => {
          return (
            <div className="origin-option" key={i}>
              <Icon
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
      <h1>
        Think how {mapMultipleWords(origin)} is bringing the feeling of
        being {mapMultipleWords(description)}
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
      <p style={prompt1ErrorStyle}>{prompt1.length}/600</p>
    </div>
  );

  const page5 = <div>{response}</div>;

  const prompt2HasError = prompt2.length > 600;

  const prompt2ErrorStyle = prompt2HasError
    ? { color: "#f4212e" }
    : prompt2.length >= 550
    ? { color: "#ffffff" }
    : { opacity: 0 };

  const page6 = (
    <div>
      <h1>{state.tyPrompt ?? tyPrompt}</h1>
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

  const page7 = (
    <div>
      <h1>good job!</h1>
      <p>you completed a mood check-in</p>
    </div>
  );

  const page8 = (
    <div className="breathe-question">
      <h1 className="question-header">
        would you like to do a breathing exercise?
      </h1>
      <YesNo
        center
        onYes={() => {
          navigate("/breathe");
          disabledRight.current = false;
        }}
        onNo={() => {
          navigate("/journey");
          disabledRight.current = false;
        }}
      />
    </div>
  );

  const pages = [page1, page2, page3, page4, page5, page6, page7, page8];

  const handlePageRight = async () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex((previousPage) => {
        return previousPage + 1;
      });
    }

    switch (pageIndex) {
      case 0:
        if (description.length < 1) {
          disabledRight.current = true;
        }
        break;
      case 1:
        if (descRef.current) {
          descRef.current.scrollTo(0, 0);
        }
        if (origin.length < 1) {
          disabledRight.current = true;
        }
        import(
          `./Responses/${toCapitalCamelCase(
            description[description.length - 1]
          )}`
        )
          .then((module) => {
            const Response = module.default;
            setResponse(<Response />);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        break;
      case 2:
        if (!prompt1 && !prompt1HasError) {
          disabledRight.current = true;
        }
        setTyPrompt(
          await (
            await csrfFetch(`/api/journey/typrompt/${promptNum.current}`)
          ).json()
        );

        break;
      case 4:
        if (!prompt2 && !prompt2HasError) {
          disabledRight.current = true;
        }
        break;
      case 5:
        if (isEditing) {
          dispatch(
            updateEntry(
              {
                id: state.id,
                description,
                feeling,
                origin,
                prompt1,
                prompt2,
              },
              "mood"
            )
          );
          navigate(`/journey/mood/${state.id}`);
        } else {
          dispatch(
            createEntry(
              {
                createdAt,
                description,
                feeling,
                origin,
                prompt1,
                prompt2,
                tyPrompt: promptNum.current,
              },
              "mood"
            )
          );
        }
        break;
      case pages.length - 1:
        navigate("/journey");
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
    if (pageIndex === 5) {
      isEditing = true;
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
        (pageIndex === 5 && prompt2HasError)
      }
      page={pages[pageIndex]}
    />
  );
}

function toCapitalCamelCase(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Return the input as is if it's not a non-empty string
  }

  const words = str.split(" ");

  const capitalCamelCased = words
    .map((word) => {
      const capitalized =
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return capitalized;
    })
    .join("");

  return capitalCamelCased;
}

function mapMultipleWords(wordArray) {
  return wordArray.map((word, i) => {
    let conjuction;
    switch (wordArray.length) {
      case 1:
        conjuction = "";
        break;
      case 2:
        conjuction = i === 0 ? "" : " and ";
        break;
      case 3:
        conjuction = i === 0 ? "" : i === 2 ? ", and " : ", ";
        break;
      default:
        conjuction = "";
        break;
    }
    return (
      <span key={i + word}>
        {conjuction}
        {word}
      </span>
    );
  });
}

export default MoodCheckIn;
