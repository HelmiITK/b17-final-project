import { FiEdit3 } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { getMe, logout } from "../../redux/actions/authActions";
import { removeMyCourse } from "../../redux/actions/courseActions";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const onLogout = () => {
    Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        dispatch(removeMyCourse());
        navigate("/");
        window.location.reload();
      } else {
        navigate("/user");
      }
    });
  };

  useEffect(() => {
    if (token) {
      dispatch(getMe(navigate, null, "/"));
    }
  }, [dispatch, navigate, token]);
  return (
    // menu list ini ada ketika di mode laptop
    <div className="hidden lg:block">
      <>
        <NavLink
          to={"/user"}
          className={({ isActive }) =>
            isActive
              ? "text-color-secondary text-sm flex gap-2 items-center font-semibold"
              : "text-black text-sm flex items-center gap-2 font-semibold hover:text-color-secondary hover:scale-105 duration-300"
          }
        >
          <FiEdit3 className="text-color-secondary w-10 h-6" />
          <p>Profil Saya</p>
        </NavLink>
        <hr className="w-full my-3" />
        <NavLink
          to={"/changepassword"}
          className={({ isActive }) =>
            isActive
              ? "text-color-secondary text-sm flex gap-2 items-center font-semibold"
              : "text-black text-sm flex items-center gap-2 font-semibold hover:text-color-secondary hover:scale-105 duration-300"
          }
        >
          <IoSettingsSharp className="text-color-secondary w-10 h-6" />
          <p>Ubah Password</p>
        </NavLink>
        <hr className="w-full my-3" />
        <NavLink
          to={"/historypayment"}
          className={({ isActive }) =>
            isActive
              ? "text-color-secondary text-sm flex gap-2 items-center font-semibold"
              : "text-black text-sm flex items-center gap-2 font-semibold hover:text-color-secondary hover:scale-105 duration-300"
          }
        >
          <SlBasket className="text-color-secondary w-10 h-6" />
          <p>Riwayat Pembayaran</p>
        </NavLink>
        <hr className="w-full my-3" />
        {/* ini baru muncul ketika sudah login */}
        {user && (
          <button onClick={onLogout}>
            <div className="flex items-center gap-2 font-semibold text-sm hover:text-color-secondary hover:scale-105 duration-300">
              <HiOutlineLogout className="text-color-secondary w-10 h-6" />
              <p>Keluar</p>
            </div>
          </button>
        )}
        <hr className="w-full my-3" />
      </>
    </div>
  );
};

export default Menu;