import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from '../../components/AccountComponent/ButtonBack';
import MenuList from '../../components/AccountComponent/MenuList'
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const UserPage = () => {
   const [openHamburger, setOpenHamburger] = useState(false);
   const [showPasswordLama, setShowPasswordLama] = useState(false);
   const [showPasswordBaru, setShowPasswordBaru] = useState(false);
   const [showPasswordUlang, setShowPasswordUlang] = useState(false);
   // const [passwordInput, setPasswordInput] = useState('bangUdahBang');

   // fungsi buka tutup hamburger menu
   const handleHamburgerClick = () => {
      setOpenHamburger(!openHamburger);
   };
   
   const handleTogglePasswordLama = () => {
      setShowPasswordLama(!showPasswordLama);
   }

   const handleTogglePasswordBaru = () => {
      setShowPasswordBaru(!showPasswordBaru);
   }

   const handleTogglePasswordUlang = () => {
      setShowPasswordUlang(!showPasswordUlang);
   }

   // const handlePasswordChange = (e) => {
   //    setPasswordInput(e.target.value);
   // };

   return (
      <>
         <div className="w-full relative">
            <div className="bg-layer w-full h-64 pt-24"></div>
            <div className="container mx-auto -mt-40 lg:-mt-32">
               {/* button kembali ke beranda/home */}
               <ButtonBack />

               {/* card border */}
               <div className="h-full max-w-3xl lg:mx-auto  mt-4 bg-white border-2 border-indigo-600 mx-4 rounded-2xl items-center">
                  {/* heading akun */}
                  <div className="bg-indigo-600 rounded-t-lg py-4 text-center">
                     <h1 className="text-white font-bold text-lg">Akun</h1>
                  </div>

                  {/* hamburger menu akun di mobile*/}
                  <HamburgerMenuAccount
                     handleHamburgerClick={handleHamburgerClick}
                     openHamburger={openHamburger}
                  />

                  <div className='flex flex-col justify-center items-center mb-10 lg:mt-8 lg:flex lg:flex-row lg:justify-around'>
                     {/* menu pilihan pada laptop */}
                     <div className='lg:-mt-[136px]'>
                        <MenuList />
                     </div>
                     {/* card ubah password */}
                     <div className='-mt-4 lg:mt-3'>
                        {/* heading ubah password */}
                        <div className="text-center font-semibold text-xl mb-5">
                           Ubah Password
                        </div>
                        {/* input update password */}
                        <div className='flex flex-col items-center gap-4'>
                           {/* masukkan password lama */}
                           <div className='flex flex-col'>
                              <label htmlFor="lama" className='text-sm font-medium mb-2 text-gray-800'>
                                 Masukkan Password Lama
                              </label>
                              <div className='relative w-64'>
                                 <input
                                    type={showPasswordLama ? 'text' : 'password'}
                                    id='lama'
                                    // value={passwordInput}
                                    // onChange={handlePasswordChange}
                                    className='w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-4'
                                 />
                                 <button
                                    className='absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none'
                                    onClick={handleTogglePasswordLama}
                                 >
                                    {showPasswordLama ? <BsEye /> :  <BsEyeSlash />}
                                 </button>
                              </div>
                           </div>
                           {/* masukkan password baru */}
                           <div className='flex flex-col'>
                              <label htmlFor="baru" className='text-sm font-medium mb-2 text-gray-800'>
                                 Masukkan Password Baru
                              </label>
                              <div className='relative w-64'>
                                 <input
                                    type={showPasswordBaru ? 'text' : 'password'}
                                    id='baru'
                                    className='w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-4'
                                 />
                                 <button
                                    className='absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none'
                                    onClick={handleTogglePasswordBaru}
                                 >
                                    {showPasswordBaru ? <BsEye /> : <BsEyeSlash />}
                                 </button>
                              </div>
                           </div>
                           {/* ulangin password baru */}
                           <div className='flex flex-col'>
                              <label htmlFor="ulang" className='text-sm font-medium mb-2 text-gray-800'>
                                 Ulangi Password Baru
                              </label>
                              <div className='relative w-64'>
                                 <input
                                    type={showPasswordUlang ? 'text' : 'password'}
                                    id='ulang'
                                    className='w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-4'
                                 />
                                 <button
                                    className='absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none'
                                    onClick={handleTogglePasswordUlang}
                                 >
                                    {showPasswordUlang ? <BsEye /> : <BsEyeSlash />}
                                 </button>
                              </div>
                           </div>
                           {/* button simpan perubahan */}
                           <button className='mt-2 border-none bg-indigo-500 rounded-2xl py-3 px-6 font-semibold text-sm text-white hover:bg-indigo-700'>
                              Ubah Password
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default UserPage;