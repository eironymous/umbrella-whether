import React from 'react';
import Router from "./router";
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUmbrella, faSearch, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Provider } from "react-redux";
import store from "./state/state";

//Add fontawesome import to library
library.add(faUmbrella, faSearch, faEye, faMinusCircle);

const AppWrapper = () => {
  //Wrap app in a provider
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

function App() {
  return (
    <div className="App">
        <Router />
    </div>
  );
}

export default AppWrapper;