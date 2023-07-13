import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import React from "react";

import { csrfFetch, restoreCSRF } from "./store/utils";
import * as sessionActions from "./store/session";
import configureStore from "./store";

import App from "./App.jsx";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
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
