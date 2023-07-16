import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { PageWrapper } from "../Layout";
import { getEntry, setEntry } from "../../store/journey";
import { time } from "../../utils";

import "./EntryDetails.css";
import YesNo from "../icons/YesNo";

function EntryDetails() {
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
        <Delete />
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
      return (
        <>
          {createdAt}
          <h1>morning.</h1>
          <div className="entry-detail-body">
            <p>
              how well you sleept <br /> {entry.sleep}/5
            </p>
            <p>
              how motivated you felt <br /> {entry.motivation}/5
            </p>
            <p>
              what you wanted to focus on <br />{" "}
              {entry.Origins.map(({ value }) => (
                <React.Fragment key={value}>{value}</React.Fragment>
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
      return (
        <>
          {createdAt}
          <h1>evening.</h1>
          <div className="entry-detail-body">
            <p>
              how well rested you felt <br /> {entry.rest}/5
            </p>
            <p>
              how stressful you felt <br /> {entry.stress}/5
            </p>
            <p>
              how productive you felt <br /> {entry.productive}
              /5
            </p>
            <p>
              {entry.Origins.length > 1 ? "these" : "this"} influenced your
              feelings <br />
              {entry.Origins.map(({ value }) => (
                <React.Fragment key={value}>{value}</React.Fragment>
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
      return (
        <>
          {createdAt}
          <h1>{entry.Descriptions[0].value}.</h1>
          <div className="entry-detail-body">
            <p>
              you were feeling <br /> {entry.feeling}/5
            </p>
            <p>
              {entry.Origins.length > 1 ? "these" : "this"} influenced your
              feelings <br />
              {entry.Origins.map(({ value }) => (
                <React.Fragment key={value}>{value}</React.Fragment>
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
  const { id, type } = useParams();
  return <Link to={`/${type}/edit/${id}`}>edit</Link>;
}

function Delete() {
  const [show, setShow] = useState();
  const dispatch = useDispatch();

  const handleYes = () => {
    dispatch();
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
