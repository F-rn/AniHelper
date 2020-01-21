import React, { Component } from "react";
import {
  CssBaseline,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  LinearProgress,
  Hidden,
  Fade,
  Grow
} from "@material-ui/core";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { client } from "../../client";
import {
  InsertAvatar,
  InsertUsername,
  InsertAnimeID,
  InsertScoreFormat
} from "../../actions/index";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    Avatar: state.Avatar,
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

class comp_dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      totalCount: null,
      minutesWatched: null,
      volumesRead: null,
      chaptersRead: null,
      currentlyWatching: [],
      currentlyReading: [],
      Loaded: false,
      MediaIdList: null
    };
  }
  componentDidMount() {
    this.setState({ Loaded: false }, () => {
      //Scroll to top of the window everytime the function gets called
      window.scrollTo(0, 0);

      const UserID = gql`
        {
          Viewer {
            id
            name
            mediaListOptions {
              scoreFormat
            }
            avatar {
              large
            }
          }
        }
      `;
      client
        .query({ query: UserID })
        .then(user => {
          this.props.InsertUsername(user.data.Viewer.name);
          this.props.InsertAvatar(user.data.Viewer.avatar.large);
          this.props.InsertScoreFormat(
            user.data.Viewer.mediaListOptions.scoreFormat
          );

          const UserDATA = gql`
          {

            Viewer {
              id
              avatar {
                large
                medium
              }
              name
              mediaListOptions {
                scoreFormat
              }
              statistics
              {
                anime {
                  count
                  episodesWatched
                  meanScore
              }
                manga
                {
                  count
                  volumesRead
                  chaptersRead
                }
              }
            }

            medialist: Page(page: 1, perPage: 50) {
              mediaList(userName: "${this.props.Username}", status: CURRENT, type: ANIME) {
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
                  nextAiringEpisode {
                    id
                    episode
                    airingAt
                    timeUntilAiring
                  }
                  coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                  episodes
                }
                progress
              }
            }

            mangalist: Page(page: 1, perPage: 50) {
              mediaList(userName: "${this.props.Username}", status: CURRENT, type: MANGA) {
                id
                mediaId
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
                  chapters
                }
                progress
              }
            }
          }`;

          client
            .query({ query: UserDATA })
            .then(data => {
              let AnimeRoot = data.data.medialist;

              let UserRoot = data.data.Viewer;
              let MangaRoot = data.data.mangalist;

              console.log(data);

              this.setState({
                currentlyWatching: Object.assign(
                  this.state.currentlyWatching,
                  AnimeRoot.mediaList
                ),
                currentlyReading: Object.assign(
                  this.state.currentlyReading,
                  MangaRoot.mediaList
                ),
                userID: UserRoot.id,
                Loaded: true
              });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }

  componentWillUnmount() {
    console.log("Componente smontato");
  }

  EntryClicked = data => {
    this.props.InsertAnimeID(data);
    this.props.history.push("/anime");
    console.log(data);
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
      <div className="disable-select">
        <CssBaseline />
        <Grid
          justify="center"
          alignItems="flex-start"
          container
          style={{ display: "flex" }}
        >
          <Grid item xs={12}>
            <Typography
              style={{ color: "white", marginTop: 70, padding: 20 }}
              variant="h6"
            >
              Currently Watching
            </Typography>
          </Grid>

          {this.state.currentlyWatching.map((anime, index) => {
            let AiringEpisode = null;
            let TimeUntilAir = null;
            let FinalPhrase = null;

            if (anime.media.nextAiringEpisode === null) {
              FinalPhrase = "Finished Airing";
            } else {
              AiringEpisode = anime.media.nextAiringEpisode.episode;
              TimeUntilAir = anime.media.nextAiringEpisode.timeUntilAiring;

              let seconds = parseInt(TimeUntilAir, 10);
              let EpisodeDays = Math.floor(seconds / (3600 * 24));
              seconds -= EpisodeDays * 3600 * 24;
              let EpisodeHours = Math.floor(seconds / 3600);
              seconds -= EpisodeHours * 3600;
              let EpisodeMinutes = Math.floor(seconds / 60);
              seconds -= EpisodeMinutes * 60;

              if (EpisodeDays > 0) {
                FinalPhrase = `Episode ${AiringEpisode} airing in: ${EpisodeDays} days, ${EpisodeHours} hours`;
              } else {
                FinalPhrase = `Episode ${AiringEpisode} airing in: ${EpisodeHours} hours, ${EpisodeMinutes} minutes`;
              }
            }
            return (
              <Grow in={true} key={index}>
                <Grid item xl={2}>
                  <Card
                    onClick={() => this.EntryClicked(anime.id)}
                    style={{
                      margin: 5,
                      width: 260
                    }}
                    variant="elevation"
                  >
                    <CardContent>
                      <Grid container>
                        <Grid item md={12}>
                          <Typography variant="body2" style={{ fontSize: 12 }}>
                            {FinalPhrase}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardMedia
                      style={{
                        height: 250,
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
                        <Typography variant="body1">
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
                        <Typography variant="body2">
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(comp_dashboard));
