import { Link } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { HiOutlineLogout } from "react-icons/hi";

const Menu = () => {
   return (
      // menu list ini ada ketika di mode laptop
      <div className='hidden lg:block'>
         <Link to={'/user'}>
            <div className='flex items-center gap-2 font-semibold text-sm hover:text-indigo-600 hover:scale-105 duration-300'>
               <FiEdit3 className='text-indigo-600 w-10 h-6' />
               <p>Profil Saya</p>
            </div>
         </Link>
         <hr className='w-full my-3' />
         <Link to={'/changepassword'}>
            <div className='flex items-center gap-2 font-semibold text-sm hover:text-indigo-600 hover:scale-105 duration-300'>
               <IoSettingsSharp className='text-indigo-600 w-10 h-6' />
               <p>Ubah Password</p>
            </div>
         </Link>
         <hr className='w-full my-3' />
         <Link to={'/historypayment'}>
            <div className='flex items-center gap-2 font-semibold text-sm hover:text-indigo-600 hover:scale-105 duration-300'>
               <SlBasket className='text-indigo-600 w-10 h-6' />
               <p>Riwayat Pembayaran</p>
            </div>
         </Link>
         <hr className='w-full my-3' />
         {/* ini baru muncul ketika sudah login */}
         <div className='flex items-center gap-2 font-semibold text-sm hover:text-indigo-600 hover:scale-105 duration-300'>
            <HiOutlineLogout className='text-indigo-600 w-10 h-6' />
            <p>Keluar</p>
         </div>
         <hr className='w-full my-3' />
      </div>
   )
}

export default Menu;