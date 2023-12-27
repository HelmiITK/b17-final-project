import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from '../../components/AccountComponent/ButtonBack';
import MenuList from '../../components/AccountComponent/MenuList'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Navbar from '../../components/NavbarComponent/Navbar';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../redux/actions/authActions';
import Footer from '../../components/FooterComponent/Footer';

const UserPage = () => {
   const dispatch = useDispatch();
   const [openHamburger, setOpenHamburger] = useState(false);
   const [showPasswords, setShowPasswords] = useState({
      lama: false,
      baru: false,
      ulangi: false,
   });

   const [passwords, setPasswords] = useState({
      lama: "",
      baru: "",
      ulangi: "",
   });

   // fungsi buka tutup hamburger menu
   const handleHamburgerClick = () => {
      setOpenHamburger(!openHamburger);
   };

   // fungsi untuk merubah status showPasswords menjadi true ke false atau sebaliknya untuk password tertentu
   // disertai dengan parameter inputName untuk mengetahui password mana yang sedang di handle atau dieksekusi
   const handleTogglePassword = (inputName) => () => {
      setShowPasswords((prevShowPasswords) => ({
         ...prevShowPasswords,
         [inputName]: !prevShowPasswords[inputName],
      }));
   };

   // fungsi untuk mengupdate nilai dari masing-masing password jika terjadi perubahan pada input
   const handleInputChange = (inputName) => (event) => {
      const inputValue = event.target.value;
      setPasswords((prevPasswords) => ({
         ...prevPasswords,
         [inputName]: inputValue,
      }));
   };

   const handleChangePassword = async () => {
      try {
         // validasi bahwa semua data harus terisi
         if (!passwords.lama || !passwords.baru || !passwords.ulangi) {
            alert('Silahkan lengkapi semua data terlebih dahulu.')
            return;
         }

         // validasi bahwa password baru dan konfirmasi password sesuai
         if (passwords.baru !== passwords.ulangi) {
            alert('Password baru dan konfirmasi password tidak sesuai')
            return;
         }

         // panggil aksi updatePassword
         await dispatch(updatePassword(passwords.lama, passwords.baru));      

      } catch (error) {
         console.error("Terjadi kesalahan:", error);
         alert('Terjadi Kesalahan Saat Mengubah Password!');
      }
   }

   return (
      <>
         <Navbar />
         <div className="w-full relative">
            <div className="bg-layer w-full h-64 pt-24"></div>
            <div className="container mx-auto -mt-40 lg:-mt-32">
               {/* button kembali ke beranda/home */}
               <ButtonBack />

               {/* card border */}
               <div className="h-full max-w-3xl lg:mx-auto  mt-4 bg-white border-2 border-color-primary mx-4 rounded-2xl items-center">
                  {/* heading akun */}
                  <div className="bg-primary rounded-t-lg py-4 text-center">
                     <h1 className="text-white font-bold text-lg">Akun</h1>
                  </div>

                  {/* hamburger menu akun di mobile dan tablet*/}
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
                                    type={showPasswords.lama ? 'text' : 'password'}
                                    id='lama'
                                    className='w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-4'
                                    onChange={handleInputChange('lama')}
                                 />
                                 {passwords.lama && (
                                    <button
                                       className='absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none'
                                       onClick={handleTogglePassword('lama')}
                                    >
                                       {showPasswords.lama ? <BsEye /> : <BsEyeSlash />}
                                    </button>
                                 )}
                              </div>
                           </div>
                           {/* masukkan password baru */}
                           <div className='flex flex-col'>
                              <label htmlFor="baru" className='text-sm font-medium mb-2 text-gray-800'>
                                 Masukkan Password Baru
                              </label>
                              <div className='relative w-64'>
                                 <input
                                    type={showPasswords.baru ? 'text' : 'password'}
                                    id='baru'
                                    className='w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-4'
                                    onChange={handleInputChange('baru')}
                                 />
                                 {passwords.baru && (
                                    <button
                                       className='absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none'
                                       onClick={handleTogglePassword('baru')}
                                    >
                                       {showPasswords.baru ? <BsEye /> : <BsEyeSlash />}
                                    </button>
                                 )}
                              </div>
                           </div>
                           {/* ulangin password baru */}
                           <div className='flex flex-col'>
                              <label htmlFor="ulang" className='text-sm font-medium mb-2 text-gray-800'>
                                 Ulangi Password Baru
                              </label>
                              <div className='relative w-64'>
                                 <input
                                    type={showPasswords.ulangi ? 'text' : 'password'}
                                    id='ulang'
                                    className='w-64 text-xs rounded-xl border-2 border-slate-300 py-2 px-4'
                                    onChange={handleInputChange('ulangi')}
                                 />
                                 {passwords.ulangi && (
                                    <button
                                       className='absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none'
                                       onClick={handleTogglePassword('ulangi')}
                                    >
                                       {showPasswords.ulangi ? <BsEye /> : <BsEyeSlash />}
                                    </button>
                                 )}
                              </div>
                           </div>
                           {/* button simpan perubahan */}
                           <button
                              onClick={handleChangePassword}
                              className='mt-2 border-none bg-blue-600 rounded-2xl py-3 px-6 font-semibold text-sm text-white hover:bg-primary'>
                              Ubah Password
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default UserPage;