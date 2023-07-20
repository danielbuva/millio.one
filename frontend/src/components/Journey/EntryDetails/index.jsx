import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  deleteEntry,
  getEntry,
  readEntries,
} from "../../../store/journey";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { secondsToMinutesAndSeconds, time } from "../../../utils";

import { NavBar, PageWrapper } from "../../ClientWrapper/Layout";

import YesNo from "../../icons/YesNo";

import "./EntryDetails.css";
import { week } from "../state";

function EntryDetails() {
  const [show, setShow] = useState();
  const entry = useSelector((s) => s.journey.entry);
  const days = useSelector((s) => s.journey.days);
  const { id, type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntry(id, type));
    dispatch(readEntries());
  }, [dispatch, id, type]);

  const navigate = useNavigate();
  const { state } = useLocation();

  if (entry.entryType == null || days.length < 1) return null;

  const handleYes = async () => {
    await dispatch(deleteEntry(id, type));
    navigate("/journey");
  };

  let entryIndex = state?.entryIndex;

  if (entryIndex == null) {
    for (let i = 0; i < days.length; i++) {
      entryIndex = days[i].entries.findIndex((e) => e.id === entry.id);
      if (entryIndex > -1) break;
    }
  }

  const dayI =
    state?.dayI ??
    days.findIndex((day) => day.entries[entryIndex]?.id === entry.id);

  const onlyOneEntry = days.length === 1 && days[0].entries.length === 1;

  if (dayI < 0 || entryIndex < 0 || entryIndex == null || dayI == null) {
    return null;
  }

  let leftPageDayI;
  let rightPageDayI;
  let leftEntryI;
  let rightEntryI;
  let leftEntry;
  let leftType;
  let rightEntry;
  let rightType;
  /* eslint-disable */
  if (!onlyOneEntry) {
    const lastDayIndex = days.length - 1;
    const lastEntryIndex = days[dayI].entries.length - 1;
    const hasEntries = days[dayI].entries.length > 1;
    if (dayI == 0) {
      if (entryIndex == 0) {
        leftPageDayI = lastDayIndex;
        leftEntryI = days[lastDayIndex].entries.length - 1;
        if (hasEntries) {
          rightPageDayI = 0;
          rightEntryI = entryIndex + 1;
        } else {
          rightPageDayI = lastDayIndex;
          rightEntryI = 0;
        }
      } else if (entryIndex == lastEntryIndex) {
        if (hasEntries) {
          leftPageDayI = dayI;
          leftEntryI = entryIndex - 1;
        } else {
          leftPageDayI = dayI - 1;
          leftEntryI = days[leftPageDayI].entries.length;
        }
        if (lastDayIndex > 0) {
          rightPageDayI = dayI + 1;
          rightEntryI = 0;
        } else {
          rightPageDayI = dayI;
          rightEntryI = 0;
        }
      } else {
        if (hasEntries) {
          leftPageDayI = dayI;
          leftEntryI = entryIndex - 1;
          rightPageDayI = dayI;
          rightEntryI = entryIndex + 1;
        }
      }
    } else if (dayI == lastDayIndex) {
      if (entryIndex == 0) {
        leftPageDayI = dayI - 1;
        leftEntryI = days[leftPageDayI].entries.length - 1;
        if (hasEntries) {
          rightPageDayI = dayI;
          rightEntryI = entryIndex + 1;
        } else {
          rightPageDayI = 0;
          rightEntryI = days[0].entries.length - 1;
        }
      } else if (entryIndex == lastEntryIndex) {
        if (hasEntries) {
          leftPageDayI = dayI;
          leftEntryI = entryIndex - 1;
        } else {
          leftPageDayI = dayI - 1;
          leftEntryI = days[leftPageDayI].entries.length - 1;
        }
        rightPageDayI = 0;
        rightEntryI = 0;
      } else {
        if (hasEntries) {
          leftPageDayI = dayI;
          leftEntryI = entryIndex - 1;
          rightPageDayI = dayI;
          rightEntryI = entryIndex + 1;
        } else {
          leftPageDayI = dayI - 1;
          leftEntryI = days[leftPageDayI].entries.length - 1;
          rightPageDayI = dayI + 1;
          rightEntryI = 0;
        }
      }
    } else {
      if (entryIndex == 0) {
        leftPageDayI = dayI - 1;
        leftEntryI = days[leftPageDayI].entries.length - 1;
        if (hasEntries) {
          rightPageDayI = dayI;
          rightEntryI = entryIndex + 1;
        } else {
          rightPageDayI = dayI + 1;
          rightEntryI = 0;
        }
      } else if (entryIndex == lastEntryIndex) {
        if (hasEntries) {
          leftPageDayI = dayI;
          leftEntryI = entryIndex - 1;
        } else {
          leftPageDayI = dayI - 1;
          leftEntryI = days[leftPageDayI].entries.length - 1;
        }
        rightPageDayI = dayI + 1;
        rightEntryI = 0;
      } else {
        if (hasEntries) {
          leftPageDayI = dayI;
          leftEntryI = entryIndex - 1;
          rightPageDayI = dayI;
          rightEntryI = entryIndex + 1;
        } else {
          leftPageDayI = dayI - 1;
          leftEntryI = days[leftPageDayI].entries.length - 1;
          rightPageDayI = dayI + 1;
          rightEntryI = 0;
        }
      }
    }
    leftEntry = days[leftPageDayI].entries[leftEntryI];
    leftType =
      leftEntry.entryType === 0
        ? "morning"
        : leftEntry.entryType === 1
        ? "evening"
        : leftEntry.entryType === 2
        ? "mood"
        : "breathe";

    rightEntry = days[rightPageDayI].entries[rightEntryI];
    rightType =
      rightEntry.entryType === 0
        ? "morning"
        : rightEntry.entryType === 1
        ? "evening"
        : rightEntry.entryType === 2
        ? "mood"
        : "breathe";
  }

  return (
    <PageWrapper
      onPageLeft={() => {
        if (show) return setShow(false);
        if (onlyOneEntry) return navigate("/journey");
        navigate(`/journey/${leftType}/${leftEntry.id}`, {
          state: { entryIndex: leftEntryI, dayI: leftPageDayI },
          replace: true,
        });
      }}
      onPageRight={() => {
        navigate(`/journey/${rightType}/${rightEntry.id}`, {
          state: { entryIndex: rightEntryI, dayI: rightPageDayI },
          replace: true,
        });
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
              {entry.prompt} <br /> <span>{entry.prompt1}</span>
            </p>
            <p>
              {entry.tyPrompt} <br /> <span>{entry.prompt2}</span>
            </p>
            <p className="pb">
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
              {entry.prompt} <br /> <span>{entry.prompt2}</span>
            </p>
            <p className="pb">
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
            {/* <p className="pb">
              you {entry.prepared ? "felt" : "didn't feel"} prepated for
              the night.
            </p> */}
          </div>
        </div>
      );
    case 3:
      const totalCycles = Math.ceil(
        entry.pace * (entry.duration / 60).toFixed(2)
      );
      const cycles = totalCycles > 1 ? "cycles" : "cycle";
      return (
        <div className="entry-detail-body-container">
          {createdAt}
          <h1>breathe.</h1>
          <div className="entry-detail-body">
            <p>
              pace
              <br />
              <span>
                {entry.pace < 2
                  ? "slower"
                  : entry.pace === 2
                  ? "neutral"
                  : "faster"}
              </span>
            </p>
            <p>
              duration <br />
              <span>{secondsToMinutesAndSeconds(entry.duration)} </span>
            </p>
            <p>
              number of breathes <br />{" "}
              <span>
                {totalCycles} {cycles}
              </span>
            </p>
          </div>
        </div>
      );
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
        tyPrompt: entry.tyPrompt,
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
  date.setHours(0, 0, 0, 0);

  const interval = Math.floor((now - date) / 86400000); // 86400000 is ms in 24 hours

  return interval < 1
    ? "today"
    : interval >= 2
    ? week[date.getDay()]
    : interval >= 1
    ? "yesterday"
    : "";
}

export default EntryDetails;
