import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import { ModalProvider } from "./components/Modal";
import { ColorProvider } from "./components/ColorProvider";
import { useState } from "react";

function App() {
  const [pageRightFunction, setPageRightFunction] = useState(null);
  const [pageLeftFunction, setPageLeftFunction] = useState(null);

  return (
    <BrowserRouter>
      <ColorProvider>
        <ModalProvider>
          <BaseLayout
            pageRightFunction={pageRightFunction}
            setPageRightFunction={setPageRightFunction}
            pageLeftFunction={pageLeftFunction}
            setPageLeftFunction={setPageLeftFunction}
          >
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route element={<Layout />}>
                <Route path="/home" element={<>hi</>} />
                <Route path="/login" element={<>hi</>} />
                <Route path="/signup" element={<>hi</>} />
                <Route path="/journey" element={<>hi</>} />
                <Route path="/day" element={<>hi</>} />
                <Route path="/evening" element={<>hi</>} />
                <Route path="/mood" element={<>hi</>} />
              </Route>
            </Routes>
          </BaseLayout>
        </ModalProvider>
      </ColorProvider>
    </BrowserRouter>
  );
}

export default App;
