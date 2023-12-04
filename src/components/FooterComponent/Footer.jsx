import { IoLogoInstagram } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { VscGithubInverted } from "react-icons/vsc";
import { PiLinkedinLogo } from "react-icons/pi";
import { MdMenuBook } from "react-icons/md";
import { useEffect, useState } from "react";

const Footer = () => {
   const [isDropdownVisibleIg, setDropdownVisibleIg] = useState(false);
   const [isDropdownVisibleFb, setDropdownVisibleFb] = useState(false);
   const [isDropdownVisibleGithub, setDropdownVisibleGithub] = useState(false);
   const [isDropdownVisibleLk, setDropdownVisibleLk] = useState(false);


   const handleInstagramClick = (e) => {
      e.stopPropagation(); // Mencegah propagasi ke event click window
      setDropdownVisibleIg(!isDropdownVisibleIg);
   };

   const handleFacebookClick = (e) => {
      e.stopPropagation(); // Mencegah propagasi ke event click window
      setDropdownVisibleFb(!isDropdownVisibleFb);
   };

   const handleGithubClick = (e) => {
      e.stopPropagation(); // Mencegah propagasi ke event click window
      setDropdownVisibleGithub(!isDropdownVisibleGithub);
   };

   const handleLinkedInClick = (e) => {
      e.stopPropagation(); // Mencegah propagasi ke event click window
      setDropdownVisibleLk(!isDropdownVisibleLk);
   };

   useEffect(() => {
      const closeDropdown = () => {
         setDropdownVisibleIg(false);
         setDropdownVisibleFb(false);
         setDropdownVisibleGithub(false);
         setDropdownVisibleLk(false);
      };

      // Menambahkan event listener ke window
      window.addEventListener('click', closeDropdown);

      // Membersihkan event listener ketika komponen di-unmount
      return () => {
         window.removeEventListener('click', closeDropdown);
      };
   }, []);

   return (
      <>
         <div className="w-full mt-4 px-4 py-8 border-t-4 border-indigo-500 bg-slate-950">
            {/* baris 1 */}
            <div className="flex flex-row gap-8 md:px-10 justify-between lg:justify-around">
               <div className="flex flex-col gap-2">
                  {/* about app */}
                  <div className="flex flex-col gap-3 mb-2">
                     <h1 className="text-white font-semibold text-base">Tentang Aplikasi</h1>
                     <div className="flex flex-col gap-2 z-20 max-w-md">
                        <div className="flex flex-row items-center gap-2">
                           <MdMenuBook className="text-white w-10 h-10" />
                           <h2 className="text-sm text-white">Pedjuang Ilmu</h2>
                        </div>
                        <span className="text-sm font-light text-slate-300">Website di mana semua orang mampu menjadi sehebat Putin, sepintar Bj Habibi dan sejenius Alber Einstein</span>
                     </div>
                  </div>
                  {/* follow us */}
                  <div className="flex flex-row gap-4 mt-3">
                     <IoLogoInstagram
                        className="w-7 h-8 text-white animate-pulse hover:bg-indigo-500 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer"
                        onClick={handleInstagramClick}
                     />
                     {isDropdownVisibleIg && (
                        <div className="absolute bg-black border border-pink-500 p-2 mt-10 rounded shadow flex flex-row gap-5">
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-pink-500 mb-2" >FrontEnd:</h1>
                              {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-pink-400 text-sm">
                                 Azka
                              </a>
                              <a href="https://www.instagram.com/6ntrwsnu_/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-pink-400 text-sm">
                                 Guntur
                              </a>
                              <a href="https://www.instagram.com/helmitwzzz/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-pink-400 text-sm">
                                 Helmi
                              </a>
                           </div>
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-pink-500 mb-2" >BackEnd:</h1>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-pink-400 text-sm">
                                 Adel
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-pink-400 text-sm">
                                 Ammar
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-pink-400 text-sm">
                                 Hena
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-pink-400 text-sm">
                                 Nova
                              </a>
                           </div>
                        </div>
                     )}
                     <CiFacebook
                        className="w-7 h-8 text-white animate-pulse hover:bg-indigo-500 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer"
                        onClick={handleFacebookClick}
                     />
                     {isDropdownVisibleFb && (
                        <div className="absolute bg-black border border-blue-600 p-2 mt-10 ml-11 rounded shadow flex flex-row gap-5">
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-blue-600 mb-2" >FrontEnd:</h1>
                              {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-500 text-sm">
                                 Azka
                              </a>
                              <a href="https://www.instagram.com/6ntrwsnu_/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-500 text-sm">
                                 Guntur
                              </a>
                              <a href="https://www.instagram.com/helmitwzzz/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-500 text-sm">
                                 Helmi
                              </a>
                           </div>
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-blue-600 mb-2" >BackEnd:</h1>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-500 text-sm">
                                 Adel
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-500 text-sm">
                                 Ammar
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-500 text-sm">
                                 Hena
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-500 text-sm">
                                 Nova
                              </a>
                           </div>
                        </div>
                     )}
                     <VscGithubInverted
                        className="w-7 h-8 text-white animate-pulse hover:bg-indigo-500 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer"
                        onClick={handleGithubClick}
                     />
                     {isDropdownVisibleGithub && (
                        <div className="absolute bg-black border border-green-400 p-2 mt-10 ml-[89px] rounded shadow flex flex-row gap-5">
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-green-400 mb-2" >FrontEnd:</h1>
                              {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-green-300 text-sm">
                                 Azka
                              </a>
                              <a href="https://www.instagram.com/6ntrwsnu_/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-green-300 text-sm">
                                 Guntur
                              </a>
                              <a href="https://www.instagram.com/helmitwzzz/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-green-300 text-sm">
                                 Helmi
                              </a>
                           </div>
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-green-400 mb-2" >BackEnd:</h1>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-green-300 text-sm">
                                 Adel
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-green-300 text-sm">
                                 Ammar
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-green-300 text-sm">
                                 Hena
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-green-300 text-sm">
                                 Nova
                              </a>
                           </div>
                        </div>
                     )}
                     <PiLinkedinLogo
                        className="w-7 h-8 text-white animate-pulse hover:bg-indigo-500 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer"
                        onClick={handleLinkedInClick}
                     />
                     {isDropdownVisibleLk && (
                        <div className="absolute bg-black border border-blue-400 p-2 mt-10 ml-32 rounded shadow flex flex-row gap-5">
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-blue-400 mb-2" >FrontEnd:</h1>
                              {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-300 text-sm">
                                 Azka
                              </a>
                              <a href="https://www.instagram.com/6ntrwsnu_/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-300 text-sm">
                                 Guntur
                              </a>
                              <a href="https://www.instagram.com/helmitwzzz/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-300 text-sm">
                                 Helmi
                              </a>
                           </div>
                           <div className="flex flex-col gap-1">
                              <h1 className="text-sm font-semibold text-blue-400 mb-2" >BackEnd:</h1>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-300 text-sm">
                                 Adel
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-300 text-sm">
                                 Ammar
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-300 text-sm">
                                 Hena
                              </a>
                              <a href="https://www.instagram.com/_happiness_o/" target="_blank" rel="noopener noreferrer" className="text-white block hover:text-blue-300 text-sm">
                                 Nova
                              </a>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
               {/* about team */}
               <div className="flex flex-row gap-8 lg:gap-28">
                  {/* test 1 */}
                  <div className="flex flex-col gap-2">
                     <h1 className="text-white font-semibold text-base">Team</h1>
                     <ul className="text-indigo-500 text-sm flex flex-col gap-1">
                        <li>Azka</li>
                        <li>Helmi</li>
                        <li>Guntur</li>
                        <li>Ammar</li>
                        <li>Nova</li>
                        <li>Adel</li>
                        <li>Hena</li>
                     </ul>
                  </div>
                  {/* test 2 */}
                  <div className="flex flex-col gap-2">
                     <h1 className="text-white font-semibold text-base">About</h1>
                     <ul className="text-indigo-500 text-sm flex flex-col gap-1">
                        <li>bingung</li>
                        <li>bingung</li>
                        <li>bingung</li>
                        <li>bingung</li>
                     </ul>
                  </div>
               </div>
            </div>
            {/* baris 2 */}
            <div className="flex flex-col text-center my-4 mt-7">
               <hr className="mb-4" />
               <div className="flex flex-row justify-center gap-1 items-baseline mt-4">
                  <h2 className="font-semibold text-base text-white">Pedjuang Ilmu</h2>
                  <p className="text-sm text-white font-light">company</p>
               </div>
               <div className="flex flex-row justify-center place-items-center gap-1 text-sm text-slate-400 mt-3">
                  <p className="">Copyright</p>
                  <span className="text-sm">&copy; 2023 team b-17</span>
               </div>
            </div>
         </div>
      </>
   )
}

export default Footer