import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Info from "./components/Info";
import Search from "./components/Search";
import Saved from "./components/Saved";
import io from "socket.io-client";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
const socket = io();

export class App extends Component {
  state = { modalIsOpen: false, didEmit: false };

  componentDidMount() {
    socket.on("newBook", () => {
      if (!this.state.didEmit) {
        this.setState({ modalIsOpen: true });
      }
    });
  }

  handleEmit = () => {
    this.setState({ didEmit: true });
    socket.emit("newBook");
  };
  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Info />
          <Modal
            isOpen={this.state.modalIsOpen}
            ariaHideApp={false}
            contentLabel="Minimal Modal Example"
            style={customStyles}
          >
            <h1>Someone has saved a book</h1>
            <button onClick={this.handleCloseModal}>OK</button>
          </Modal>
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
