import React, { Component } from "react";
import { client } from "../client";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";

class userCheck extends Component {
  componentDidMount() {
    let jwt = localStorage.getItem("token");

    if (jwt) {
      const UserData = gql`
        {
          Viewer {
            id
          }
        }
      `;
      console.log(UserData)

      client
        .query({ query: UserData})
        .then(data => {
          console.log(data)
          this.props.history.push("/dashboard");
          console.log("Pushed to /dashboard because you had the token")
        })
        .catch(err => {
          this.props.history.push("/home");
          console.log("Error, pushed to /home ERROR:" + err)
        });
    } else {
      
      this.props.history.push("/home");
      console.log("There is no token stored, pushed to /home and cleared the token")
    }
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(userCheck);
