import { toCapitalCamelCase } from "../../../utils";

import { createEntry, updateEntry } from "../../../store/journey";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { origins } from "../utils";

import CheckInForm, { Descriptions, Selection } from "../CheckInForm";

import useEditState from "../../../hooks/useEditState";

import "./MoodCheckIn.css";

function MoodCheckIn() {
  const { isEditing, state } = useEditState();

  const [feeling, setFeeling] = useState(state.feeling);
  const [description, setDescription] = useState(state.description ?? []);
  const descRef = useRef(null);

  const [origin, setOrigin] = useState(state.origin ?? []);
  const [prompt1, setPrompt1] = useState(state.prompt1 ?? "");
  const [response, setResponse] = useState(null);

  const [pageIndex, setPageIndex] = useState(0);
  const disabledRight = useRef(!isEditing);

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
      <h1>what's going on, what's making you feel {description[0]}?</h1>
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
      if (isEditing) {
        dispatch(
          updateEntry(
            {
              id: state.id,
              description,
              feeling,
              origin,
              prompt1,
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
            },
            "mood"
          )
        ).then(() => navigate("/journey"));
      }
    }

    switch (pageIndex) {
      case 0:
        if (description.length < 1) {
          disabledRight.current = true;
        }
        break;
      case 1:
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
    <CheckInForm
      handlePageLeft={handlePageLeft}
      handlePageRight={handlePageRight}
      disabledRight={disabledRight.current}
      page={pages[pageIndex]}
    />
  );
}

export default MoodCheckIn;
