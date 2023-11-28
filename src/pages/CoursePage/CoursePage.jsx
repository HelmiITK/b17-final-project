import { Search } from "lucide-react";
import Main from "../../components/MyCourseComponent/Main";
import SideFilter from "../../components/MyCourseComponent/SideFilter";

const CoursePage = () => {
  const data = ["All", "Kelas Premium", "Kelas Gratis"];

  return (
    <div className="w-full bg-layer pt-24 lg:pt-28">
      <div className="w-10/12 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-sm md:text-xl lg:text-2xl">
            Kelas Berjalan
          </h1>
          <div className="lg:w-3/12">
            <form className="relative w-full">
              <input
                type="text"
                className="rounded-3xl ring-2 ring-color-primary font-semibold pl-6 h-8 lg:h-11 w-full outline-none focus:outline-1  text-black transition-all"
              />
              <span className="text-slate-500 absolute -left-3 lg:left-0 top-2 lg:top-[10px] mx-5 font-semibold px-2 transition duration-200 input-text text-xs md:text-sm lg:text-base">
                Cari kelas...
              </span>
              <span className="absolute right-2 md:right-5 top-[2.5px] inline-block bg-primary p-2 rounded-xl">
                <Search className="text-white w-3 h-3 lg:w-5 lg:h-5" />
              </span>
            </form>
          </div>
        </div>
        <div className="mt-6 lg:mt-8">
          <div className="grid grid-cols-3 gap-x-4 lg:gap-x-20">
            <div className="col-span-3 md:col-span-1">
              <SideFilter />
            </div>
            <div className="col-span-3 md:col-span-2">
              <Main data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
