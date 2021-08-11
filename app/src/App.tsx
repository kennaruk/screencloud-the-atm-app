import React, { lazy, Suspense } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const LoginPage = lazy(() => import("./page/LoginPage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
          <Route path="/users"></Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
