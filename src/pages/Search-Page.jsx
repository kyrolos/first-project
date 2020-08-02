import React from "react";
import { search, update } from "../BooksAPI";
import "./Home-Page.styles.css";

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      books: "",
      areBooksFetched: false
    };
  }

  handleInputChange = async e => {
    await this.setState({
      query: e.target.value
    });
    if (this.state.query) {
      search(this.state.query).then(fetchedBooks => {
        this.setState({
          books: fetchedBooks,
          areBooksFetched: true
        });
      });
    } else {
      this.setState({
        books: "",
        areBooksFetched: false
      });
    }
  };

  onShelfSelect = (book, event) => {
    if (event.target.value === book.shelf) {
      return;
    }
    update(book, event.target.value);
  };

  displayTheBooks = () => {
    if (this.state.books.length > 1) {
      return this.state.books.map(book => {
        return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 188,
                    backgroundImage: `url(${book.imageLinks &&
                      book.imageLinks.smallThumbnail})`
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select onChange={e => this.onShelfSelect(book, e)}>
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="none"> None</option>
                    <option value="currentlyReading" defaultValue>
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors && book.authors}</div>
              <div> {book.shelf} </div>
            </div>
          </li>
        );
      });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={e => this.props.history.push("/")}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.areBooksFetched && this.displayTheBooks()}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
