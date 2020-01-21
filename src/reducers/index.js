import { combineReducers } from "redux";
import Username from "./usersReducers/userName";
import Avatar from "./usersReducers/userAvatar";
import AnimeID from './animeReducers/animeID'
import ScoreFormat from './usersReducers/userScoreFormat'

const rootReducer = combineReducers({
  Username,
  Avatar,
  AnimeID,
  ScoreFormat,
});

export default rootReducer;
