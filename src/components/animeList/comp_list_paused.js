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
  Fade
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
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpward,
  ArrowBack
} from "@material-ui/icons";

const mapStateToProps = state => {
  return {
    Username: state.Username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    InsertAvatar: avatar => dispatch(InsertAvatar(avatar)),
    InsertUsername: username => dispatch(InsertUsername(username)),
    InsertAnimeID: id => dispatch(InsertAnimeID(id)),
    InsertScoreFormat: format => dispatch(InsertScoreFormat(format)),
    dispatch
  };
};

class comp_animelist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      totalPages: null,
      status: "PAUSED",
      animeArray: [],
      score: null,
      Loaded: false
    };
  }
  componentDidMount() {
    this.setState({ Loaded: false }, () => {
      const UserDATA = gql`
      {

        Page(page: ${this.state.currentPage}, perPage: 50) {
            pageInfo
                {
                currentPage
                total
                lastPage
                }
            mediaList(userName: "${this.props.Username}", status: ${this.state.status}, sort: SCORE_DESC, type: ANIME) {
                mediaId
                id
                media {
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
                episodes
                }
                score
                progress
                }
            }
      }`;
      client.query({ query: UserDATA }).then(res => {
        let rootAnime = res.data.Page;
        this.setState({
          totalPages: rootAnime.pageInfo.lastPage,
          animeArray: Object.assign(this.state.animeArray, rootAnime.mediaList),
          Loaded: true
        });
      });
    });
  }

  EntryClicked = data => {
    this.props.InsertAnimeID(data);
    this.props.history.push("/anime");
    console.log(data);
  };

  PrevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 }, () => {
        this.componentDidMount();
      });
    }
  };

  NextPage = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        this.componentDidMount();
      });
    }
  };

  returnToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  render() {
    if (this.state.Loaded === false) {
      return (
        <Fade in={true}>
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography
                align="center"
                style={{ marginTop: 350, color: "white" }}
                variant="h5"
              >
                Loading all the weeb stuff...
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <LinearProgress
                color="primary"
                style={{ height: 10 }}
                variant="query"
              />
            </Grid>
          </Grid>
        </Fade>
      );
    }
    return (
      <div>
        <CssBaseline />
        <Grid
          container
          justify="center"
          alignContent="center"
          alignItems="center"
          style={{ marginTop: 120, marginBottom: 40, textAlign: "center" }}
        >
          <Grid item xs={12}>
            {this.state.currentPage === 1 ? null : (
              <Button
                style={{ margin: 10 }}
                onClick={this.PrevPage}
                color="primary"
                variant="contained"
              >
                <ArrowLeft /> Previous Page
              </Button>
            )}
            {this.state.currentPage === this.state.totalPages ? null : (
              <Button
                style={{ margin: 10 }}
                onClick={this.NextPage}
                color="secondary"
                variant="contained"
              >
                <ArrowRight /> Next Page
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid
          justify="center"
          alignItems="flex-start"
          container
          style={{ marginBottom: 50 }}
        >
          {this.state.animeArray.map((anime, index) => {
            return (
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
                      image={anime.media.coverImage.extraLarge}
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
                          {anime.media.title.userPreferred}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        alignItems="stretch"
                        justify="flex-end"
                        direction="row"
                        style={{ marginTop: 20 }}
                        item
                        md={12}
                        spacing={1}
                      >
                        <Typography variant="body2" style={{ fontSize: 12 }}>
                          Progress {anime.progress}/{anime.media.episodes}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            );
          })}
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
          alignContent="flex-start"
        >
          <Grid item>
            <Fab
              style={{
                margin: 0,
                top: "auto",
                right: 20,
                overflowX: "hidden",
                bottom: 20,
                left: "auto",
                position: "fixed"
              }}
              onClick={this.returnToTop}
              color="primary"
              aria-label="kiau"
            >
              <ArrowUpward />
            </Fab>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(comp_animelist));
