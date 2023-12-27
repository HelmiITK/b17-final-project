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
  const [activeIcon, setActiveIcon] = useState(null);

  const handleInstagramClick = (e) => {
    e.stopPropagation(); // Mencegah propagasi ke event click window
    setDropdownVisibleIg(!isDropdownVisibleIg);
    setActiveIcon("instagram");
    // ini otomatis tertutup ketika ig yang diklik
    setDropdownVisibleFb(false);
    setDropdownVisibleGithub(false);
    setDropdownVisibleLk(false);
  };

  const handleFacebookClick = (e) => {
    e.stopPropagation(); // Mencegah propagasi ke event click window
    setDropdownVisibleFb(!isDropdownVisibleFb);
    setActiveIcon("facebook");
    // ini otomatis tertutup ketika fb yang diklik
    setDropdownVisibleGithub(false);
    setDropdownVisibleIg(false);
    setDropdownVisibleLk(false);
  };

  const handleGithubClick = (e) => {
    e.stopPropagation(); // Mencegah propagasi ke event click window
    setDropdownVisibleGithub(!isDropdownVisibleGithub);
    setActiveIcon("github");
    // ini otomatis tertutup ketika github yang diklik
    setDropdownVisibleFb(false);
    setDropdownVisibleIg(false);
    setDropdownVisibleLk(false);
  };

  const handleLinkedInClick = (e) => {
    e.stopPropagation(); // Mencegah propagasi ke event click window
    setDropdownVisibleLk(!isDropdownVisibleLk);
    setActiveIcon("linkedin");
    // ini otomatis tertutup ketika Linkedin yang diklik
    setDropdownVisibleFb(false);
    setDropdownVisibleGithub(false);
    setDropdownVisibleIg(false);
  };

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownVisibleIg(false);
      setDropdownVisibleFb(false);
      setDropdownVisibleGithub(false);
      setDropdownVisibleLk(false);
      setActiveIcon(null);
    };

    // Menambahkan event listener ke window
    window.addEventListener("click", closeDropdown);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <>
      <div className="w-full h-auto mt-4 px-4 py-8 border-t-4 border-color-primary bg-slate-950 overflow-x-auto">
        {/* baris 1 */}
        <div className="flex flex-row gap-8 md:px-10 justify-between lg:justify-around">
          <div className="flex flex-col gap-2">
            {/* about app */}
            <div className="flex flex-col gap-3 mb-2">
              <h1 className="text-white font-semibold text-base lg:text-lg">
                Tentang Aplikasi
              </h1>
              <div className="flex flex-col gap-2 z-20 max-w-md">
                <div className="flex flex-row items-center gap-2">
                  <MdMenuBook className="text-white w-10 h-10 lg:w-12 lg:h-12" />
                  <h2 className="text-sm text-white lg:text-base">
                    Pedjuang Ilmu
                  </h2>
                </div>
                <span className="text-sm font-light text-slate-300 lg:text-base">
                  Website di mana semua orang mampu menjadi sehebat Putin,
                  sepintar Bj Habibi dan sejenius Alber Einstein
                </span>
              </div>
            </div>
            {/* follow us */}
            <div className="flex flex-row gap-4 mt-3">
              <IoLogoInstagram
                className={`w-7 h-8 text-white animate-pulse hover:bg-blue-800 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer lg:w-9 lg:h-9
                                ${activeIcon === "instagram"
                    ? "bg-pink-600 rounded-full p-[3px]"
                    : ""
                  }         
                        `}
                onClick={handleInstagramClick}
              />
              {isDropdownVisibleIg && (
                <div className="absolute bg-black border border-pink-500 p-2 mt-10 lg:mt-12 rounded shadow flex flex-row gap-5">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-pink-500 mb-2">
                      FrontEnd:
                    </h1>
                    {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                    <a
                      href="https://www.instagram.com/ajkaaa_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-pink-400 text-sm hover:underline"
                    >
                      Azka
                    </a>
                    <a
                      href="https://www.instagram.com/6ntrwsnu_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-pink-400 text-sm hover:underline"
                    >
                      Guntur
                    </a>
                    <a
                      href="https://www.instagram.com/helmitwzzz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-pink-400 text-sm hover:underline"
                    >
                      Helmi
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-pink-500 mb-2">
                      BackEnd:
                    </h1>
                    <a
                      href="https://www.instagram.com/adeliapaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-pink-400 text-sm hover:underline"
                    >
                      Adel
                    </a>
                    <a
                      href="https://www.instagram.com/amarafiif"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-pink-400 text-sm hover:underline"
                    >
                      Ammar
                    </a>
                    <a
                      href="https://www.instagram.com/henawah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-pink-400 text-sm hover:underline"
                    >
                      Hena
                    </a>
                    <a
                      href="https://www.instagram.com/nouva_rp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-pink-400 text-sm hover:underline"
                    >
                      Nouva
                    </a>
                  </div>
                </div>
              )}
              <CiFacebook
                className={`w-7 h-8 text-white animate-pulse hover:bg-blue-800 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer lg:w-9 lg:h-9
                                ${activeIcon === "facebook"
                    ? "bg-blue-600 rounded-full px-[2px]"
                    : ""
                  }         
                        `}
                onClick={handleFacebookClick}
              />
              {isDropdownVisibleFb && (
                <div className="absolute bg-black border border-blue-600 p-2 mt-10 lg:mt-12 rounded shadow flex flex-row gap-5">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-blue-600 mb-2">
                      FrontEnd:
                    </h1>
                    {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Azka
                    </a>
                    <a
                      href="https://www.instagram.com/6ntrwsnu_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Guntur
                    </a>
                    <a
                      href="https://www.instagram.com/helmitwzzz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Helmi
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-blue-600 mb-2">
                      BackEnd:
                    </h1>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Adel
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Ammar
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Hena
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Nova
                    </a>
                  </div>
                </div>
              )}
              <VscGithubInverted
                className={`w-7 h-8  animate-pulse hover:bg-blue-800 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer lg:w-9 lg:h-9
                                ${activeIcon === "github"
                    ? "bg-green-400 text-black rounded-full p-[3px]"
                    : "text-white"
                  }         
                        `}
                onClick={handleGithubClick}
              />
              {isDropdownVisibleGithub && (
                <div className="absolute bg-black border border-green-400 p-2 mt-10 lg:mt-12 rounded shadow flex flex-row gap-5">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-green-400 mb-2">
                      FrontEnd:
                    </h1>
                    {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Azka
                    </a>
                    <a
                      href="https://www.instagram.com/6ntrwsnu_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Guntur
                    </a>
                    <a
                      href="https://www.instagram.com/helmitwzzz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Helmi
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-green-400 mb-2">
                      BackEnd:
                    </h1>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Adel
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Ammar
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Hena
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Nova
                    </a>
                  </div>
                </div>
              )}
              <PiLinkedinLogo
                className={`w-7 h-8 text-white animate-pulse hover:bg-blue-800 hover:p-1 hover:rounded-full hover:text-slate-950 duration-300 ease-in-out cursor-pointer lg:w-9 lg:h-9
                                ${activeIcon === "linkedin"
                    ? "bg-blue-400 rounded-full p-[3px]"
                    : ""
                  }         
                        `}
                onClick={handleLinkedInClick}
              />
              {isDropdownVisibleLk && (
                <div className="absolute bg-black border border-blue-400 p-2 mt-10 lg:mt-12 rounded shadow flex flex-row gap-5">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-blue-400 mb-2">
                      FrontEnd:
                    </h1>
                    {/* fyi: kenapa tidak menggunakan Link dari react-router-dom? karena kondisi disini bertujuan untuk ngelink yg diarahkan ke tautan eksternal sehingga kinerja react-router-dom tidak diperlukan*/}
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Azka
                    </a>
                    <a
                      href="https://www.instagram.com/6ntrwsnu_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Guntur
                    </a>
                    <a
                      href="https://www.instagram.com/helmitwzzz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Helmi
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-blue-400 mb-2">
                      BackEnd:
                    </h1>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Adel
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Ammar
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Hena
                    </a>
                    <a
                      href="https://www.instagram.com/_happiness_o/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
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
              <h1 className="text-white font-semibold text-base lg:text-lg">
                Develope
              </h1>
              <ul className="text-blue-500 text-sm flex flex-col gap-1 lg:text-base">
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Reactjs
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  ExpressJs
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  TailwindCss
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Vite
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Vercel
                </li>
              </ul>
            </div>
            {/* test 2 */}
            <div className="flex flex-col gap-2">
              <h1 className="text-white font-semibold text-base lg:text-lg">
                Tools
              </h1>
              <ul className="text-blue-500 text-sm flex flex-col gap-1 lg:text-base">
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Vscode
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Postman
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Git&Github
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Swagger
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* baris 2 */}
        <div className="flex flex-col text-center my-4 mt-7">
          <hr className="mb-4" />
          <div className="flex flex-row justify-center gap-1 items-baseline mt-4">
            <h2 className="font-semibold text-base text-white">
              Pedjuang Ilmu
            </h2>
            <p className="text-sm text-white font-light">company</p>
          </div>
          <div className="flex flex-row justify-center place-items-center gap-1 text-sm text-slate-400 mt-3">
            <p className="">Copyright</p>
            <span className="text-sm">&copy; 2023 team b-17</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
