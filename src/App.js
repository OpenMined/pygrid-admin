import React, { useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Routes from "./routes";
import { Header } from "./components";

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
    <Router action={action} location={location} navigator={history}>
      <Header />
      <Routes />
    </Router>
  );
};

export default App;
