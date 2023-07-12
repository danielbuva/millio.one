import { Route, Routes } from "react-router-dom";

import ClientWrapper from "./components/ClientWrapper";
import Wrapper from "./components/Wrapper";

import Landing from "./components/Landing";
import Home from "./components/Home";
import Mood from "./components/Mood";
import Journey from "./components/Journey";
import Login from "./components/Login";

function App() {
  return (
    <ClientWrapper>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/login" element={<Login />} />
          <Route path="/day" element={<>hi</>} />
          <Route path="/evening" element={<>hi</>} />
        </Route>
      </Routes>
    </ClientWrapper>
  );
}

export default App;
