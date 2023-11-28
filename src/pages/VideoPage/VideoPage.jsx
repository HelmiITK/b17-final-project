// import ReactPlayer from "react-player";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressCourse from "../../components/VideoComponent/ProgressCourse";
import Main from "../../components/VideoComponent/Main";
import { CiBoxList } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import PopupBuy from "../../components/VideoComponent/PopupBuy";
import PopupOnboarding from "../../components/VideoComponent/PopupOnboarding";

const VideoPage = () => {
  // keperluan untuk layar mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PopupOnboarding />
      <PopupBuy />
      {/* tombol untuk menampilkan/menghilangkan progressCourse */}
      <div className="lg:hidden fixed bottom-2 sm:bottom-4 md:bottom-6 left-[50%] -translate-x-[50%] z-30  duration-300 transition-all">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-sm font-semibold text-white rounded-md px-4 py-2 flex items-center"
        >
          <span className="mr-2">
            {isOpen ? <IoMdCloseCircleOutline /> : <CiBoxList />}
          </span>{" "}
          {isOpen ? "Close" : "List Course"}
        </button>
      </div>
      {/*  */}
      <div className="relative w-full">
        <div className="z-10 left-[50%] -translate-x-[50%] absolute w-full md:w-10/12 mt-20 md:mt-24 ">
          {/* Tombol kembali ke halaman kelas */}
          <Link to={"/course"}>
            <h1 className="flex font-semibold text-sm md:text-base items-center hover:underline transition-all duration-300 hover:scale-105">
              <span className="mr-1 block md:mr-2">
                <ArrowLeft className="w-4 h-4" />
              </span>{" "}
              Kelas Lainnya
            </h1>
          </Link>
          <div className="mx-auto grid grid-cols-3 gap-x-14 md:mt-5">
            {/* main section, isinya video sama deskripsi course */}
            <div className="col-span-3 lg:col-span-2">
              <Main />
            </div>
            {/* progress course, ada di sebelah kanan */}
            <div className="col-span-3 lg:col-span-1">
              <ProgressCourse isOpen={isOpen} />
            </div>
          </div>
        </div>
        {/* background yang beda warna */}
        <div className="bg-layer h-[280px] hidden md:block" />
      </div>
    </>
  );
};

export default VideoPage;
