import React, { Component } from "react";
import Header from "../components/core/header";
import AnimeList from "../components/animeList/comp_list_completed";

class page_animeList extends Component {
  render() {
    return (
      <div>
        <Header />
        <AnimeList />
      </div>
    );
  }
}

export default page_animeList;
