import React, { lazy, Suspense } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const LoginPage = lazy(() => import("./page/LoginPage"));
const AtmPage = lazy(() => import("./page/AtmPage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
          <Route path="/atm" exact component={AtmPage} />
          <Route path="/" exact component={LoginPage} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
