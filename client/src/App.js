import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Info from "./components/Info";
import Search from "./components/Search";
import Saved from "./components/Saved";
import io from "socket.io-client";

const socket = io();
socket.on("newBook", () => {
  console.log("new book added");
});

export class App extends Component {
  state = {};

  handleEmit = () => {
    socket.emit("newBook");
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Info />
          <Route path="/" exact component={Saved} />
          <Route
            path="/search/"
            render={() => <Search handleEmit={this.handleEmit} />}
          />
          <Route path="/saved/" component={Saved} />
        </div>
      </Router>
    );
  }
}

export default App;
