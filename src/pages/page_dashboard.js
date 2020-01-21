import React, { Component } from "react";
import Dashboard from "../components/dashboard/comp_dashboard";
import Header from "../components/core/header";

class page_dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    );
  }
}

export default page_dashboard;
