import { IoNotificationsCircleSharp } from "react-icons/io5";

const Main = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white border border-color-primary pb-10">
      <div className="w-full bg-primary">
        <h1 className="text-center text-white font-semibold py-3 lg:py-4 lg:text-lg tracking-wider">
          Notifikasi
        </h1>
      </div>
      <div className="w-10/12 mx-auto  flex mt-10">
        <div className="">
          <span className="text-color-primary">
            <IoNotificationsCircleSharp className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </span>
        </div>
        <div className="flex justify-between w-full ml-3">
          <div className="flex flex-col">
            <h1 className="text-color-primary font-semibold lg:text-lg">
              Promosi
            </h1>
            <h3 className="font-medium text-sm lg:text-base">
              Dapatkan Potongan 50% selama Bulan Maret
            </h3>
            <p className="text-xs lg:text-sm opacity-50 font-medium">
              Syarat dan Ketentuan berlaku
            </p>
          </div>
          <div className="flex">
            <p className="text-xs lg:text-sm text-slate-600 font-medium">
              2 Maret, 12.00
              <span className="h-2 w-2 lg:h-3 hidden lg:w-3 rounded-full bg-red-500 md:inline-block ml-3" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
