import React from "react";
import { Route } from "react-router-dom";
import { Home, Users } from "./pages";
import "./scss/App.css";

function App() {
  return (
    <div className="App container-fluid">
      <Route path="/" component={Home} exact />
      <Route path="/users" component={Users} exact />
    </div>
  );
}

export default App;
