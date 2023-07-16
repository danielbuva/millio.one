import { deleteEntry, getEntry, setEntry } from "../../store/journey";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { time } from "../../utils";

import { PageWrapper } from "../Layout";

import YesNo from "../icons/YesNo";

import "./EntryDetails.css";

function EntryDetails() {
  const [show, setShow] = useState();
  const entry = useSelector((s) => s.journey.entry);
  const { id, type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntry(id, type));
  }, [dispatch, id, type]);

  const navigate = useNavigate();

  console.log("[ENTRY LOG]: ", { entry });

  if (entry.entryType == null) return null;

  return (
    <PageWrapper
      onPageLeft={() => {
        dispatch(setEntry({}));
        navigate(-1);
      }}
    >
      <div className="detail-page">
        <Body />
        <Edit />
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

  console.log("this is entry: ", entry);

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

  console.log("this my init state", state);

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
