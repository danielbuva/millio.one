import { readEntries } from "../../store/journey";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { NavBar, PageWrapper } from "../Layout";
import Entries from "./Entries";

import "./Journey.css";

function Journey() {
  const days = useSelector((s) => s.journey.days);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readEntries());
  }, [dispatch]);

  const navigate = useNavigate();

  const handlePageRight = () => navigate("/home");
  const handlePageLeft = () => navigate("/mood");

  const now = new Date();

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      {days && days.length > 0 ? (
        days.map((e, i) => {
          return (
            <div className="date-entry" key={i}>
              <h1 className="entry-date">{dateString(now, e.date)}</h1>
              <Entries entries={e.entries} />
            </div>
          );
        })
      ) : (
        <>
          <h1>begin your journey.</h1>
          <p className="write-your-first">write your first entry</p>
        </>
      )}
      <NavBar
        left={
          <Link className="nav-link" to="/home" replace>
            home
          </Link>
        }
        middle={
          <Link className="nav-link" to="/mood" replace>
            mood
          </Link>
        }
        right={
          <Link className="nav-link-active" replace>
            journey
          </Link>
        }
      />
    </PageWrapper>
  );
}

function dateString(now, dateStr) {
  const date = new Date(dateStr);
  const interval = Math.floor((now - date) / 86400000); // 86400000 is ms in 24 hours

  const prefix =
    interval < 1
      ? "today"
      : interval >= 3
      ? date.getDay()
      : interval >= 1
      ? "yesterday"
      : "";

  const dateSplit = dateStr.split(" ");
  const suffix =
    dateSplit[0] + " " + dateSplit[1].slice(0, dateSplit[1].length - 1);

  return (
    <>
      {prefix}, <span>{suffix}</span>
    </>
  );
}

export default Journey;
