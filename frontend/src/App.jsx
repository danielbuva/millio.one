import { Route, Routes } from "react-router-dom";

import ClientWrapper from "./components/ClientWrapper";

import Landing from "./components/Landing";
import Home from "./components/Home";
import Mood from "./components/Mood";
import Journey from "./components/Journey";
import Login from "./components/Login";
import MoodCheckIn from "./components/CheckInForms/MoodCheckIn";
import MorningCheckIn from "./components/CheckInForms/MorningCheckIn";
import EveningCheckIn from "./components/CheckInForms/EveningCheckIn";
import EntryDetails from "./components/Journey/EntryDetails";
import ProtectedRoutes from "./components/ClientWrapper/ProtectedRoutes";

function App() {
  return (
    <ClientWrapper>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route exact path="/mood" element={<Mood />} />
          <Route path="/journey" element={<Journey />} />
          <Route
            exact
            path="/journey/:type/:id"
            element={<EntryDetails />}
          />
          <Route
            exact
            path="/morning/edit/:id"
            element={<MorningCheckIn />}
          />
          <Route
            exact
            path="/evening/edit/:id"
            element={<EveningCheckIn />}
          />
          <Route exact path="/mood/edit/:id" element={<MoodCheckIn />} />
          <Route path="/morning/check-in" element={<MorningCheckIn />} />
          <Route path="/evening/check-in" element={<EveningCheckIn />} />
          <Route exact path="/mood/check-in" element={<MoodCheckIn />} />
        </Route>
      </Routes>
    </ClientWrapper>
  );
}

export default App;
