import { useState } from "react";
// import Card from "../MyCourseComponent/Card";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { cn } from "../../libs/utils";

const PopupBuy = () => {
  const [isClick, setIsClick] = useState(true);
  return (
    <div
      className={cn(
        "bg-black/60 z-50 fixed top-0 left-0 right-0 bottom-0",
        isClick && "hidden"
      )}
    >
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 h-fit bg-white rounded-lg flex justify-center items-center flex-col p-3 relative">
          <div
            className="absolute top-2 right-2 cursor-pointer hover:bg-primary hover:text-white rounded-full duration-300"
            onClick={() => {
              setIsClick(true);
            }}
          >
            <IoMdClose size={24} />
          </div>
          <h1 className="font-semibold text-xl text-black">
            Selangkah lagi menuju
          </h1>
          <h1 className="font-semibold text-xl text-color-primary">
            Kelas Premium
          </h1>
          <div className="overflow-hidden rounded-md border border-color-primary w-8/12">
            {/* <Card /> */}
          </div>
          <div className="w-10/12 md:w-8/12 lg:w-7/12 hover:scale-105 duration-300 mt-2">
            <button className="bg-primary h-10 w-full text-white font-semibold rounded-full flex items-center justify-center">
              Beli Sekarang
              <span className="ml-2">
                <FaArrowCircleRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupBuy;
