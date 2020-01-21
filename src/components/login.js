import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class login extends Component {
  componentDidMount() {
    let oldToken = localStorage.getItem("token");

    if (oldToken) {
      this.props.history.push("/dashboard");
    } else {
      //Scroll to top of the window everytime the function gets called
      window.scrollTo(0, 0);

      //Get the window URL
      let url = window.location.href;
      console.log(url);
      let token = url.slice(37, 1119); //JWT Token
      //let token = url.slice(36, 1118) //Production using hashrouter
      //let token = url.slice(41, 1122) // JWT Production
      //http://193.70.39.175/login#access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE1MTA5ZWQzOGVhMDcwZjhiY2YyMzgzM2E5NjljM2ZkMjJiMGQ1ZGQ5OTljNTMwODkxZDc3NTU1NTNjYmMzZjRjMzA1MmNhNjllZjllMGRkIn0.eyJhdWQiOiIyNTc0IiwianRpIjoiYTUxMDllZDM4ZWEwNzBmOGJjZjIzODMzYTk2OWMzZmQyMmIwZDVkZDk5OWM1MzA4OTFkNzc1NTU1M2NiYzNmNGMzMDUyY2E2OWVmOWUwZGQiLCJpYXQiOjE1Nzc5Mjk0MzgsIm5iZiI6MTU3NzkyOTQzOCwiZXhwIjoxNjA5NTUxODM4LCJzdWIiOiIxNDQyNDQiLCJzY29wZXMiOltdfQ.K-0GYE48v9CyYXgjr49Lr3WwL6AcaoUf5GQ-Nu6ful1dlXLNFRiywsI2FwGnAtYkX5lgHoV79Stkc3K1YA-MUvjt89iVCTw8D7ktqNjdNJH5a4ntohO9aY4S978HX3IZZlQxALHrS4mXjUYyXiXc-kmv2KZLDz27mmXSGr_yMKAF1JDLt08O9_RyjFPRVQr26VD4XtyzCcdl-QAvTrQAe5rgWgmjXXnStetJxCWqd_LObEzV02HDViUL-DWqxAN-yStrcdkzwNyUX-_OMPXn8m-GpwLmhba5L7QshfgdYk8c3yF74M-yso_HQBLzybQHMfcK4hfkKls8idQCJsR_A3Dej1uMaNUFdh-UZ2JUQOObi3rMsT5JWGd2jTQ7edBtg-8rYFxbihjx7967O_WCWSl6MZ6sy1HWJxUg4OgI87RYAD8ZqwOrKS3KSe-8nXOeo6SCnb-azgfh6oNJoEymd7XHISterfgGJUx-xd8a-PZK3fshEVw2TVbGjyNuEVau9iQWnaBHlS5Nm8xAl_tlZvSyTvR0GQS932Z54fnOwQlGry527QtFdoOkhklH27vXzfL2ziRdWvHER3K1JOuX9t0hL6zNwUQTbQmhodUt96-sKTwtx3ZqRz4sSMnb_WXNXyPvWtDisoyMS6T7vkZcv0X3B4Yn8r3748uLAT4OnTM&token_type=Bearer&expires_in=31622400
      console.log(token);

      localStorage.setItem("token", token); //Set token inside the localstorage
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default withRouter(login);
