import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Info from "./components/Info";
import Search from "./components/Search";
import Saved from "./components/Saved";

export class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Info />
          <Route path="/" exact component={Saved} />
          <Route path="/search/" component={Search} />
          <Route path="/saved/" component={Saved} />
        </div>
      </Router>
    );
  }
}

export default App;
