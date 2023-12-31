import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../redux/actions/authActions";

const NoAccessToken = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // paksa user ke halaman home jika memaksa masuk ke beberapa halaman tertentu
  useEffect(() => {
    dispatch(getMe(navigate, "/", null));
  }, [dispatch, navigate]);

  return children;
};

export default NoAccessToken;
