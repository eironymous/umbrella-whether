import React from 'react';
import Router from "./router";
import { useDispatch } from "react-redux";
import { updateRoute } from "./state/router-slice";
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { 
  faUmbrella, 
  faSearch, 
  faMinusCircle, 
  faHome, 
  faInfoCircle, 
  faQuestionCircle, 
  faHeart as fullHeart,
  faMoon,
  faCloudSun,
  faCloudMoon,
  faCloudSunRain,
  faCloudMoonRain,
  faSmog,
  faSnowflake,
  faWind,
  faCloudRain,
  faBolt,
  faCloudShowersHeavy,
  faSurprise,
  faStickyNote,
  faEdit,
  faEraser,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart as emptyHeart, faSun } from "@fortawesome/free-regular-svg-icons";
import { Provider } from "react-redux";
import store from "./state/state";

//Add fontawesome import to library
library.add(
  faUmbrella, 
  faSearch, 
  faEye, 
  faMinusCircle, 
  faHome, 
  faInfoCircle, 
  faQuestionCircle, 
  fullHeart, 
  emptyHeart,
  faSun,
  faMoon,
  faCloudSun,
  faCloudMoon,
  faCloudSunRain,
  faCloudMoonRain,
  faSmog,
  faSnowflake,
  faWind,
  faCloudRain,
  faBolt,
  faCloudShowersHeavy,
  faSurprise,
  faStickyNote,
  faEdit,
  faEraser,
  faPaperPlane,
  faTrash,
);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const AppWrapper = () => {
  //Wrap app in a provider
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

function App() {
  const dispatch = useDispatch();
  dispatch(updateRoute("home"));

  return (
    <div className="App">
        <Router />
    </div>
  );
}

export default AppWrapper;