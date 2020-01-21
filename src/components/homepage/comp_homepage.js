import React, { Component } from "react";
import {
  Button,
  Grid,
  Container,
  Typography,
  CssBaseline
} from "@material-ui/core";
import BG from "../../images/bg.jpg";

class comp_homepage extends Component {
  render() {
    return (
      <div className="bg-home">
        <CssBaseline />
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          direction="column"
          style={{position: "absolute", top: "40%"}}
        >
          <Grid item xs={12}>
            <Typography variant="h3" style={{ color: "white" }}>
              ANIHELPER
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{ color: "white", marginBottom: 30 }}
            >
              Your Anime List Manager
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              href="https://anilist.co/api/v2/oauth/authorize?client_id=2574&response_type=token"
            >
              Login with AniList
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default comp_homepage;
