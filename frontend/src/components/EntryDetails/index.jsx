import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { deleteEntry, getEntry, readEntries } from "../../store/journey";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { time } from "../../utils";

import { NavBar, PageWrapper } from "../Layout";

import YesNo from "../icons/YesNo";

import "./EntryDetails.css";

function EntryDetails() {
  const [show, setShow] = useState();
  const entry = useSelector((s) => s.journey.entry);
  const days = useSelector((s) => s.journey.entries);
  const { id, type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntry(id, type));
    dispatch(readEntries());
  }, [dispatch, id, type]);

  const navigate = useNavigate();
  const location = useLocation();

  if (entry.entryType == null || days.length < 1) return null;

  let dayI = 0;

  const entryI =
    location.state?.entryIndex ??
    days.findIndex((e, i) => {
      if (e.entries[i].id === entry.id) {
        dayI = i;
      }
      return e.entries[i].id === entry.id;
    });

  const leftI = entryI === 0 ? days[dayI].entries.length - 1 : entryI - 1;

  const rightI = entryI === days[dayI].entries.length - 1 ? 0 : entryI + 1;

  const leftType =
    days[dayI].entries[leftI].entryType === 0
      ? "morning"
      : days[dayI].entries[leftI].entryType === 1
      ? "evening"
      : days[dayI].entries[leftI].entryType === 2
      ? "mood"
      : "breath";

  const rightType =
    days[dayI].entries[rightI].entryType === 0
      ? "morning"
      : days[dayI].entries[rightI].entryType === 1
      ? "evening"
      : days[dayI].entries[rightI].entryType === 2
      ? "mood"
      : "breath";

  const handleYes = () => {
    dispatch(deleteEntry(id, type)).then(() => navigate("/journey"));
  };

  const onlyOneEntry = days.length === 1 && days[0].entries.length === 1;

  return (
    <PageWrapper
      onPageLeft={() => {
        if (show) {
          setShow(false);
        } else {
          if (onlyOneEntry) {
            navigate("/journey");
          } else {
            navigate(
              `/journey/${leftType}/${days[dayI].entries[leftI].id}`,
              {
                state: { entryIndex: leftI },
                replace: true,
              }
            );
          }
        }
      }}
      onPageRight={() => {
        navigate(
          `/journey/${rightType}/${days[dayI].entries[rightI]?.id}`,
          {
            state: { entryIndex: rightI },
            replace: true,
          }
        );
      }}
      disabledRight={show || onlyOneEntry}
    >
      <Body />
      {show && (
        <div id="confirm-delete">
          <div id="confirm-delete-content">
            <h1>confirm delete.</h1>
            <YesNo
              yes="delete"
              no="go back"
              onNo={() => setShow(false)}
              onYes={handleYes}
            />
          </div>
        </div>
      )}

      <NavBar
        left={<Edit />}
        middle={
          <Link className="nav-link" to="/journey" replace>
            go back
          </Link>
        }
        right={<Delete setShow={setShow} show={show} />}
      />
    </PageWrapper>
  );
}

