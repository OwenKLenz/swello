import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./lib/Store";
import Application from "./components/Application";
import "./index.scss"
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend} >
        <Router>
          <Application />
        </Router>
      </DndProvider>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});

