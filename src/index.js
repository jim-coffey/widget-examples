import React from "react";
import ReactDOM from "react-dom";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import { Provider } from "react-redux";
// createStore allows us to load/unload modules dynamically.
import { createStore } from "redux-dynamic-modules-core";
// Saga extension allows us to use Saga middleware in the module store.
import { getSagaExtension } from "redux-dynamic-modules-saga";
// Thunk extension allows us to use Thunk middleware in the module store.
import { getThunkExtension } from "redux-dynamic-modules-thunk";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/**
 * configure the store and load the thunk and saga extension
 * The extensions are optional and you can choose extension based on the middleware you use
 * You can also build your own extensions for any other middleware e.g. redux-observable
 */
const store = createStore({
  enhancements: [offline(offlineConfig)],
  extensions: [getThunkExtension(), getSagaExtension()]
});

ReactDOM.render(
  // Pass the configured store to redux Provider
  // and render the widgets based on the state
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