function Body() {
  const entry = useSelector((s) => s.journey.entry);

  if (entry.entryType == null) return null;

  const now = new Date();

  const entryDate = dateString(now, entry.createdAt);

  const createdAt = (
    <p className="entry-created-at">
      {entryDate} at {time(entry.createdAt)}
    </p>
  );

  switch (entry.entryType) {
    case 0:
      if (!entry.Origins) return null;
      return (
        <div className="entry-detail-body-container">
          {createdAt}
          <h1>morning.</h1>
          <div className="entry-detail-body">
            <p>
              how well you sleept <br />{" "}
              <span>{parseInt(entry.sleep) + 1}/5</span>
            </p>
            <p>
              how motivated you felt <br />{" "}
              <span>{parseInt(entry.motivation) + 1}/5</span>
            </p>
            <p>
              what you wanted to focus on <br />{" "}
              {entry.Origins.map(({ value }) => (
                <span key={value}>{value} </span>
              ))}
            </p>
            <p>
              generated prompt here...? <br /> <span>{entry.prompt1}</span>
            </p>
            <p>
              you {entry.prepared ? "felt" : "didn't feel"} prepated for
              the day.
            </p>
          </div>
        </div>
      );
    case 1:
      if (!entry.Origins) return null;
      return (
        <div className="entry-detail-body-container">
          {createdAt}
          <h1>evening.</h1>
          <div className="entry-detail-body">
            <p>
              how well rested you felt <br />{" "}
              <span>{parseInt(entry.rest) + 1}/5</span>
            </p>
            <p>
              {parseInt(entry.stress) + 1}/5 how stressful you felt <br />{" "}
              <span>{parseInt(entry.stress) + 1}/5</span>
            </p>
            <p>
              how productive you felt <br />{" "}
              <span>
                {parseInt(entry.productive) + 1}
                /5
              </span>
            </p>
            <p>
              {entry.Origins.length > 1 ? "these" : "this"} influenced your
              feelings <br />
              {entry.Origins.map(({ value }) => (
                <span key={value}>{value} </span>
              ))}
            </p>
            <p>
              a summary of your day <br /> <span>{entry.prompt1}</span>
            </p>
            <p>
              how you answered the generated prompt <br />{" "}
              <span>{entry.prompt2}</span>
            </p>
            <p>
              you {entry.prepared ? "felt" : "didn't feel"} prepated for
              the night.
            </p>
          </div>
        </div>
      );
    case 2:
      if (!entry.Origins) return null;
      return (
        <div className="entry-detail-body-container">
          {createdAt}
          <h1>{entry.Descriptions[0].value}.</h1>
          <div className="entry-detail-body">
            <p>
              you were feeling <br />{" "}
              <span>{parseInt(entry.feeling) + 1}/5</span>
            </p>
            <p>
              {entry.Origins.length > 1 ? "these" : "this"} influenced your
              feelings <br />
              {entry.Origins.map(({ value }) => (
                <span key={value}>{value} </span>
              ))}
            </p>
            <p>
              why it made you feel that way
              <br /> <span>{entry.prompt1}</span>
            </p>
            <p>
              how you answered the generated prompt <br />{" "}
              <span>{entry.prompt2}</span>
            </p>
            <p>
              you {entry.prepared ? "felt" : "didn't feel"} prepated for
              the night.
            </p>
          </div>
        </div>
      );
    case 3:
      return <>3</>;
    default:
      return null;
  }
}

function Edit() {
  const entry = useSelector((s) => s.journey.entry);
  const { id, type } = useParams();

  if (entry.entryType == null) return null;
  let state = {};

  switch (entry.entryType) {
    case 0:
      state = {
        id: entry.id,
        sleep: parseInt(entry.sleep),
        motivation: parseInt(entry.motivation),
        focus: entry.Origins.map((o) => o.value),
        prepared: entry.prepared,
        prompt1: entry.prompt1,
        prompt2: entry.prompt2,
      };
      break;
    case 1:
      state = {
        id: entry.id,
        rest: parseInt(entry.rest),
        stress: parseInt(entry.stress),
        productive: parseInt(entry.productive),
        description: entry.Descriptions.map((d) => d.value),
        origin: entry.Origins.map((o) => o.value),
        prepared: entry.prepared,
        prompt1: entry.prompt1,
        prompt2: entry.prompt2,
      };
      break;
    case 2:
      state = {
        id: entry.id,
        feeling: parseInt(entry.feeling),
        description: entry.Descriptions.map((d) => d.value),
        origin: entry.Origins.map((o) => o.value),
        prompt1: entry.prompt1,
        prompt2: entry.prompt2,
      };
      break;
    default:
      break;
  }

  return (
    <Link className="nav-link" to={`/${type}/edit/${id}`} state={state}>
      edit
    </Link>
  );
}

function Delete({ setShow }) {
  return (
    <button className="delete-button" onClick={() => setShow(true)}>
      delete
    </button>
  );
}

function dateString(now, dateStr) {
  const date = new Date(dateStr);
  const interval = Math.floor((now - date) / 86400000); // 86400000 is ms in 24 hours

  return interval < 1
    ? "today"
    : interval >= 3
    ? date.getDay()
    : interval >= 1
    ? "yesterday"
    : "";
}

export default EntryDetails;
