import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
//redux stuff start import
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//redux import end
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

//temp code for using postman
import axios from "axios";
window.axios = axios;
//temp code end

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

//console.log("STRIPE KEY IS", process.env.REACT_APP_STRIPE_KEY);
//console.log("Emnvironment is", process.env.NODE_ENV);
