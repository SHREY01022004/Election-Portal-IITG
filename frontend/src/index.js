import React from "react";
import ReactDOM, { render, hydrate } from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import ReactGA from "react-ga";

ReactGA.initialize("UA-256555411-1");

// const rootElement = document.getElementById("root");
// if (rootElement.hasChildNodes()) {
//   hydrate(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     rootElement
//   );
// } else {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     rootElement
//   );
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
