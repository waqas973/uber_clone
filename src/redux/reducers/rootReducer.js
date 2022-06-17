import UserLogin from "./UserLogin";
import ActionMode from "./ActionMode";
import SelectedLocation from "./SelectedLocation";
import CometChat from "./CometChat";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  UserLogin,
  ActionMode,
  SelectedLocation,
  CometChat,
});
