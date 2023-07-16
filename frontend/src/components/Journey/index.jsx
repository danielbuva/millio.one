import { readEntries } from "../../store/journey";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { NavBar, PageWrapper } from "../Layout";
import Entries from "./Entries";

import "./Journey.css";

function Journey() {
  const entries = useSelector((s) => s.journey.entries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readEntries());
  }, [dispatch]);

  const navigate = useNavigate();

  const handlePageRight = () => navigate("/home");
  const handlePageLeft = () => navigate("/mood");

  return (
    <PageWrapper onPageRight={handlePageRight} onPageLeft={handlePageLeft}>
      <Entries entries={entries} />
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

export default Journey;
