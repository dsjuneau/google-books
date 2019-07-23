import React from "react";
import axios from "axios";
import SearchItems from "./SearchItems";
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

class Search extends React.Component {
  state = { modalIsOpen: false, searchTerm: "you don't know js", results: [] };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/api/books/search", { term: this.state.searchTerm })
      .then(response => {
        let results = [];
        response.data.forEach((book, i) => {
          results.push({
            id: i,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : null,
            link: book.volumeInfo.previewLink
          });
        });
        this.setState({ results });
        this.setState({ searchTerm: "" });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleSave = id => {
    this.props.handleEmit();
    let bookToSave;
    const booksRemaining = [];
    this.state.results.forEach(book => {
      if (id === book.id) {
        const { title, authors, description, image, link } = book;
        bookToSave = {
          title,
          authors,
          description,
          image,
          link
        };
      } else {
        const { id, title, authors, description, image, link } = book;
        booksRemaining.push({
          id,
          title,
          authors,
          description,
          image,
          link
        });
      }
    });
    this.setState({ results: booksRemaining });
    axios
      .post("/api/books", { bookToSave })
      .then(() => {
        this.setState({ modalIsOpen: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };
  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div>
        <h3 className="mx-3">Search for a book</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group-inline row">
            <div className="col-10">
              <input
                onChange={this.handleChange}
                className="form-control mx-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.searchTerm}
              />
            </div>
            <div className="col-2">
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>

        <Modal
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <h1>Book moved to saved items</h1>
          <button onClick={this.handleCloseModal}>OK</button>
        </Modal>
        <ul className="list-group mt-4">
          {this.state.results.map(item => (
            <SearchItems
              key={item.id}
              bookData={item}
              handleSave={this.handleSave}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
