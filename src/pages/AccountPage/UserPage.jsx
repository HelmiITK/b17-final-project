// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from "react";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from '../../components/AccountComponent/ButtonBack';
import Navbar from '../../components/NavbarComponent/Navbar';
import { MdOutlineCameraAlt } from "react-icons/md";
import MenuList from '../../components/AccountComponent/MenuList'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../redux/actions/authActions';
import { updateProfile } from '../../redux/actions/authActions';

const UserPage = () => {
   const dispatch = useDispatch();
   const [openHamburger, setOpenHamburger] = useState(false);
   const [picture, setPicture] = useState(null);
   const [profile, setProfile] = useState({
      avatar: '',
      name: '',
      email: '',
      phoneNumber: '',
      country: '',
      city: '',
   });

   const { user } = useSelector((state) => state.auth);
   // console.log(user);

   // ambil data user dari redux
   useEffect(() => {
      // ambil data user di localStorage agar ketika browser di refresh data selalu ada
      const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
      if (storedProfile) {
         setProfile(storedProfile);
      } else {
         dispatch(getMe(null));
      }
   }, [dispatch])

   // Perbarui nilai profil setelah pengguna dari Redux dimuat
   useEffect(() => {
      if (user) {
         setProfile({
            avatar: user?.avatar || '',
            name: user?.name || '',
            email: user?.user?.email , // data tidak bisa diedit
            phoneNumber: user?.no_telp || '',
            country: user?.country || '',
            city: user?.city || '',
         });
      }
   }, [user]);

   const img = useRef();

   const handleHamburgerClick = () => {
      setOpenHamburger(!openHamburger);
   };

   // fungsi update profile
   const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
   };

   const handleSaveProfile = () => {
      // Disni nanti kita akan req ke server database untuk disimpan datanya
      // console.log('Profil disimpan:', profile);

      // validasi apakah semua data sudah diisi
      // if (Object.values(profile).some((value) => value.trim() !== '')) {

         // Panggil fungsi updateProfile dengan data dari state profile
         dispatch(updateProfile(profile.name, profile.phoneNumber, profile.avatar, profile.city, profile.country))

      //    toast.success('Profilmu Berhasil Disimpan Horee🥳', {
      //       position: "top-center",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "colored",
      //    });
      // } else {
      //    toast.error('Harap isi setidaknya satu data profilmu yah!😊')
      // }
   };

   return (
      <>
         <Navbar />
         <div className="w-full relative">
            <div className="bg-layer w-full h-64 pt-24"></div>
            <div className="container mx-auto -mt-40 lg:-mt-32">
               {/* button kembali ke beranda/home */}
               <ButtonBack />

               {/* card border */}
               <div className="max-w-3xl mx-4 lg:mx-auto h-full mt-4 mb-6 bg-white border-2 border-indigo-600 rounded-2xl items-center">
                  {/* heading akun */}
                  <div className="bg-indigo-600 rounded-t-lg py-4 text-center">
                     <h1 className="text-white font-bold text-lg">Akun</h1>
                  </div>

                  {/* hamburger menu akun di mobile dan tablet*/}
                  <HamburgerMenuAccount
                     handleHamburgerClick={handleHamburgerClick}
                     openHamburger={openHamburger}
                  />

                  <div className='flex flex-row justify-center lg:justify-around mt-6'>
                     {/* menu pilihan pada laptop */}
                     <div className='mt-[18px]'>
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
                                    src={profile.avatar ? picture : "https://via.placeholder.com/150.png?text=img"}
                                    alt="avatar"
                                    className='w-28 rounded-full shadow-md'
                                 />
                                 <div className='absolute bottom-8 right-0 flex justify-center items-center z-10 bg-white p-1 rounded-full group'>
                                    <div
                                       className='bg-white rounded-full cursor-pointer p-[2px] group-hover:bg-indigo-600'
                                       onClick={() => img.current.click()}
                                    >
                                       <MdOutlineCameraAlt title='upload avatarmu' className='text-indigo-600 w-5 h-5 group-hover:text-white duration-200' />
                                    </div>
                                    <input
                                       type="file"
                                       ref={img}
                                       hidden
                                       accept='image/*'
                                       onChange={(e) => {
                                          let pic = URL.createObjectURL(e.target.files[0]);
                                          setPicture(pic);
                                       }}
                                    />
                                 </div>
                                 <div className='flex flex-row items-center gap-1 mt-2 mb-1'>
                                    <span className='p-[6px] h-2 rounded-full bg-green-500'></span>
                                    <p className='text-sm'>Online</p>
                                 </div>
                              </div>

                              {/* data user */}
                              <div className="flex flex-col items-center gap-3">
                                 {/* nama */}
                                 <div className="text-left">
                                    <label htmlFor="name" className="block text-gray-800 text-sm font-medium mb-2">
                                       Nama
                                    </label>
                                    <input
                                       type="text"
                                       id="name"
                                       name="name"
                                       placeholder={profile.name}
                                       onChange={handleChange}
                                       className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black" />
                                 </div>
                                 {/* email */}
                                 <div className="text-left">
                                    <label htmlFor="email" className="block text-gray-800 text-sm font-medium mb-2">
                                       Email
                                    </label>
                                    <input
                                       type="email"
                                       id="email"
                                       name="email"
                                       value={profile?.email}
                                       readOnly={user && user?.user && user?.user?.email} // Set readOnly jika email sudah ada di Redux
                                       onChange={handleChange}
                                       className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black" />
                                 </div>
                                 {/* no telepon */}
                                 <div className="text-left">
                                    <label htmlFor="phoneNumber" className="block text-gray-800 text-sm font-medium mb-2">
                                       No Telepon
                                    </label>
                                    <input
                                       type="tel"
                                       id="phoneNumber"
                                       name="phoneNumber"
                                       placeholder={profile.phoneNumber}
                                       onChange={handleChange}
                                       className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black" />
                                 </div>
                                 {/* negara  */}
                                 <div className="text-left">
                                    <label htmlFor="country" className="block text-gray-800 text-sm font-medium mb-2">
                                       Negara
                                    </label>
                                    <input
                                       type="text"
                                       id="country"
                                       name="country"
                                       placeholder={profile.country}
                                       // placeholder="Masukkan Negara Tempat Tinggal"
                                       onChange={handleChange}
                                       className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black" />
                                 </div>
                                 {/* kota */}
                                 <div className="text-left">
                                    <label htmlFor="city" className="block text-gray-800 text-sm font-medium mb-2">
                                       Kota
                                    </label>
                                    <input
                                       type="text"
                                       id="city"
                                       name="city"
                                       placeholder={profile.city}
                                       // placeholder="Masukkan Kota Tempat Tinggal"
                                       onChange={handleChange}
                                       className="w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-2 placeholder-black" />
                                 </div>
                                 {/* button save */}
                                 <div className="mt-2">
                                    <button
                                       onClick={handleSaveProfile}
                                       className={`w-full bg-indigo-500 text-sm font-medium text-white py-2 px-6 rounded-2xl hover:bg-indigo-600 focus:outline-none focus:shadow-outline-blue
                                             ${Object.values(profile).some((value) => value.trim() !== '') ? '' : 'cursor-not-allowed opacity-50'
                                          }`}
                                    >
                                       Simpan Profil Saya
                                    </button>
                                    {/* <ToastContainer /> */}
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
      </>
   )
}

export default UserPage;