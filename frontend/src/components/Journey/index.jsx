import { readEntries } from "../../store/journey";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { PageWrapper } from "../Layout";
import Entry from "./Entry";

import Feeling0 from "../icons/Moods/Feeling0";
import Feeling1 from "../icons/Moods/Feeling1";
import Feeling2 from "../icons/Moods/Feeling2";
import Feeling3 from "../icons/Moods/Feeling3";
import Feeling4 from "../icons/Moods/Feeling4";
import Moon from "../icons/Entry/Moon";
import Sun from "../icons/Entry/Sun";

import { time } from "../../utils";

function Journey() {
  const entries = useSelector((s) => s.journey.entries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readEntries());
  }, [dispatch]);

  const navigate = useNavigate();

  const handlePageRight = () => navigate("/home");
  const handlePageLeft = () => navigate("/mood");

  console.log(entries);
  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      <div className="entries">{entries.map(getEntry)}</div>
    </PageWrapper>
  );
}

function getMoodIcon(feeling) {
  switch (feeling) {
    case "0":
      return <Feeling0 sm />;
    case "1":
      return <Feeling1 sm />;
    case "2":
      return <Feeling2 sm />;
    case "3":
      return <Feeling3 sm />;
    case "4":
      return <Feeling4 sm />;
    default:
      return null;
  }
}

function getEntry(entry, i) {
  const createdAt = time(entry.createdAt);
  switch (entry.entryType) {
    case 0:
      return (
        <Entry
          icon={<Sun />}
          key={i}
          createdAt={createdAt}
          header="reflection"
          // prompt1={`why do you think ${entry.Origins[0].origin} is making you feel this way?`}
          prompt1Ans={entry.prompt1}
          subHeader={`morninng`}
        />
      );
    case 1:
      return (
        <Entry
          icon={<Moon />}
          key={i}
          createdAt={createdAt}
          header="reflection"
          prompt1={`why do you think ${entry.origin[0]} is making you feel this way?`}
          prompt1Ans={entry.prompt1}
          subHeader={`evening`}
        />
      );
    case 2:
      return (
        <Entry
          icon={getMoodIcon(entry.feeling)}
          key={i}
          createdAt={createdAt}
          header="mood check - in"
          prompt1={`why do you think ${entry.origin[0]} is making you feel this way?`}
          prompt1Ans={entry.prompt1}
          subHeader={`you felt ${entry.description[0]}`}
        />
      );
    default:
      return null;
  }
}

export default Journey;
