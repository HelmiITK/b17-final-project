import { combineReducers } from "redux";
import categoryReducers from "./categoryReducers";
import courseReducers from "./courseReducers";
import authReducers from "./authReducers";

export default combineReducers({
  category: categoryReducers,
  course: courseReducers,
  auth: authReducers
});
