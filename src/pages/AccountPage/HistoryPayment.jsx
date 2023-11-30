import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from '../../components/AccountComponent/ButtonBack';
import MenuList from '../../components/AccountComponent/MenuList'
import Card from '../../components/MyCourseComponent/Card';

const UserPage = () => {
   const [openHamburger, setOpenHamburger] = useState(false);

   const handleHamburgerClick = () => {
      setOpenHamburger(!openHamburger);
   };

   return (
      <>
         <div className="w-full relative">
            <div className="bg-layer w-full h-64 pt-24"></div>
            <div className="container mx-auto -mt-40 lg:-mt-32">
               {/* button kembali ke beranda/home */}
               <ButtonBack />

               {/* card border */}
               <div className="h-full max-w-3xl lg:mx-auto  mt-4 bg-white border-2 border-indigo-600 mx-4 rounded-2xl items-center mb-6">
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
                        <div className='flex flex-col items-center gap-4 shadow-xl rounded-3xl'>
                           <Card />
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