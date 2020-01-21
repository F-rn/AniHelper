import React, { Component } from "react";
import AnimeDetails from "../components/animePage/comp_animePage";
import Header from "../components/core/header";

class page_animeDetails extends Component {
  render() {
    return (
      <div>
        <Header />
        <AnimeDetails />
      </div>
    );
  }
}

export default page_animeDetails;
