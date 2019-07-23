import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Info from "./components/Info";
import Search from "./components/Search";
import Saved from "./components/Saved";
import io from "socket.io-client";

const socket = io();

export class App extends Component {
  state = { didEmit: false };

  componentDidMount() {
    socket.on("newBook", () => {
      if (!this.state.didEmit) {
        console.log("new book added");
      }
    });
  }

  handleEmit = () => {
    this.setState({ didEmit: true });
    socket.emit("newBook");
    console.log("Setting state");
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
