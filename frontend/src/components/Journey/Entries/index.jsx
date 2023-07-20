import Feeling0 from "../../icons/Moods/Feeling0";
import Feeling1 from "../../icons/Moods/Feeling1";
import Feeling2 from "../../icons/Moods/Feeling2";
import Feeling3 from "../../icons/Moods/Feeling3";
import Feeling4 from "../../icons/Moods/Feeling4";
import Moon from "../../icons/Entry/Moon";
import Sun from "../../icons/Entry/Sun";

import { Link } from "react-router-dom";

import { secondsToMinutesAndSeconds, time } from "../../../utils";

import "./Entry.css";
import Windmill from "../../icons/Entry/Windmill";

function Entry({
  createdAt,
  header,
  icon,
  id,
  prompt1,
  prompt1Ans,
  subHeader,
  tags,
  type,
  i,
}) {
  return (
    <Link to={`${type}/${id}`} state={{ entryIndex: i }} className="entry">
      <div className="entry-header">
        <div className="entry-header-left">
          <div className="entry-icon">{icon}</div>
          <p className="entry-header-text">
            {header} <br /> <span>{subHeader}</span>
          </p>
        </div>
        <span>{createdAt}</span>
      </div>
      <p className="entry-prompt-one">{prompt1}</p>
      <p className="entry-prompt-one-ans">{prompt1Ans}</p>
      <div className="tags">
        {tags?.map((tag, i) => (
          <div className="tag" key={i}>
            {tag}
          </div>
        ))}
      </div>
    </Link>
  );
}

function Entries({ entries }) {
  return <div className="entries">{entries.map(getEntryByType)}</div>;
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

function getEntryByType(entry, i) {
  const createdAt = time(entry.createdAt);
  switch (entry.entryType) {
    case 0:
      return (
        <Entry
          icon={<Sun />}
          id={entry.id}
          i={i}
          key={"morning" + entry.id}
          createdAt={createdAt}
          header="reflection"
          // prompt1={`why do you think ${entry.Origins[0].origin} is making you feel this way?`}
          prompt1Ans={entry.prompt1}
          subHeader={`morning`}
          tags={[
            <p>sleep {+entry.sleep + 1}/5</p>,
            <p>motivation {+entry.motivation + 1}/5</p>,
            ...entry.Origins.map((d, i) => (
              <p key={i + d.value}>{d.value}</p>
            )),
          ]}
          type="morning"
        />
      );
    case 1:
      return (
        <Entry
          icon={<Moon />}
          id={entry.id}
          i={i}
          key={"evening" + entry.id}
          createdAt={createdAt}
          header="reflection"
          prompt1={`today's summary.`}
          prompt1Ans={entry.prompt1}
          subHeader={`evening`}
          tags={[
            <p>rest {+entry.rest + 1}/5</p>,
            <p>stress {+entry.stress + 1}/5</p>,
            <p>productive {+entry.productive + 1}/5</p>,
            ...entry.Descriptions.map((d, i) => (
              <p key={i + d.value}>{d.value}</p>
            )),
            ...entry.Origins.map((d, i) => (
              <p key={i + d.value}>{d.value}</p>
            )),
          ]}
          type="evening"
        />
      );
    case 2:
      return (
        <Entry
          icon={getMoodIcon(entry.feeling)}
          id={entry.id}
          i={i}
          key={"mood" + entry.id}
          createdAt={createdAt}
          header="mood check-in"
          prompt1={`why do you think ${entry.origin[0]} is making you feel this way?`}
          prompt1Ans={entry.prompt1}
          subHeader={`you felt ${entry.description[0]}`}
          tags={[
            <p>feeling {+entry.feeling + 1}/5</p>,
            ...entry.Descriptions.map((d, i) => (
              <p key={i + d.value}>{d.value}</p>
            )),
            ...entry.Origins.map((d, i) => (
              <p key={i + d.value}>{d.value}</p>
            )),
          ]}
          type="mood"
        />
      );
    case 3:
      const duration = secondsToMinutesAndSeconds(entry.duration);
      const totalBreaths = Math.ceil(
        entry.pace * (entry.duration / 60).toFixed(2)
      );
      const breaths = totalBreaths > 1 ? "breaths" : "breath";
      return (
        <Entry
          icon={<Windmill />}
          id={entry.id}
          i={i}
          key={"breathe" + entry.id}
          header="breathing"
          createdAt={createdAt}
          prompt1Ans={`${totalBreaths} ${breaths} in ${duration}`}
          type="breathe"
        />
      );
    default:
      return null;
  }
}

export default Entries;
