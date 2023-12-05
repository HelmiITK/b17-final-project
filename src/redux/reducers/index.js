import { combineReducers } from "redux";
import categoryReducers from "./categoryReducers";
import courseReducers from "./courseReducers";

export default combineReducers({
  category: categoryReducers,
  course: courseReducers,
});
