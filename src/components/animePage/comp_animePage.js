import React, { Component } from "react";
import { gql } from "apollo-boost";
import { client } from "../../client";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  CssBaseline,
  Button,
  LinearProgress,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Hidden,
  Container,
  Card,
  CardMedia
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    AnimeID: state.AnimeID,
    Username: state.Username,
    ScoreFormat: state.ScoreFormat
  };
};

class comp_animePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AnimeID: null,
      AnimeTitle: null,
      AnimeImage: null,
      AnimeBanner: null,
      AnimeStatus: null,
      AnimeEpisodes: null,
      AnimeEPDuration: null,
      AnimeDescription: null,

      UserAnimeProgress: null,
      UserAnimeStatus: null,
      UserAnimeScore: 0,
      UserMaxScore: null,

      CheckFavourite: null,
      Confirmed: false,
      Snackbar: false,

      Loaded: false
    };
  }
  componentDidMount() {
    if (this.props.AnimeID === null) {
      this.props.history.push("/");
    }
    if (this.props.ScoreFormat === "POINT_100") {
      this.setState({ UserMaxScore: 100 });
    } else if (this.props.ScoreFormat === "POINT_10_DECIMAL") {
      this.setState({ UserMaxScore: 10 });
    } else if (this.props.ScoreFormat === "POINT_10") {
      this.setState({ UserMaxScore: 10 });
    } else if (this.props.ScoreFormat === "POINT_5") {
      this.setState({ UserMaxScore: 5 });
    } else if (this.props.ScoreFormat === "POINT_3") {
      this.setState({ UserMaxScore: 3 });
    }

    this.setState({ Loaded: false }, () => {
      const AnimeInfo = gql`{
      MediaList(userName: "${this.props.Username}", id: ${this.props.AnimeID}) {
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
          bannerImage
          status
          description
          duration
          episodes
          isFavourite
          streamingEpisodes {
            title
            thumbnail
            url
            site
          }
        }
        progress
        status
        score
      }
    }
    
      `;

      client.query({ query: AnimeInfo }).then(res => {
        console.log("score" + res.data.MediaList.score);
        console.log(res.data);
        this.setState({
          AnimeID: res.data.MediaList.media.id,
          AnimeTitle: res.data.MediaList.media.title.userPreferred,
          AnimeImage: res.data.MediaList.media.coverImage.extraLarge,
          AnimeBanner: res.data.MediaList.media.bannerImage,
          AnimeStatus: res.data.MediaList.media.status,
          AnimeEpisodes: res.data.MediaList.media.episodes,
          AnimeEPDuration: res.data.MediaList.media.duration,
          AnimeDescription: res.data.MediaList.media.description,
          UserAnimeProgress: res.data.MediaList.progress,
          UserAnimeScore: res.data.MediaList.score,
          UserAnimeStatus: res.data.MediaList.status,
          CheckFavourite: res.data.MediaList.media.isFavourite,
          Loaded: true
        });
      });
    });
  }

  ChangedProgress = e => {
    if (isNaN(e.currentTarget.value)) return;
    if (
      e.currentTarget.value > this.state.AnimeEpisodes ||
      e.currentTarget.value < 0
    )
      return;
    if (e.currentTarget.value.length > this.state.AnimeEpisodes.length) return;
    if (
      e.currentTarget.value === "" ||
      e.currentTarget.value === null ||
      e.currentTarget.value === undefined
    )
      return;

    console.log(parseInt(e.currentTarget.value, 10));
    this.setState({ UserAnimeProgress: parseInt(e.currentTarget.value, 10) });
  };

  ChangedScore = e => {
    if (isNaN(e.currentTarget.value)) return; //Check se è un numero
    if (e.currentTarget.value > this.state.UserMaxScore) return;
    if (e.currentTarget.value < 0) return;
    if (
      e.currentTarget.value === "" ||
      e.currentTarget.value === null ||
      e.currentTarget.value === undefined
    )
      return;
    if (e.currentTarget.value.length > this.state.UserMaxScore.length) return;

    if (
      this.state.UserMaxScore === 100 &&
      this.props.ScoreFormat === "POINT_100"
    ) {
      this.setState({ UserAnimeScore: parseInt(e.currentTarget.value, 10) });
    }

    if (
      this.state.UserMaxScore === 10 &&
      this.props.ScoreFormat === "POINT_10"
    ) {
      this.setState({ UserAnimeScore: parseInt(e.currentTarget.value, 10) });
    }

    if (
      this.state.UserMaxScore === 10 &&
      this.props.ScoreFormat === "POINT_10_DECIMAL"
    ) {
      this.setState({ UserAnimeScore: e.currentTarget.value });
    }

    if (this.state.UserMaxScore === 5 && this.props.ScoreFormat === "POINT_5") {
      this.setState({ UserAnimeScore: parseInt(e.currentTarget.value, 10) });
    }

    if (this.state.UserMaxScore === 3 && this.props.ScoreFormat === "POINT_3") {
      this.setState({ UserAnimeScore: parseInt(e.currentTarget.value, 10) });
    }
  };

  StatusChanged = e => {
    this.setState({ UserAnimeStatus: e.target.value });
  };

  saveChangesToList = () => {
    const MUTATE_ENTRY = gql`
    mutation {
      SaveMediaListEntry(id: ${this.props.AnimeID}, status: ${this.state.UserAnimeStatus}, progress: ${this.state.UserAnimeProgress}, score: ${this.state.UserAnimeScore}) {
        status,
        progress,
        score
      }
    }
    `;

    client
      .mutate({ mutation: MUTATE_ENTRY, fetchPolicy: "no-cache" })
      .then(res => {
        this.setState({ Confirmed: !this.state.Confirmed }, () => {
          setTimeout(() => {
            this.setState(
              {
                Confirmed: !this.state.Confirmed,
                Snackbar: !this.state.Snackbar
              },
              () => {
                this.componentDidMount();
              }
            );
          }, 2000);
        });
      });
  };

  DeleteEntry = () => {
    const DELETE_ENTRY = gql`
    mutation {
      DeleteMediaListEntry(id: ${this.props.AnimeID}) {
        deleted
      }
    }
    `;
    client
      .mutate({ mutation: DELETE_ENTRY, fetchPolicy: "no-cache" })
      .then(res => this.props.history.push("/dashboard"));
  };

  SetFavourite = () => {
    const MUTATE_FAV = gql`
      mutation {
        ToggleFavourite(animeId: ${this.state.AnimeID}) {
          anime {
            edges {
              id
            }
          }
        }
      }
      `;

    client
      .mutate({ mutation: MUTATE_FAV, fetchPolicy: "no-cache" })
      .then(res => {
        this.setState({ CheckFavourite: !this.state.CheckFavourite });
        console.log(res);
      });
  };

  closeSnackbar = () => {
    this.setState({ Snackbar: !this.state.Snackbar });
  };

  render() {
    if (this.state.Loaded === false) {
      return (
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
      );
    } else {
      return (
        <div style={{ overflowX: "hidden" }}>
          <Hidden smDown>
            <Grid container>
              <Grid item sm={12}>
                <div
                  style={{
                    backgroundImage: `url(${this.state.AnimeBanner})`,
                    backgroundSize: "cover",
                    height: 400,
                    backgroundPosition: "50% 15%",
                    opacity: 0.7
                  }}
                />
              </Grid>
            </Grid>
          </Hidden>
          <Container>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item md={4}>
                <Card style={{ width: 300, marginTop: 75 }}>
                  <CardMedia
                    style={{ height: 400 }}
                    image={this.state.AnimeImage}
                  />
                </Card>
              </Grid>
              <Grid item md={8}>
                <Typography
                  align="left"
                  variant="h6"
                  style={{ color: "white", marginBottom: 20, marginTop: 75 }}
                >
                  {this.state.AnimeTitle}
                </Typography>
                <Typography
                  align="left"
                  variant="body1"
                  style={{ color: "white" }}
                >
                  {this.state.AnimeDescription}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              style={{ marginBottom: 30 }}
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography
                  align="left"
                  variant="h6"
                  style={{ color: "white", marginTop: 70 }}
                >
                  User Statistics
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  align="left"
                  variant="button"
                  style={{ color: "white" }}
                >
                  Episodes Watched: {this.state.UserAnimeProgress}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  onChange={this.ChangedProgress}
                  fullWidth
                  className="InputProgress"
                  variant="filled"
                  style={{ color: "white" }}
                  label={"Episodes Watched"}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" style={{ color: "white" }}>
                  /{this.state.AnimeEpisodes}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="button" style={{ color: "white" }}>
                  Score: {this.state.UserAnimeScore}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  onChange={this.ChangedScore}
                  fullWidth
                  className="InputProgress"
                  variant="filled"
                  style={{ color: "white" }}
                  label="Anime Score"
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" style={{ color: "white" }}>
                  /{this.state.UserMaxScore}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="button" style={{ color: "white" }}>
                  Status:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Select
                  onChange={this.StatusChanged}
                  fullWidth
                  style={{ color: "white" }}
                  value={this.state.UserAnimeStatus}
                >
                  <MenuItem name="WATCHING" value="CURRENT">
                    Watching
                  </MenuItem>
                  <MenuItem name="PLANNING" value="PLANNING">
                    Planning
                  </MenuItem>
                  <MenuItem name="COMPLETED" value="COMPLETED">
                    Completed
                  </MenuItem>
                  <MenuItem name="DROPPED" value="DROPPED">
                    Dropped
                  </MenuItem>
                  <MenuItem name="PAUSED" value="PAUSED">
                    Paused
                  </MenuItem>
                  <MenuItem name="REPEATING" value="REPEATING">
                    Repeating
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid
              container
              justify="flex-start"
              direction="row"
              alignItems="center"
              style={{ marginBottom: 60 }}
            >
              <Grid item xs={12}>
                {this.state.Confirmed ? (
                  <Button
                    size="large"
                    onClick={this.saveChangesToList}
                    variant="contained"
                    style={{ background: "#65c452", marginRight: 10, marginTop: 5 }}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    size="large"
                    onClick={this.saveChangesToList}
                    variant="contained"
                    style={{ background: "#858585", marginRight: 10, marginTop: 5 }}
                  >
                    Save Changes
                  </Button>
                )}
                {this.state.CheckFavourite ? (
                  <Button
                    onClick={this.SetFavourite}
                    size="large"
                    style={{
                      background: "#d65a98",
                      marginRight: 10, marginTop: 5
                    }}
                    variant="contained"
                  >
                    Favourite
                  </Button>
                ) : (
                  <Button
                    onClick={this.SetFavourite}
                    size="large"
                    style={{
                      background: "#858585",
                      marginRight: 10, marginTop: 5
                    }}
                    variant="contained"
                  >
                    Favourite
                  </Button>
                )}
                <Button
                  onClick={this.DeleteEntry}
                  size="large"
                  style={{
                    background: "#e33832", marginTop: 5
                  }}
                  variant="contained"
                >
                  Delete Entry
                </Button>
              </Grid>
            </Grid>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={this.state.Snackbar}
              autoHideDuration={6000}
              onClose={this.closeSnackbar}
              message={"Your Animelist has been updated successfully"}
            />
          </Container>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(withRouter(comp_animePage));
