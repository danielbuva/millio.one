import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import React from "react";

import * as sessionActions from "./store/session";
import configureStore from "./store";

import App from "./App.jsx";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
