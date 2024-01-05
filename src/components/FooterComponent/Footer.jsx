import { IoLogoInstagram } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { VscGithubInverted } from "react-icons/vsc";
import { PiLinkedinLogo } from "react-icons/pi";
import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import PropTypes from "prop-types"

const Footer = ({ linkRef, goto }) => {

  const [isDropdownVisibleIg, setDropdownVisibleIg] = useState(false);
  const [isDropdownVisibleFb, setDropdownVisibleFb] = useState(false);
  const [isDropdownVisibleGithub, setDropdownVisibleGithub] = useState(false);
  const [isDropdownVisibleLk, setDropdownVisibleLk] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      // Tentukan batasan scroll di mana button harus muncul
      const threshold = documentHeight - windowHeight - 350;

      // Tampilkan atau sembunyikan button berdasarkan batasan scroll
      setShowScrollToTop(scrollY > threshold);
    };

    // Tambahkan event listener untuk mendengarkan perubahan posisi scroll
    window.addEventListener("scroll", handleScroll);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    // Menggunakan ref dari Navbar untuk kembali ke atas
    goto(linkRef.current);
  };

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
                  <svg
                    className="cursor-pointer"
                    onClick={() => goto(linkRef.current)}
                    width="54"
                    height="51"
                    viewBox="0 0 54 51"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.3296 36.655H16.5197C16.1625 36.6697 15.8129 36.759 15.4949 36.9168C15.1769 37.0745 14.8981 37.297 14.6778 37.5688L1.91637 49.8702C1.5144 50.2583 1.1684 50.9362 0.48657 50.7004C-0.195258 50.4646 0.0388023 49.7179 0.0388023 49.1824C0.0388023 45.5028 0.0388023 41.8134 0.00827269 38.1338C-0.0178334 37.6059 0.0746008 37.0789 0.279237 36.5887C0.483874 36.0986 0.795872 35.657 1.19384 35.2942C6.83503 29.9099 12.4406 24.5043 18.0106 19.0774C19.0944 18.031 19.3233 18.0605 20.2087 19.3083C21.6029 21.2734 23.0225 23.1943 24.3607 25.2035C25.0171 26.1861 25.4903 26.1861 26.3502 25.3558C31.1027 20.674 35.9162 16.061 40.6941 11.4382C42.5818 9.61558 44.4797 7.80771 46.3573 5.97527C47.0646 5.29241 47.6752 5.22363 48.3926 6.00475C52.0206 10.0184 53.7913 14.6216 53.2621 19.9863C52.6006 26.7658 49.0134 31.6588 42.882 34.8668C40.8217 36.0094 38.4906 36.6186 36.1146 36.6354C33.5298 36.6059 30.9449 36.6354 28.355 36.6354L28.3296 36.655Z" fill="#003E9C" />
                    <path d="M18.5901 0.0101885C23.3848 0.0101885 28.1794 0.0641326 32.9689 0.0101885C36.1605 -0.0856241 39.335 0.495298 42.268 1.71188C43.3674 2.17776 43.5201 2.55046 42.6752 3.37434C38.7255 7.206 34.7707 11.0246 30.8108 14.8301C29.4671 16.1297 28.0827 17.39 26.7695 18.7239C26.0874 19.4153 25.6599 19.2143 25.1764 18.5522C23.6494 16.4435 22.0767 14.3642 20.5955 12.2359C20.0153 11.412 19.6234 11.3384 18.8599 12.0839C13.1355 17.6417 7.38914 23.1882 1.62068 28.7232C1.3611 28.9733 1.14224 29.3754 0.699423 29.2626C0.256609 29.1498 0.358405 28.6643 0.256609 28.3308C-0.125128 27.1048 0.322776 25.8788 0.317686 24.6724C0.266788 17.1154 0.282058 9.55339 0.282058 1.99631C0.282058 0.186733 0.439842 0.0347086 2.31799 0.0347086C7.73695 0.0183619 13.161 0.0101885 18.5901 0.0101885Z" fill="#0094FF" />
                  </svg>
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
                      href="https://web.facebook.com/boong.boong.509511"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Azka
                    </a>
                    <a
                      href="https://www.facebook.com/guntur.wisnu.52/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Guntur
                    </a>
                    <a
                      href="https://www.facebook.com/helmiseferagic?mibextid=hIlR13"
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
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Adel
                    </a>
                    <a
                      href="https://www.facebook.com/amarjln16/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Ammar
                    </a>
                    <a
                      href="https://www.facebook.com/hena.w.395"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-500 text-sm hover:underline"
                    >
                      Hena
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=100074013050498&mibextid=vk8aRt"
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
                      href="https://github.com/azkanaon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Azka
                    </a>
                    <a
                      href="https://github.com/GunturWS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Guntur
                    </a>
                    <a
                      href="https://github.com/HelmiITK"
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
                      href="https://github.com/AdeliaPutriAdyani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Adel
                    </a>
                    <a
                      href="https://github.com/amarafiif"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Ammar
                    </a>
                    <a
                      href="https://github.com/henawah/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-green-300 text-sm hover:underline"
                    >
                      Hena
                    </a>
                    <a
                      href="https://github.com/NoRp-11"
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
                      href="https://www.linkedin.com/in/muhammad-azka-atqiya-85977721b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Azka
                    </a>
                    <a
                      href="https://id.linkedin.com/in/guntur-wisnu-167121222"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Guntur
                    </a>
                    <a
                      href="https://www.linkedin.com/in/helmi-a53b55286/"
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
                      href="https://www.linkedin.com/in/adeliaputria/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Adel
                    </a>
                    <a
                      href="https://www.linkedin.com/in/muhammad-ammar-afif-2b9741218/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Ammar
                    </a>
                    <a
                      href="https://www.linkedin.com/in/hena-wah-082b5b27b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block hover:text-blue-300 text-sm hover:underline"
                    >
                      Hena
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nouva-rizqy-p-7b3327260/"
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
                  <a
                    href="https://react.dev/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Reactjs
                  </a>
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  <a
                    href="https://expressjs.com/"
                    target="_blank"
                    rel="noopener noreferrer">
                    ExpressJs
                  </a>
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  <a
                    href="https://tailwindcss.com/docs/installation"
                    target="_blank"
                    rel="noopener noreferrer">
                    TailwindCss
                  </a>
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  <a
                    href="https://vitejs.dev/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Vite
                  </a>
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    Vercel
                  </a>
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
                  <a
                    href="https://code.visualstudio.com/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Vscode
                  </a>
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  <a
                    href="https://www.postman.com/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Postman
                  </a>
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Git&Github
                  </a>
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  <a
                    href="https://swagger.io/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Swagger
                  </a>
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
        {/* Button Scroll to Top */}
        {showScrollToTop && (
          <button
            className="fixed bottom-10 right-10 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 animate-bounce"
            onClick={handleScrollToTop}
          >
            <IoArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default Footer;

Footer.propTypes = {
  linkRef: PropTypes.object,
  goto: PropTypes.func
}
