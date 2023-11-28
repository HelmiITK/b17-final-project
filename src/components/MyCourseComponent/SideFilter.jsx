import { useState } from "react";
import { cn } from "../../libs/utils";
import { XCircle } from "lucide-react";
import { FaFilter } from "react-icons/fa";

const SideFilter = () => {
  const filter = ["Paling Baru", "Paling Populer", "Promo"];
  const kategori = [
    "UI/UX Design",
    "Web Developer",
    "Android Developer",
    "Data Science",
    "Business Software",
  ];
  const levelKesulitan = [
    "Semua Level",
    "Beginner Level",
    "Intermediate Level",
    "Advanced Level",
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* tombol ketika tampilan mobile untuk melihat filter */}
      <div className="md:hidden fixed bottom-2 left-[50%] -translate-x-[50%] z-30">
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-sm font-semibold text-white rounded-md px-4 py-2 flex items-center"
        >
          <span className="mr-2">
            <FaFilter />
          </span>{" "}
          Filter
        </button>
      </div>
      <div
        className={cn(
          "opacity-0 fixed w-full left-0 bottom-[-71vh] z-50 md:z-0 h-[70vh] rounded-t-xl md:opacity-100 md:h-[80vh] overflow-auto  md:flex md:sticky md:top-24 transition-all duration-300 bg-white rounded-lg",
          open && "overflow-auto bottom-0 opacity-100"
        )}
      >
        <div className="w-full flex flex-col shadow-sm">
          {/* tombol x di ukuran mobile */}
          <div
            className="pt-2 absolute right-2 top-3 p-2 md:hidden"
            onClick={() => setOpen(false)}
          >
            <XCircle />
          </div>
          {/* filter  */}
          <div className="mx-5 my-2 mt-6">
            <h1 className="tracking-wider font-bold text-lg">Filter</h1>
            {filter.map((item, index) => (
              <div className="flex items-center my-2 ml-1" key={index}>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-custom rectangular"></span>
                </label>
                <p className="ml-4 font-semibold text-slate-600 -tracking-wide text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
          {/* kategori */}
          <div className="mx-5 my-2">
            <h1 className="tracking-wider font-bold text-lg">Kategori</h1>
            {kategori.map((item, index) => (
              <div className="flex items-center my-2 ml-1" key={index}>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-custom rectangular"></span>
                </label>
                <p className="ml-4 font-semibold text-slate-600 -tracking-wide text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
          {/* level kesulitah */}
          <div className="mx-5 my-2">
            <h1 className="tracking-wider font-bold text-lg">
              Level Kesulitan
            </h1>
            {levelKesulitan.map((item, index) => (
              <div className="flex items-center my-2 ml-1" key={index}>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-custom rectangular"></span>
                </label>
                <p className="ml-4 font-semibold text-slate-600 -tracking-wide text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
          {/* tombol untuk hapus filter */}
          <div className="my-3 mx-5">
            <button className="p-1 -tracking-wider w-full bg-inherit font-semibold rounded-md md:bg-transparent bg-white text-red-500 hover:bg-red-500 hover:text-white hover:scale-105 transition duration-300 mb-4">
              Hapus Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideFilter;
