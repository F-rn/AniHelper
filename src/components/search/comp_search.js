import React, { Component } from "react";
import {
  CssBaseline,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  LinearProgress,
  Button,
  Fab,
  Grow,
  InputBase,
  Fade,
  Paper
} from "@material-ui/core";
import { gql } from "apollo-boost";
import { client } from "../../client";
import { connect } from "react-redux";
import {
  InsertAvatar,
  InsertUsername,
  InsertAnimeID,
  InsertScoreFormat
} from "../../actions/index";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => {
  return {
    InsertAvatar: avatar => dispatch(InsertAvatar(avatar)),
    InsertUsername: username => dispatch(InsertUsername(username)),
    InsertAnimeID: id => dispatch(InsertAnimeID(id)),
    InsertScoreFormat: format => dispatch(InsertScoreFormat(format)),
    dispatch
  };
};

class comp_search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AnimeArray: [],
      Loaded: false
    };
  }

  SearchEntry = e => {
    const SEARCH = gql`
    {
      Page(page: 1, perPage: 50) {
        media(search: "${e.currentTarget.value}")
        {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
        }
      }
    }
    `;

    client.query({ query: SEARCH }).then(res => {
      this.setState({
        AnimeArray: this.state.AnimeArray = [],
        AnimeArray: Object.assign(this.state.AnimeArray, res.data.Page.media)
      });
    });
  };

  EntryClicked = data => {
    this.props.InsertAnimeID(data);
    this.props.history.push("/anime");
    console.log(data);
  };

  render() {
    return (
      <div>
        <CssBaseline />
        <Grid
          container
          justify="center"
          alignItems="flex-start"
          direction="row"
          style={{ marginTop: 100 }}
        >
          <Grid item xs={8}>
            <Paper component="form">
              <InputBase
                onChange={this.SearchEntry}
                style={{ padding: 15, background: "#dbdbdb" }}
                fullWidth
                placeholder="Search an anime title"
              />
            </Paper>
          </Grid>
          {this.state.AnimeArray.length > 0 ? (
            this.state.AnimeArray.map((anime, index) => {
              return(
              <Grow in={true} key={index}>
                <Grid item>
                  <Card
                    onClick={() => this.EntryClicked(anime.id)}
                    style={{
                      width: 240,
                      margin: 5
                    }}
                    variant="outlined"
                  >
                    <CardMedia
                      style={{
                        height: 230,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 20%"
                      }}
                      image={anime.coverImage.extraLarge}
                    />
                    <CardContent>
                      <Grid
                        container
                        alignItems="stretch"
                        justify="flex-start"
                        direction="row"
                        item
                        md={12}
                        spacing={1}
                      >
                        <Typography variant="body2">
                          {anime.title.userPreferred}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
              )
            })
          ) : (
            <Grid item xs={12}>
              <Typography
                style={{ color: "white", marginTop: 100 }}
                variant="h6"
                align="center"
              >
                No items matching your criteria.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(withRouter(comp_search));
