import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from "../../components/AccountComponent/ButtonBack";
import MenuList from "../../components/AccountComponent/MenuList";
import Navbar from "../../components/NavbarComponent/Navbar";
import Footer from "../../components/FooterComponent/Footer";
import CardHistory from "../../components/HistoryPaymentComponent/CardHistory";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourse } from "../../redux/actions/courseActions";

const HistoryPayment = () => {
  const [openHamburger, setOpenHamburger] = useState(false);

  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyCourse());
  }, [dispatch]);

  const { mycourse } = useSelector((state) => state.course);

  // sorting berdasarkan tanggal terbaru
  const sortEnroll =
    mycourse &&
    [...mycourse].sort((a, b) => {
      const dateA = new Date(a.enrolled_at).getTime();
      const dateB = new Date(b.enrolled_at).getTime();

      return dateB - dateA;
    });

  return (
    <>
      <Navbar />
      <div className="w-full relative">
        <div className="bg-layer w-full h-64 pt-24"></div>
        <div className="container mx-auto -mt-40 lg:-mt-32 ">
          {/* button kembali ke beranda/home */}
          <ButtonBack />

          {/* card border */}
          <div className="h-full max-w-3xl lg:mx-auto   mt-4 bg-white border-2 border-color-primary mx-4 rounded-2xl items-center mb-6">
            {/* heading akun */}
            <div className="bg-primary rounded-t-lg py-4 text-center">
              <h1 className="text-white font-bold text-lg tracking-wider">
                Riwayat{" "}
              </h1>
            </div>

            {/* hamburger menu akun di mobile dan tablet*/}
            <HamburgerMenuAccount
              handleHamburgerClick={handleHamburgerClick}
              openHamburger={openHamburger}
            />

            <div className=" flex flex-col justify-center  lg:mt-8 lg:flex lg:flex-row lg:justify-around">
              {/* menu pilihan pada laptop */}
              <div className="">
                <div className="pt-1 ml-10 pl-3">
                  <MenuList />
                </div>
              </div>
              {/* card ubah password */}
              <div className="">
                {/* heading ubah password */}
                <div className="text-center font-semibold text-xl mb-5">
                  Riwayat Pembayaran
                </div>
                {/* card history */}
                <div className="flex flex-col items-center gap-4 h-96 overflow-y-scroll">
                  {sortEnroll &&
                    sortEnroll.map((course) => (
                      <div
                        key={course.course.id}
                        className=" pb-4 rounded-3xl w-10/12 sm:w-8/12 md:w-6/12 lg:w-96 lg:h-auto"
                      >
                        <CardHistory course={course} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPayment;
