import React from "react";
import ReactDOM from "react-dom/client";
import "../src/scss/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/scrollToTop";

const baseName = process.env.REACT_APP_BASE_NAME;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
);
