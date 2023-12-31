import { FiEdit3 } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { MdMenuBook } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { getMe, logout } from "../../redux/actions/authActions";
import { removeMyCourse } from "../../redux/actions/courseActions";

const HamburgerMenuAccount = ({ handleHamburgerClick, openHamburger }) => {
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

  // memeriksa apakah user ada jika tidak maka akan navigate ke home
  useEffect(() => {
    if (token) {
      dispatch(getMe(navigate, null, "/"));
    }
  }, [dispatch, navigate, token]);

  return (
    // ini baru muncul saat masuk mode mobile dan tablet
    <div className="relative mt-3 ml-5 lg:hidden z-50">
      <button className="text-color-primary" onClick={handleHamburgerClick}>
        {openHamburger ? (
          <RxCross2 className="w-10 h-9" />
        ) : (
          <MdMenuBook className="w-10 h-9" />
        )}
      </button>
      <div
        className={`${openHamburger
          ? "-translate-x-24 md:-translate-x-[230px]"
          : "-translate-x-[685px] md:-translate-x-[877px]"
          }
                        transition-transform duration-300 ease-in-out absolute top-0 right-0 mt-11  bg-gradient-to-br via-blue-300 from-color-primary bg-blue-200 border-2 border-blue-300 px-5 py-6 rounded-xl shadow-xl `}
      >
        <ul className="flex flex-col gap-3 text-left items-left">
          {/* link profil saya */}
          <li>
            <NavLink
              as={Link}
              to={"/user"}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row gap-2 py-2 px-3 rounded-lg items-center text-sm bg-primary text-white"
                  : "flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-blue-800 items-center text-sm hover:bg-primary hover:text-white duration-500"
              }
            >
              <FiEdit3 className="w-8 h-6" />
              <span className="font-medium">Profil Saya</span>
            </NavLink>
          </li>
          {/* link ubah password */}
          <li>
            <NavLink
              as={Link}
              to={"/changepassword"}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row gap-2 py-2 px-3 rounded-lg items-center text-sm bg-primary text-white"
                  : "flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-blue-800 items-center text-sm hover:bg-primary hover:text-white duration-500"
              }
            >
              <IoSettingsSharp className="w-8 h-6" />
              <span className="font-medium">Ubah Password</span>
            </NavLink>
          </li>
          {/* link riwayat pembayaran */}
          <li>
            <NavLink
              as={Link}
              to={"/historypayment"}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row gap-2 py-2 px-3 rounded-lg items-center text-sm bg-primary text-white"
                  : "flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-blue-800 items-center text-sm hover:bg-primary hover:text-white duration-500"
              }
            >
              <SlBasket className="w-8 h-6" />
              <span className="font-medium">Riwayat Pembayaran</span>
            </NavLink>
          </li>
          {/* link ini logout dan ditampilkan jika sudah punya akun dan login */}
          <li>
            {user && (
              <NavLink
                onClick={onLogout}
                as={Link}
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 py-2 px-3 rounded-lg items-center text-sm bg-primary text-white"
                    : "flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-blue-800 items-center text-sm hover:bg-primary hover:text-white duration-500"
                }
              >
                <HiOutlineLogout className="w-8 h-6" />
                <span className="font-medium">Keluar</span>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenuAccount;

HamburgerMenuAccount.propTypes = {
  // selectedIcon: PropTypes.string,
  handleHamburgerClick: PropTypes.func,
  // handleIconClick: PropTypes.func,
  openHamburger: PropTypes.bool,
};