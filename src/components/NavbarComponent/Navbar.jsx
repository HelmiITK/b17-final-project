import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { LuLogIn } from "react-icons/lu";
import { TfiMenuAlt } from "react-icons/tfi";
// import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/actions/authActions";
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [navbar, setNavbar] = useState(false);

  // ambil get me di redux
  const { user, token } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    e.preventDefault();
    // const searchquery = e.target.search.value;
    if (search.trim() === "") {
      return;
    }
    const searchUrl = `/search?search=${search}&page=1`;
    navigate(searchUrl);
    setSearch("");
  };

  // get me with redux
  useEffect(() => {
    if (token) {
      dispatch(getMe(navigate, null, "/"));
    }
  }, [dispatch, navigate, token]);

  // logic ketika diklik diluar hamburgermenu maka otomatis tertutup dan begitu juga ketika klik pindah halaman
  useEffect(() => {
    const closeHamburgerMenu = () => {
      setOpenHamburger(false);
    };

    // Menambahkan event listener ke window
    window.addEventListener("click", closeHamburgerMenu);
  }, []);

  // logic navbar on scroll to blur background
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleHamburgerClick = (e) => {
    e.stopPropagation();
    setOpenHamburger(!openHamburger);
    // setSelectedIcon(null);
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  const Menus = [
    {
      name: "Home",
      icon: <IoMdHome className="w-8 h-6" />,
      link: "/",
      dis: "translate-x-[4px]",
    },
    {
      name: "Kelasku",
      icon: <TfiMenuAlt className="w-8 h-6" />,
      link: "/mycourse",
      dis: "translate-x-[83px]",
    },
    // {
    //   name: "Notifikasi",
    //   icon: <IoNotifications className="w-8 h-6" />,
    //   link: "/notif",
    //   dis: "translate-x-[175px]",
    // },
    {
      name: "Akun",
      icon: <FaUser className="w-8 h-6" />,
      link: "/user",
      dis: "translate-x-[257px]",
    },
  ];

  return (
    <>
      <nav
        className={`w-full fixed z-20 bg-primary ${
          navbar
            ? "bg-primary bg-opacity-60 backdrop-blur-sm shadow-black shadow-sm duration-500"
            : ""
        }`}
      >
        <div className="flex justify-between px-2 py-4 lg:pt-6 lg:px-10 items-center">
          {/* logo */}
          <div>
            <Link to={"/"}>
              <svg
                className="w-10 h-10 lg:w-12 lg:h-12"
                width="82"
                height="79"
                viewBox="0 0 82 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="40.9462"
                  cy="39.4052"
                  rx="40.9462"
                  ry="39.4052"
                  fill="white"
                />
                <path
                  d="M26.9044 63.62C26.9044 63.8233 26.8578 64.01 26.7644 64.18C26.6711 64.3467 26.5278 64.4817 26.3344 64.585C26.1411 64.6883 25.9011 64.74 25.6144 64.74H25.0844V66H24.2294V62.49H25.6144C25.8944 62.49 26.1311 62.5383 26.3244 62.635C26.5178 62.7317 26.6628 62.865 26.7594 63.035C26.8561 63.205 26.9044 63.4 26.9044 63.62ZM25.5494 64.06C25.7128 64.06 25.8344 64.0217 25.9144 63.945C25.9944 63.8683 26.0344 63.76 26.0344 63.62C26.0344 63.48 25.9944 63.3717 25.9144 63.295C25.8344 63.2183 25.7128 63.18 25.5494 63.18H25.0844V64.06H25.5494ZM28.2046 63.175V63.885H29.3496V64.545H28.2046V65.315H29.4996V66H27.3496V62.49H29.4996V63.175H28.2046ZM31.3696 62.49C31.7396 62.49 32.063 62.5633 32.3396 62.71C32.6163 62.8567 32.8296 63.0633 32.9796 63.33C33.133 63.5933 33.2096 63.8983 33.2096 64.245C33.2096 64.5883 33.133 64.8933 32.9796 65.16C32.8296 65.4267 32.6146 65.6333 32.3346 65.78C32.058 65.9267 31.7363 66 31.3696 66H30.0546V62.49H31.3696ZM31.3146 65.26C31.638 65.26 31.8896 65.1717 32.0696 64.995C32.2496 64.8183 32.3396 64.5683 32.3396 64.245C32.3396 63.9217 32.2496 63.67 32.0696 63.49C31.8896 63.31 31.638 63.22 31.3146 63.22H30.9096V65.26H31.3146ZM35.8874 62.49V64.88C35.8874 65.25 35.7824 65.535 35.5724 65.735C35.3658 65.935 35.0858 66.035 34.7324 66.035C34.3624 66.035 34.0658 65.93 33.8424 65.72C33.6191 65.51 33.5074 65.2117 33.5074 64.825H34.3574C34.3574 64.9717 34.3874 65.0833 34.4474 65.16C34.5074 65.2333 34.5941 65.27 34.7074 65.27C34.8108 65.27 34.8908 65.2367 34.9474 65.17C35.0041 65.1033 35.0324 65.0067 35.0324 64.88V62.49H35.8874ZM37.4181 62.49V64.59C37.4181 64.8 37.4697 64.9617 37.5731 65.075C37.6764 65.1883 37.8281 65.245 38.0281 65.245C38.2281 65.245 38.3814 65.1883 38.4881 65.075C38.5947 64.9617 38.6481 64.8 38.6481 64.59V62.49H39.5031V64.585C39.5031 64.8983 39.4364 65.1633 39.3031 65.38C39.1697 65.5967 38.9897 65.76 38.7631 65.87C38.5397 65.98 38.2897 66.035 38.0131 66.035C37.7364 66.035 37.4881 65.9817 37.2681 65.875C37.0514 65.765 36.8797 65.6017 36.7531 65.385C36.6264 65.165 36.5631 64.8983 36.5631 64.585V62.49H37.4181ZM42.2885 65.38H40.9785L40.7685 66H39.8735L41.1435 62.49H42.1335L43.4035 66H42.4985L42.2885 65.38ZM42.0685 64.72L41.6335 63.435L41.2035 64.72H42.0685ZM46.93 66H46.075L44.645 63.835V66H43.79V62.49H44.645L46.075 64.665V62.49H46.93V66ZM49.8797 63.6C49.8164 63.4833 49.7247 63.395 49.6047 63.335C49.4881 63.2717 49.3497 63.24 49.1897 63.24C48.9131 63.24 48.6914 63.3317 48.5247 63.515C48.3581 63.695 48.2747 63.9367 48.2747 64.24C48.2747 64.5633 48.3614 64.8167 48.5347 65C48.7114 65.18 48.9531 65.27 49.2597 65.27C49.4697 65.27 49.6464 65.2167 49.7897 65.11C49.9364 65.0033 50.0431 64.85 50.1097 64.65H49.0247V64.02H50.8847V64.815C50.8214 65.0283 50.7131 65.2267 50.5597 65.41C50.4097 65.5933 50.2181 65.7417 49.9847 65.855C49.7514 65.9683 49.4881 66.025 49.1947 66.025C48.8481 66.025 48.5381 65.95 48.2647 65.8C47.9947 65.6467 47.7831 65.435 47.6297 65.165C47.4797 64.895 47.4047 64.5867 47.4047 64.24C47.4047 63.8933 47.4797 63.585 47.6297 63.315C47.7831 63.0417 47.9947 62.83 48.2647 62.68C48.5347 62.5267 48.8431 62.45 49.1897 62.45C49.6097 62.45 49.9631 62.5517 50.2497 62.755C50.5397 62.9583 50.7314 63.24 50.8247 63.6H49.8797ZM53.2729 62.49V66H52.4179V62.49H53.2729ZM54.7475 65.34H55.8675V66H53.8925V62.49H54.7475V65.34ZM60.2503 62.49V66H59.3953V63.895L58.6103 66H57.9203L57.1303 63.89V66H56.2753V62.49H57.2853L58.2703 64.92L59.2453 62.49H60.2503ZM61.7052 62.49V64.59C61.7052 64.8 61.7568 64.9617 61.8602 65.075C61.9635 65.1883 62.1152 65.245 62.3152 65.245C62.5152 65.245 62.6685 65.1883 62.7752 65.075C62.8818 64.9617 62.9352 64.8 62.9352 64.59V62.49H63.7902V64.585C63.7902 64.8983 63.7235 65.1633 63.5902 65.38C63.4568 65.5967 63.2768 65.76 63.0502 65.87C62.8268 65.98 62.5768 66.035 62.3002 66.035C62.0235 66.035 61.7752 65.9817 61.5552 65.875C61.3385 65.765 61.1668 65.6017 61.0402 65.385C60.9135 65.165 60.8502 64.8983 60.8502 64.585V62.49H61.7052Z"
                  fill="#003E9C"
                />
                <path
                  d="M42.5987 50.9841H30.7888C30.4316 50.9988 30.082 51.0881 29.764 51.2459C29.446 51.4036 29.1672 51.6261 28.9469 51.8979L16.1855 64.1993C15.7835 64.5874 15.4375 65.2653 14.7557 65.0295C14.0739 64.7937 14.3079 64.047 14.3079 63.5115C14.3079 59.8319 14.3079 56.1425 14.2774 52.4629C14.2513 51.935 14.3437 51.408 14.5484 50.9178C14.753 50.4277 15.065 49.9861 15.463 49.6233C21.1042 44.239 26.7097 38.8334 32.2797 33.4065C33.3635 32.3601 33.5925 32.3896 34.4778 33.6374C35.872 35.6025 37.2916 37.5234 38.6298 39.5326C39.2862 40.5152 39.7594 40.5152 40.6194 39.6849C45.3718 35.0031 50.1853 30.3901 54.9632 25.7673C56.8509 23.9447 58.7489 22.1368 60.6264 20.3044C61.3337 19.6215 61.9443 19.5527 62.6617 20.3338C66.2897 24.3475 68.0604 28.9507 67.5312 34.3154C66.8697 41.0949 63.2825 45.9879 57.1511 49.1959C55.0908 50.3385 52.7597 50.9477 50.3837 50.9645C47.7989 50.935 45.2141 50.9645 42.6241 50.9645L42.5987 50.9841Z"
                  fill="#003E9C"
                />
                <path
                  d="M32.8593 14.3393C37.6539 14.3393 42.4485 14.3932 47.238 14.3393C50.4296 14.2435 53.6042 14.8244 56.5371 16.041C57.6365 16.5069 57.7892 16.8796 56.9443 17.7034C52.9946 21.5351 49.0398 25.3537 45.0799 29.1592C43.7362 30.4588 42.3518 31.7191 41.0386 33.053C40.3566 33.7444 39.929 33.5434 39.4455 32.8813C37.9185 30.7726 36.3458 28.6933 34.8646 26.565C34.2844 25.7411 33.8925 25.6675 33.129 26.413C27.4047 31.9708 21.6583 37.5173 15.8898 43.0523C15.6302 43.3024 15.4114 43.7045 14.9685 43.5917C14.5257 43.4789 14.6275 42.9934 14.5257 42.6599C14.144 41.4339 14.5919 40.2079 14.5868 39.0015C14.5359 31.4445 14.5512 23.8825 14.5512 16.3254C14.5512 14.5158 14.709 14.3638 16.5871 14.3638C22.0061 14.3475 27.4301 14.3393 32.8593 14.3393Z"
                  fill="#0094FF"
                />
              </svg>
            </Link>
          </div>

          <div className="md:flex md:flex-row-reverse md:gap-8 md:items-center">
            {/* search mobile */}
            {/* {user && ( */}
            <div className="relative flex gap-4 lg:hidden">
              <div className="md:hidden">
                <BiSearchAlt
                  className="cursor-pointer w-10 h-10 border rounded-xl py-1
                                    bg-primary text-white 
                                    hover:bg-white hover:text-color-primary hover:duration-100 "
                  onClick={handleSearchClick}
                />
                <form
                  action="search"
                  onSubmit={handleSearch}
                  className={`${
                    isSearchOpen ? "-translate-x-28" : "-translate-x-[750px]"
                  }  transition-transform duration-500 ease-in-out absolute top-0 right-0 flex`}
                >
                  <input
                    name="search"
                    type="text"
                    className="border-none w-44 h-10 pl-4 transform font-poppins rounded-s-2xl text-sm"
                    placeholder="Cari Kursus Terbaik..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-white py-1 rounded-e-2xl border-none"
                  >
                    <BiSearchAlt className="w-8 h-8 py-1 mr-2 rounded-2xl text-color-primary hover:bg-primary hover:text-white cursor-pointer" />
                  </button>
                </form>
              </div>

              {/* Navmenu mobile */}
              <div className="relative">
                <button
                  className=" lg:hidden text-white focus:outline-none"
                  onClick={handleHamburgerClick}
                >
                  {openHamburger ? (
                    <RxCross2 className="w-10 h-9" />
                  ) : (
                    <FiMenu className="w-10 h-9" />
                  )}
                </button>
                <div
                  className={`${
                    openHamburger ? "translate-y-0" : "-translate-y-[290px]"
                  } transition-transform duration-300 ease-in-out absolute top-0 right-0 mt-16  bg-gradient-to-l from-indigo-200 border border-indigo-300 px-5 py-6 rounded-md shadow-lg `}
                >
                  <ul className="flex flex-col gap-4">
                    {!user ? (
                      // if not login
                      <NavLink as={Link} to={"/login"}>
                        <li
                          onClick={() => handleIconClick("Masuk")}
                          className="flex flex-row-reverse"
                        >
                          {selectedIcon === "Masuk" ? (
                            <div className="flex flex-row-reverse gap-2  bg-primary py-2 px-3 rounded-lg text-white">
                              <LuLogIn className="w-8 h-6" />
                              <span className="ml-2">Masuk</span>
                            </div>
                          ) : (
                            <LuLogIn className="w-8 h-6 text-color-primary" />
                          )}
                        </li>
                      </NavLink>
                    ) : (
                      // if login
                      <>
                        <NavLink as={Link} to={"/"}>
                          <li
                            onClick={() => handleIconClick("home")}
                            className="flex flex-row-reverse"
                          >
                            {selectedIcon === "home" ? (
                              <div className="flex flex-row-reverse gap-2  bg-primary py-2 px-3 rounded-lg text-white">
                                <IoMdHome className="w-8 h-6" />
                                <span>Kelas</span>
                              </div>
                            ) : (
                              <IoMdHome className="w-8 h-6 text-color-primary" />
                            )}
                          </li>
                        </NavLink>
                        <NavLink as={Link} to={"/mycourse"}>
                          <li
                            onClick={() => handleIconClick("Kelas")}
                            className="flex flex-row-reverse"
                          >
                            {selectedIcon === "Kelas" ? (
                              <div className="flex flex-row-reverse gap-2  bg-primary py-2 px-3 rounded-lg text-white">
                                <TfiMenuAlt className="w-8 h-6" />
                                <span>Kelas</span>
                              </div>
                            ) : (
                              <TfiMenuAlt className="w-8 h-6 text-color-primary" />
                            )}
                          </li>
                        </NavLink>
                        {/* <NavLink as={Link} to={"/notif"}>
                            <li
                              onClick={() => handleIconClick("Notifikasi")}
                              className="flex flex-row-reverse"
                            >
                              {selectedIcon === "Notifikasi" ? (
                                <div className="flex flex-row-reverse gap-2  bg-primary py-2 px-3 rounded-lg text-white">
                                  <IoNotifications className="w-8 h-6" />
                                  <span>Notifkasi</span>
                                </div>
                              ) : (
                                <IoNotifications className="w-8 h-6 text-color-primary" />
                              )}
                            </li>
                          </NavLink> */}
                        <NavLink as={Link} to={"/user"}>
                          <li
                            onClick={() => handleIconClick("Akun")}
                            className="flex flex-row-reverse"
                          >
                            {selectedIcon === "Akun" ? (
                              <div className="flex flex-row-reverse gap-2  bg-primary py-2 px-3 rounded-lg text-white">
                                <FaUser className="w-8 h-6 " />
                                <span>Akun</span>
                              </div>
                            ) : (
                              <FaUser className="w-8 h-6 text-color-primary" />
                            )}
                          </li>
                        </NavLink>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* )} */}

            {/* search web*/}
            {/* {user && ( */}
            <div className="hidden md:block lg:block">
              <form
                action="search"
                className="font-poppins flex"
                onSubmit={handleSearch}
              >
                <input
                  name="search"
                  type="text"
                  className="border-none py-3 px-4 rounded-s-2xl bg-white text-sm lg:text-base lg:w-[500px]"
                  placeholder="Cari kursus terbaik..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className=" bg-white rounded-e-2xl flex items-center px-2"
                >
                  <BiSearchAlt className="border bg-primary text-white w-10 h-10 rounded-xl py-1 cursor-pointer hover:shadow-md hover:bg-blue-700 " />
                </button>
              </form>
            </div>
            {/* )} */}
          </div>

          {/* NavMenu Web */}
          <div className="hidden items-center lg:flex">
            {/* if not login  */}
            {!user ? (
              // if not login
              <NavLink
                as={Link}
                to={"/login"}
                className="group relative flex flex-row-reverse gap-2 mr-8 font-poppins text-white items-center font-semibold border-2 border-white p-2 rounded-2xl transition-all hover:text-color-primary hover:bg-white"
              >
                <button className="">Masuk</button>
                <div className="">
                  <FaArrowRightLong className="text-white w-8 h-6 mr-2 transition-all group-hover:mr-4" />
                  <LuLogIn className="w-8 h-8 absolute top-1/2 transform -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-2" />
                </div>
              </NavLink>
            ) : (
              <>
                <ul className="flex flex-row gap-8">
                  {Menus.map((item, index) => (
                    <li
                      className="flex items-center text-white cursor-pointer "
                      key={index}
                    >
                      <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                          isActive
                            ? "flex flex-row gap-2 border-none bg-secondary py-2 pl-2 pr-3 rounded-lg"
                            : "text-white flex flex-row gap-2 hover:text-cyan-300 duration-200 hover:scale-105"
                        }
                      >
                        {item.icon} {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
