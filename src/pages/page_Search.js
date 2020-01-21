import React, { Component } from "react";
import Search from "../components/search/comp_search";
import Header from "../components/core/header";

class page_Search extends Component {
  render() {
    return (
      <div>
        <Header />
        <Search />
      </div>
    );
  }
}

export default page_Search;
