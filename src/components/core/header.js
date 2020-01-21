import React, { Component } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";
import StopOutlinedIcon from "@material-ui/icons/StopOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    Avatar: state.Avatar,
    Username: state.Username
  };
};

class header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DrawerOpen: false
    };
  }
  handleDrawerOpen = () => {
    this.setState({ DrawerOpen: !this.state.DrawerOpen });
  };

  clickedComp = () => {
    this.props.history.push("/dashboard");
  };

  redirectToCompleted = e => {
    this.props.history.push("/completed");
  };

  redirectToPaused = () => {
    this.props.history.push("/paused");
  };

  redirectToPlanning = () => {
    this.props.history.push("/planning");
  };

  redirectToDropped = () => {
    this.props.history.push("/dropped");
  };

  redirectToRepeating = () => {
    this.props.history.push("/repeating");
  };

  redirectToSearch = () => {
    this.props.history.push("/search")
  }

  render() {
    return (
      <div className="disable-select">
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              ANIHELPER
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          variant="temporary"
          anchor="left"
          open={this.state.DrawerOpen}
          onOpen={this.handleDrawerOpen}
          onClose={this.handleDrawerOpen}
        >
          <Divider />
          <List>
            <ListItem>
              <img alt="" src={this.props.Avatar} />
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography align="center" variant="h6">
                  {this.props.Username}
                </Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem button>
              <DashboardOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText onClick={this.clickedComp} primary="Dashboard" />
            </ListItem>
            <Divider />
            <ListItem button>
              <SettingsOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText primary="Settings" />
            </ListItem>
            <Divider />
            <ListItem button>
              <SearchOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText onClick={this.redirectToSearch} primary="Search" />
            </ListItem>
            <Divider />
            <ListItem button>
              <InfoOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText primary="About" />
            </ListItem>
            <Divider />
            <ListItem style={{ marginTop: 20 }}>
              <Typography align="left" variant="button">
                Anime
              </Typography>
            </ListItem>
            <Divider />
            <ListItem button>
              <DoneOutlineOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText
                onClick={this.redirectToCompleted}
                primary={<Typography variant="body2">Completed</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <PauseCircleOutlineOutlinedIcon
                fontSize="small"
                style={{ margin: 5 }}
              />
              <ListItemText
                onClick={this.redirectToPaused}
                primary={<Typography variant="body2">Paused</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <RepeatOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText
                onClick={this.redirectToRepeating}
                primary={<Typography variant="body2">Repeating</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListAltOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText
                onClick={this.redirectToPlanning}
                primary={<Typography variant="body2">Planning</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <StopOutlinedIcon fontSize="small" style={{ margin: 5 }} />
              <ListItemText
                onClick={this.redirectToDropped}
                primary={<Typography variant="body2">Dropped</Typography>}
              />
            </ListItem>
            <Divider />
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(header));
