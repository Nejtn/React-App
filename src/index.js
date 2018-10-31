import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/index.scss"
import "../node_modules/bootstrap/scss/bootstrap.scss";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
serviceWorker.unregister();
