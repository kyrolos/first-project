import React from "react";
// import * as BooksAPI from './BooksAPI'
import { getAll, update } from "../BooksAPI";
import "./Home-Page.styles.css";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      shelfs: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: []
      },
      didComponentMounted: false
    };
  }
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */

  componentDidMount() {
    getAll()
      .then(res => {
        return res.map(book => {
          if (book.shelf === "currentlyReading") {
            return this.state.shelfs.currentlyReading.push(book);
          } else if (book.shelf === "wantToRead") {
            return this.state.shelfs.wantToRead.push(book);
          } else if (book.shelf === "read") {
            return this.state.shelfs.read.push(book);
          }
          return this.state.shelfs.none.push(book);
        });
      })
      .then(res => {
        return this.setState({
          didComponentMounted: true
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  getWantToReadBooks = shelf => {
    if (shelf === "currentlyReading") {
      return this.state.shelfs.currentlyReading.map(book => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 188,
                  backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                }}
              ></div>
              <div className="book-shelf-changer">
                <select onChange={e => this.onShelfSelect(book, e)}>
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading" defaultValue>
                    Currently Reading
                  </option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>
          </div>
        </li>
      ));
    } else if (shelf === "read") {
      return this.state.shelfs.read.map(book => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 188,
                  backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                }}
              ></div>
              <div className="book-shelf-changer">
                <select onChange={e => this.onShelfSelect(book, e)}>
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="read" defaultValue>
                    Read
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>

                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>
          </div>
        </li>
      ));
    }
    return this.state.shelfs.wantToRead.map(book => (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
              }}
            ></div>
            <div className="book-shelf-changer">
              <select onChange={e => this.onShelfSelect(book, e)}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="wantToRead" defaultValue>
                  Want to Read
                </option>

                <option value="currentlyReading">Currently Reading</option>

                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors[0]}</div>
        </div>
      </li>
    ));
  };

  onShelfSelect = (book, event) => {
    if (event.target.value === book.shelf) {
      return;
    }
    update(book, event.target.value);
  };

  render() {
    const { history } = this.props;
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.shelfs.wantToRead.length ? (
                this.getWantToReadBooks("currentlyReading")
              ) : (
                <h5> Loading ...</h5>
              )}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want To Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.shelfs.wantToRead.length ? (
                this.getWantToReadBooks("wantToRead")
              ) : (
                <h5> Loading ...</h5>
              )}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.shelfs.wantToRead.length ? (
                this.getWantToReadBooks("read")
              ) : (
                <h5> Loading ...</h5>
              )}
            </ol>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}
export default HomePage;
