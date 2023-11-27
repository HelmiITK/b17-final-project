import { PiShieldStarBold } from "react-icons/pi";
import { RiBook3Line } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const InfoCourse = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-color-primary font-semibold text-lg">
          UI/UX Design
        </h1>
        <p className="flex font-semibold">
          <span className="mr-1">
            <FaStar color="#F9CC00" size={20} />
          </span>
          5.0
        </p>
      </div>
      <div>
        <h3 className="font-semibold">
          Intro to Basic of User Interaction Design
        </h3>
        <div className="mt-3 w-7/12">
          <div className="w-full  flex justify-between">
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <PiShieldStarBold size={24} />
              </span>{" "}
              Intermediate Level
            </p>
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <RiBook3Line size={24} />
              </span>{" "}
              10 Modul
            </p>
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <FaClock size={24} />
              </span>{" "}
              100 Menit
            </p>
          </div>
        </div>
        <div className="mt-2 w-4/12 ">
          <div className="">
            <button className="w-full text-sm py-[6px] bg-[#73CA5C] text-white font-semibold rounded-full flex justify-center">
              Join Grup Telegram
              <span className="my-auto ml-3">
                <IoIosChatboxes color="white" size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCourse;
