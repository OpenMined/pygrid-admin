import React, { useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
// import { Theme } from "@openmined/omui";

import Routes from "./routes";

const history = createBrowserHistory();

const App = () => {
  const [action, setAction] = useState(history.action);
  const [location, setLocation] = useState(history.location);

  useLayoutEffect(() => {
    history.listen(({ location, action }) => {
      setLocation(location);
      setAction(action);
    });
  }, []);

  return (
    // <Theme>
      <Router action={action} location={location} navigator={history}>
        <Routes />
      </Router>
    // </Theme>
  );
};

export default App;
