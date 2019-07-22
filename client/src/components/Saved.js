import React from "react";
import SavedItems from "./SavedItems";
import axios from "axios";
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

class Saved extends React.Component {
  state = { modalIsOpen: false, books: [] };

  componentDidMount() {
    axios
      .get("/api/books")
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDelete = id => {
    const newBooks = [];
    this.state.books.forEach(book => {
      if (id === book._id) {
        axios
          .delete("/api/books/" + id)
          .then(() => {
            this.setState({ modalIsOpen: true });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        const { _id, title, authors, description, image, link } = book;
        newBooks.push({
          _id,
          title,
          authors,
          description,
          image,
          link
        });
      }
    });
    this.setState({ books: newBooks });
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <h1>Book has been deleted from saved items</h1>
          <button onClick={this.handleCloseModal}>OK</button>
        </Modal>
        <h3 className="mx-3">Saved Books</h3>
        <ul className="list-group mt-4">
          {this.state.books.map(item => (
            <SavedItems
              key={item._id}
              bookData={item}
              handleDelete={this.handleDelete}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Saved;
