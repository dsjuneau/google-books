import React from "react";
import axios from "axios";
import SearchItems from "./SearchItems";

class Search extends React.Component {
  state = { searchTerm: "you don't know js", results: [] };

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
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.previewLink
          });
        });
        this.setState({ results });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleSave = id => {
    console.log("working", id);
  };

  render() {
    return (
      <div>
        <h3 className="mx-3">Search for a book</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group-inline row">
            <div className="col-10">
              <input
                className="form-control mx-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <div className="col-2">
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
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
