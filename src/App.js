import React from "react";
// import * as BooksAPI from './BooksAPI'
import HomePage from "./pages/Home-Page";
import { Route } from "react-router";
import SearchPage from "./pages/Search-Page";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    //fine we will add react-router
    showSearchPage: false
  };

  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
