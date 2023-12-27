import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Book, Clock, Gem, Shield } from "lucide-react";
import { FaStar } from "react-icons/fa";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from '../../components/AccountComponent/ButtonBack';
import MenuList from '../../components/AccountComponent/MenuList'
import Navbar from '../../components/NavbarComponent/Navbar';
import Footer from '../../components/FooterComponent/Footer';

const UserPage = () => {
   const [openHamburger, setOpenHamburger] = useState(false);

   const handleHamburgerClick = () => {
      setOpenHamburger(!openHamburger);
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
               <div className="h-full max-w-3xl lg:mx-auto  mt-4 bg-white border-2 border-color-primary mx-4 rounded-2xl items-center mb-6">
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
                     <div className='lg:-mt-[280px] ml-4'>
                        <MenuList />
                     </div>
                     {/* card ubah password */}
                     <div className=''>
                        {/* heading ubah password */}
                        <div className="text-center font-semibold text-xl mb-5">
                           Riwayat Pembayaran
                        </div>
                        {/* card history */}
                        <div className='flex flex-col items-center gap-4'>
                           <div className='flex flex-col mx-4 gap-4 pb-4 shadow-xl rounded-3xl lg:w-96 lg:h-auto'>
                              <div>
                                 <img
                                    src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                    className='rounded-t-3xl' />
                              </div>
                              <div className='mx-4 flex justify-between'>
                                 <div>
                                    <h1 className='font-semibold text-color-primary'>UI/UX Desegin</h1>
                                    <h2 className='font-semibold'>Belajar Web Designer dengan Figma</h2>
                                 </div>
                                 <div className='flex items-start gap-1'>
                                    <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" />
                                    <p className='font-medium'>4.7</p>
                                 </div>
                              </div>
                              <div className='mx-4 flex justify-between'>
                                 <div className='flex gap-1 items-center'>
                                    <Shield className='text-green-400' />
                                    <p className='text-sm font-medium'>Pemula</p>
                                 </div>
                                 <div className='flex gap-1 items-center'>
                                    <Book className='text-green-400' />
                                    <p className='text-sm font-medium'>10 Modul</p>
                                 </div>
                                 <div className='flex gap-1 items-center'>
                                    <Clock className='text-green-400' />
                                    <p className='text-sm font-medium'>120 Menit</p>
                                 </div>
                              </div>
                              <div className='mx-4'>
                                 <div className='border-none flex items-center px-4 py-1 bg-green-400 rounded-2xl justify-center gap-2 text-white font-medium text-sm'>
                                    <Gem />
                                    <p>Sudah Dibayar</p>
                                 </div>
                              </div>
                           </div>
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