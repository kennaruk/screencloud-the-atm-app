import React, { lazy, Suspense } from "react";
import "./App.css";

const TodoPage = lazy(() => import("./page/TodoPage"));
const LoginPage = lazy(() => import("./page/LoginPage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div></div>}>
      <LoginPage/>
      {/* <TodoPage /> */}
    </Suspense>
  );
};

export default App;
