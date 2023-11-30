import { FiEdit3 } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { HiOutlineLogout } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { MdMenuBook } from "react-icons/md";

const HamburgerMenuAccount = ({ handleHamburgerClick, openHamburger }) => {
   return (
      <div className="relative mt-3 ml-5 lg:hidden z-50">
         <button
            className="text-indigo-600"
            onClick={handleHamburgerClick}
         >
            {openHamburger ? (
               <RxCross2 className="w-10 h-9" />
            ) : (
               < MdMenuBook className="w-10 h-9" />
            )}
         </button>
         <div className={`${openHamburger ? "-translate-x-24 md:-translate-x-[230px]" : "-translate-x-[685px] md:-translate-x-[877px]"}
                        transition-transform duration-300 ease-in-out absolute top-0 right-0 mt-11  bg-gradient-to-br via-indigo-300 from-indigo-600 bg-indigo-100 border-2 border-indigo-300 px-5 py-6 rounded-xl shadow-xl `}>
            <ul className="flex flex-col gap-3 text-left items-left">
               {/* link profil saya */}
               <li>
                  <NavLink as={Link} to={'/user'}>
                     <div className="flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg items-center text-sm group hover:bg-indigo-600 duration-500">
                        <FiEdit3 className="w-8 h-6 text-indigo-600 group-hover:text-white" />
                        <span className="text-indigo-800 font-medium group-hover:text-white">Profil Saya</span>
                     </div>
                  </NavLink>
               </li>
               {/* link ubah password */}
               <li>
                  <NavLink as={Link} to={'/changepassword'}>
                     <div className="flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-white items-center text-sm group hover:bg-indigo-600 duration-500">
                        <IoSettingsSharp className="w-8 h-6 text-indigo-600 group-hover:text-white" />
                        <span className="text-indigo-800 font-medium group-hover:text-white">Ubah Password</span>
                     </div>
                  </NavLink>
               </li>
               {/* link riwayat pembayaran */}
               <li>
                  <NavLink as={Link} to={'/historypayment'}>
                     <div className="flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-white items-center text-sm group hover:bg-indigo-600 duration-500">
                        <SlBasket className="w-8 h-6 text-indigo-600 group-hover:text-white" />
                        <span className="text-indigo-800 font-medium ml-2 group-hover:text-white">Riwayat Pembayaran</span>
                     </div>
                  </NavLink>
               </li>
               {/* link ini logout dan ditampilkan jika sudah punya akun dan login */}
               <li>
                  <NavLink as={Link} to={''}>
                     <div className="flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-white items-center text-sm group hover:bg-indigo-600 duration-500">
                        <HiOutlineLogout className="w-8 h-6 text-indigo-600 group-hover:text-white" />
                        <span className="text-indigo-800 font-medium group-hover:text-white">Keluar</span>
                     </div>
                  </NavLink>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default HamburgerMenuAccount;

HamburgerMenuAccount.propTypes = {
   // selectedIcon: PropTypes.string,
   handleHamburgerClick: PropTypes.func,
   // handleIconClick: PropTypes.func,
   openHamburger: PropTypes.bool
}