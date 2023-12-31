import { Route, Routes } from "react-router-dom";

import ClientWrapper from "./components/ClientWrapper";

import Landing from "./components/Landing";
import You from "./components/You";
import Home from "./components/Home";
import Mood from "./components/Mood";
import Journey from "./components/Journey";
import Login from "./components/Login";
import MoodCheckIn from "./components/Forms/MoodCheckIn";
import MorningCheckIn from "./components/Forms/MorningCheckIn";
import EveningCheckIn from "./components/Forms/EveningCheckIn";
import EntryDetails from "./components/Journey/EntryDetails";
import ProtectedRoutes from "./components/ClientWrapper/ProtectedRoutes";
import Breathe from "./components/Forms/Breathe";
import BreatheNow from "./components/Forms/Breathe/BreatheNow";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <ClientWrapper>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/breathe/now" element={<BreatheNow />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/breathe" element={<Breathe />} />
          <Route exaxt path="/you" element={<You />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/mood" element={<Mood />} />
          <Route path="/journey" element={<Journey />} />
          <Route
            exact
            path="/journey/:type/:id"
            element={<EntryDetails />}
          />
          <Route
            exact
            path="/journey/morning/edit"
            element={<MorningCheckIn />}
          />
          <Route
            exact
            path="/journey/evening/edit"
            element={<EveningCheckIn />}
          />
          <Route
            exact
            path="/journey/mood/edit"
            element={<MoodCheckIn />}
          />
          <Route path="/morning/check-in" element={<MorningCheckIn />} />
          <Route path="/evening/check-in" element={<EveningCheckIn />} />
          <Route exact path="/mood/check-in" element={<MoodCheckIn />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ClientWrapper>
  );
}

export default App;
