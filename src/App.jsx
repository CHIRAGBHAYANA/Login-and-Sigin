import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Signinmessage from "./Components/Signinmessage";
import Loginmessage from "./Components/Loginmessage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/signinmessage">
            <Signinmessage />
          </Route>
          <Route path="/loginmessage">
            <Loginmessage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
