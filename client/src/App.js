import React, { Component } from "react";

import Nav from "./components/Nav";
import Info from "./components/Info";
import Search from "./components/Search";
import Saved from "./components/Saved";

export class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Nav />
        <Info />
        <Search />
        <Saved />
      </div>
    );
  }
}

export default App;
