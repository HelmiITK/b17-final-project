import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

import Main from "../../components/NotificationComponent/Main";
import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";

const NotificationPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full relative ">
        <div className="pt-24 lg:pt-32 w-full lg:w-9/12 mx-auto pb-10">
          <div>
            <Link to="/">
              <h3 className="flex items-center font-semibold duration-300 hover:scale-105 hover:underline ml-4 lg:ml-0">
                <span className="mr-3">
                  <FaArrowLeft />
                </span>
                Kembali ke beranda
              </h3>
            </Link>
          </div>
          <div className="mx-2 md:mx-10 mt-5 ">
            <Main />
          </div>
        </div>
        <div className="bg-layer absolute top-0 left-0 right-0 -z-10 h-[40vh] md:h-[30vh] lg:h-64"></div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationPage;