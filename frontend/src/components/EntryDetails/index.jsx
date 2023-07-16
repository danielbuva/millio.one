import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { deleteEntry, getEntry, readEntries } from "../../store/journey";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { time } from "../../utils";

import { PageWrapper } from "../Layout";

import YesNo from "../icons/YesNo";

import "./EntryDetails.css";

function EntryDetails() {
  const [show, setShow] = useState();
  const entry = useSelector((s) => s.journey.entry);
  const entries = useSelector((s) => s.journey.entries);
  const { id, type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntry(id, type));
    dispatch(readEntries());
  }, [dispatch, id, type]);

  const navigate = useNavigate();
  const location = useLocation();

  if (entry.entryType == null || entries.length < 1) return null;

  const currIndex =
    location.state?.currIndex ??
    entries.findIndex((e) => e.id === entry.id);

  const leftIndex =
    currIndex === 0 ? entries.length - 1 : parseInt(currIndex) - 1;

  const rightIndex =
    currIndex === entries.length - 1 ? 0 : parseInt(currIndex) + 1;

  const leftType =
    entries[leftIndex].entryType === 0
      ? "morning"
      : entries[leftIndex].entryType === 1
      ? "evening"
      : entries[leftIndex].entryType === 2
      ? "mood"
      : "breath";

  const rightType =
    entries[rightIndex].entryType === 0
      ? "morning"
      : entries[rightIndex].entryType === 1
      ? "evening"
      : entries[rightIndex].entryType === 2
      ? "mood"
      : "breath";

  return (
    <PageWrapper
      onPageLeft={() => {
        navigate(`/journey/${leftType}/${entries[leftIndex].id}`, {
          state: { currIndex: leftIndex },
        });
      }}
      onPageRight={() => {
        navigate(`/journey/${rightType}/${entries[rightIndex].id}`, {
          state: { currIndex: rightIndex },
        });
      }}
    >
      <div className="detail-page">
        <Body />
        <Edit />
        <Link to="/journey">go back</Link>
        <Delete setShow={setShow} show={show} />
      </div>
    </PageWrapper>
  );
}

function Body() {
  const entry = useSelector((s) => s.journey.entry);

  if (entry.entryType == null) return null;

  const createdAt = <p>at {time(entry.createdAt)}</p>;

  switch (entry.entryType) {
    case 0:
      if (!entry.Origins) return null;
      return (
        <>
          {createdAt}
          <h1>morning.</h1>
          <div className="entry-detail-body">
            <p>
              how well you sleept <br /> {parseInt(entry.sleep) + 1}/5
            </p>
            <p>
              how motivated you felt <br />{" "}
              {parseInt(entry.motivation) + 1}/5
            </p>
            <p>
              what you wanted to focus on <br />{" "}
              {entry.Origins.map(({ value }) => (
                <React.Fragment key={value}>{value} </React.Fragment>
              ))}
            </p>
            <p>
              generated prompt here...? <br /> {entry.prompt1}
            </p>
            <p>
              you {entry.prepared ? "felt" : "didn't feel"} prepated for
              the day.
            </p>
          </div>
        </>
      );
    case 1:
      if (!entry.Origins) return null;
      return (
        <>
          {createdAt}
          <h1>evening.</h1>
          <div className="entry-detail-body">
            <p>
              how well rested you felt <br /> {parseInt(entry.rest) + 1}/5
            </p>
            <p>
              how stressful you felt <br /> {parseInt(entry.stress) + 1}/5
            </p>
            <p>
              how productive you felt <br />{" "}
              {parseInt(entry.productive) + 1}
              /5
            </p>
            <p>
              {entry.Origins.length > 1 ? "these" : "this"} influenced your
              feelings <br />
              {entry.Origins.map(({ value }) => (
                <React.Fragment key={value}>{value} </React.Fragment>
              ))}
            </p>
            <p>
              a summary of your day <br /> {entry.prompt1}
            </p>
            <p>
              how you answered the generated prompt <br /> {entry.prompt2}
            </p>
            <p>
              you {entry.prepared ? "felt" : "didn't feel"} prepated for
              the night.
            </p>
          </div>
        </>
      );
    case 2:
      if (!entry.Origins) return null;
      return (
        <>
          {createdAt}
          <h1>{entry.Descriptions[0].value}.</h1>
          <div className="entry-detail-body">
            <p>
              you were feeling <br /> {parseInt(entry.feeling) + 1}/5
            </p>
            <p>
              {entry.Origins.length > 1 ? "these" : "this"} influenced your
              feelings <br />
              {entry.Origins.map(({ value }) => (
                <React.Fragment key={value}>{value} </React.Fragment>
              ))}
            </p>
            <p>
              why it made you feel that way
              <br /> {entry.prompt1}
            </p>
            <p>
              how you answered the generated prompt <br /> {entry.prompt2}
            </p>
            <p>
              you {entry.prepared ? "felt" : "didn't feel"} prepated for
              the night.
            </p>
          </div>
        </>
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
    <Link to={`/${type}/edit/${id}`} state={state}>
      edit
    </Link>
  );
}

function Delete({ setShow, show }) {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleYes = () => {
    dispatch(deleteEntry(id, type)).then(() => navigate("/journey"));
  };

  return (
    <>
      <button onClick={() => setShow(true)}>delete</button>
      {show && (
        <div id="confirm-delete">
          <h1>confirm delete.</h1>
          <YesNo
            yes="delete"
            no="go back"
            onNo={() => setShow(false)}
            onYes={handleYes}
          />
        </div>
      )}
    </>
  );
}

export default EntryDetails;
