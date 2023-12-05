import axios from "axios";
import { setCategory } from "../reducers/categoryReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/categories`);

    const data = response.data.categories;

    dispatch(setCategory(data));
  } catch (error) {
    alert(error.message);
  }
};
