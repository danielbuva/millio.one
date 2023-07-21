import { PageWrapper } from "../ClientWrapper/Layout";

import Level0 from "../icons/Levels/Level0";
import Level1 from "../icons/Levels/Level1";
import Level2 from "../icons/Levels/Level2";
import Level3 from "../icons/Levels/Level3";
import Level4 from "../icons/Levels/Level4";

import Feeling0 from "../icons/Moods/Feeling0";
import Feeling1 from "../icons/Moods/Feeling1";
import Feeling2 from "../icons/Moods/Feeling2";
import Feeling3 from "../icons/Moods/Feeling3";
import Feeling4 from "../icons/Moods/Feeling4";
import {
  desc0Options,
  desc1Options,
  desc2Options,
  desc3Options,
  desc4Options,
} from "./utils";

import "./Form.css";

function CheckInForm({
  handlePageLeft,
  handlePageRight,
  disabledRight,
  page,
  numberOfPages,
  currentPageIndex,
}) {
  return (
    <PageWrapper
      onPageLeft={handlePageLeft}
      onPageRight={handlePageRight}
      disabledRight={disabledRight}
    >
      <div className="check-in-wrapper">
        <div className="page-container">{page}</div>
      </div>
      <PageIndicator
        currentPageIndex={currentPageIndex}
        numberOfPages={numberOfPages}
      />
    </PageWrapper>
  );
}

export function Selection({
  disabledRight,
  prompt,
  setState,
  state,
  type = "level",
}) {
  const selection =
    type === "level"
      ? [Level0, Level1, Level2, Level3, Level4]
      : [Feeling0, Feeling1, Feeling2, Feeling3, Feeling4];
  return (
    <div>
      {prompt}
      <div className="selection">
        {selection.map((Option, i) => (
          <Option
            key={Option.name}
            active={state === i}
            onClick={() => {
              disabledRight.current = false;
              setState(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Descriptions({ updateDescription, description, descRef }) {
  const descriptions = [
    desc0Options,
    desc1Options,
    desc2Options,
    desc3Options,
    desc4Options,
  ];

  return (
    <div>
      <h1 className="desc-options-header">
        how would you describe how you are feeling?
      </h1>
      <p className="select-up-to d">select up to three</p>
      <div
        className="desc-options"
        onClick={updateDescription}
        ref={descRef}
      >
        {descriptions.map((group) => (
          <div className="desc-container" key={group[0]}>
            {group.map((option) => {
              const active = description.includes(option);
              return (
                <p
                  key={option}
                  style={{
                    color: active ? "#000" : "#fff",
                    backgroundColor: active ? "#fff" : "#000",
                  }}
                  className="desc-option"
                >
                  {option}
                </p>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function PageIndicator({ numberOfPages, currentPageIndex }) {
  return (
    <div className="page-indicator-container">
      {Array(numberOfPages)
        .fill("")
        .map((_, i) => {
          return (
            <div
              className={
                "page-indicator" +
                (i === currentPageIndex ? " active-indicator" : "")
              }
              key={i}
            >
              hiii
            </div>
          );
        })}
    </div>
  );
}

export default CheckInForm;
