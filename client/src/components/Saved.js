import React from "react";
import SavedItems from "./SavedItems";
import axios from "axios";

class Saved extends React.Component {
  state = { feedback: false, books: [] };

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
            this.setState({ feedback: true });
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

  //Handle delete

  render() {
    return (
      <div>
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
