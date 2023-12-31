import { useEffect, useRef, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import MenuList from "../../components/AccountComponent/MenuList";
import { getMe } from "../../redux/actions/authActions";
import { updateProfile } from "../../redux/actions/authActions";
import { updateAvatar } from "../../redux/reducers/authReducers";
import Footer from "../../components/FooterComponent/Footer";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from "../../components/AccountComponent/ButtonBack";
import Navbar from "../../components/NavbarComponent/Navbar";

const UserPage = () => {
  const dispatch = useDispatch();
  const [openHamburger, setOpenHamburger] = useState(false);
  const [picture, setPicture] = useState(null);
  const [profile, setProfile] = useState({
    avatar: "",
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
  });
  // state mengecek apakah ada perubahan pada inputan
  const [isProfileChanged, setIsProfleChanged] = useState(false);

  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  // Perbarui nilai profil setelah pengguna dari Redux dimuat
  useEffect(() => {
    if (user) {
      setProfile({
        avatar: user?.avatar || "",
        name: user?.name || "",
        email: user?.user?.email, // data tidak bisa diedit
        phoneNumber: user?.no_telp || "",
        country: user?.country || "",
        city: user?.city || "",
      });
      // Tetapkan state picture ke URL avatar
      setPicture(user?.avatar || "");
    }
  }, [user]);

  // ambil data user dari redux
  useEffect(() => {
    dispatch(getMe(null));
  }, [dispatch]);

  const img = useRef();

  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
  };

  // fungsi update profile
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    setIsProfleChanged(true);
  };

  const handleSaveProfile = () => {
    dispatch(
      updateProfile(
        profile.name,
        profile.phoneNumber,
        profile.avatar,
        profile.city,
        profile.country
      )
    )
      .then(() => {
        // Dispatch updateAvatar jika avatar diubah
        if (profile.avatar !== user?.avatar) {
          dispatch(updateAvatar(profile.avatar));
        }
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: profile.avatar,
        }));
        setPicture(profile.avatar || ""); // Tetapkan state picture ke URL avatar yang baru
        setIsProfleChanged(false); // Reset isProfileChanged setelah menyimpan profil
      })
      .catch((error) => {
        alert(error?.message);
      });
  };

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      let pic = URL.createObjectURL(selectedFile);
      setPicture(pic);

      // Memeriksa apakah avatar berubah sebelum melakukan pembaruan
      if (selectedFile !== profile.avatar) {
        setProfile((prevProfile) => ({ ...prevProfile, avatar: selectedFile }));

        // Dispatch pembaruan profil dan avatar
        dispatch(
          updateProfile(
            profile.name,
            profile.phoneNumber,
            selectedFile,
            profile.city,
            profile.country
          )
        )
          .then(() => {
            // Dispatch updateAvatar jika avatar diubah
            if (selectedFile !== user?.avatar) {
              dispatch(updateAvatar(selectedFile));
            }
          })
          .catch((error) => {
            alert(error?.message);
          });
      }
    } else {
      console.error("File yang dipilih bukan gambar.");
    }
  };

  // linkref buat onscrol ke home dari footer logo
  const linkRef = useRef(null);

  // back to MainSection when on click logo or text PedjuangIlmu in Footer from homepage
  const goto = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <div className="w-full relative" ref={linkRef}>
        <div className="bg-layer w-full h-64 pt-24"></div>
        <div className="container mx-auto -mt-40 lg:-mt-32">
          {/* button kembali ke beranda/home */}
          <ButtonBack />

          {/* card border */}
          <div className="max-w-3xl mx-4 lg:mx-auto h-full mt-4 mb-6 bg-white border-2 border-color-primary rounded-2xl items-center">
            {/* heading akun */}
            <div className="bg-primary rounded-t-lg py-4 text-center">
              <h1 className="text-white font-bold text-lg">Akun</h1>
            </div>

            {/* hamburger menu akun di mobile dan tablet*/}
            <HamburgerMenuAccount
              handleHamburgerClick={handleHamburgerClick}
              openHamburger={openHamburger}
            />

            <div className="flex flex-row justify-center lg:justify-around mt-6">
              {/* menu pilihan pada laptop */}
              <div className="mt-[18px]">
                <MenuList />
              </div>
              {/* card profile */}
              {/* {user && ( */}
              <>
                <div className="flex flex-col justify-center items-center mb-6">
                  {/*  image profile */}
                  {/* {user && user.user && ( */}
                  <>
                    <div className="relative -mt-10 lg:mt-0 flex flex-col items-center">
                      <img
                        src={
                          profile.avatar
                            ? picture
                            : "https://via.placeholder.com/150.png?text=img"
                        }
                        alt="avatar"
                        className="w-28 rounded-full shadow-md"
                      />
                      <div className="absolute bottom-8 right-0 flex justify-center items-center z-10 bg-white p-1 rounded-full group">
                        <div
                          className="bg-white rounded-full cursor-pointer p-[2px] group-hover:bg-primary"
                          onClick={() => img.current.click()}
                        >
                          <MdOutlineCameraAlt
                            title="upload avatarmu"
                            className="text-color-primary w-5 h-5 group-hover:text-white duration-200"
                          />
                        </div>
                        <input
                          type="file"
                          ref={img}
                          hidden
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div className="flex flex-row items-center gap-1 mt-2 mb-1">
                        <span className="p-[6px] h-2 rounded-full bg-green-500"></span>
                        <p className="text-sm">Online</p>
                      </div>
                    </div>

                    {/* data user */}
                    <div className="flex flex-col items-center gap-3">
                      {/* nama */}
                      <div className="text-left">
                        <label
                          htmlFor="name"
                          className="block text-gray-800 text-sm font-medium mb-2"
                        >
                          Nama
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder={profile.name}
                          onChange={handleChange}
                          className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black"
                        />
                      </div>
                      {/* email */}
                      <div className="text-left">
                        <label
                          htmlFor="email"
                          className="block text-gray-800 text-sm font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profile?.email}
                          readOnly={user && user?.user && user?.user?.email} // Set readOnly jika email sudah ada di Redux
                          onChange={handleChange}
                          className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black"
                        />
                      </div>
                      {/* no telepon */}
                      <div className="text-left">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-gray-800 text-sm font-medium mb-2"
                        >
                          No Telepon
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder={profile.phoneNumber}
                          onChange={handleChange}
                          className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black"
                        />
                      </div>
                      {/* negara  */}
                      <div className="text-left">
                        <label
                          htmlFor="country"
                          className="block text-gray-800 text-sm font-medium mb-2"
                        >
                          Negara
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          placeholder={profile.country}
                          // placeholder="Masukkan Negara Tempat Tinggal"
                          onChange={handleChange}
                          className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black"
                        />
                      </div>
                      {/* kota */}
                      <div className="text-left">
                        <label
                          htmlFor="city"
                          className="block text-gray-800 text-sm font-medium mb-2"
                        >
                          Kota
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          placeholder={profile.city}
                          // placeholder="Masukkan Kota Tempat Tinggal"
                          onChange={handleChange}
                          className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black"
                        />
                      </div>
                      {/* button save */}
                      <div className="mt-2">
                        <button
                          onClick={handleSaveProfile}
                          disabled={!isProfileChanged}
                          className={`w-full bg-blue-600 text-sm font-medium text-white py-2 px-6 rounded-2xl hover:bg-primary focus:outline-none focus:shadow-outline-blue
                                      ${isProfileChanged
                              ? ""
                              : "cursor-not-allowed opacity-50"
                            }`}
                        >
                          Simpan Profil Saya
                        </button>
                      </div>
                    </div>
                  </>
                  {/* )} */}
                </div>
              </>
              {/* // )} */}
            </div>
          </div>
        </div>
      </div>
      <Footer linkRef={linkRef} goto={goto} />
    </>
  );
};

export default UserPage;