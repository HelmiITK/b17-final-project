import { Search } from "lucide-react";
import Main from "../../components/MyCourseComponent/Main";
import SideFilter from "../../components/MyCourseComponent/SideFilter";

const CoursePage = () => {
  const data = ["All", "Kelas Premium", "Kelas Gratis"];

  return (
    <div className="w-full bg-layer pt-10">
      <div className="w-10/12 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-sm  md:text-2xl">Topik Kelas</h1>
          <div className="md:w-3/12">
            <form className="relative w-full">
              <input
                type="text"
                className="rounded-3xl ring-2 ring-violet-600 font-semibold pl-6  h-8 md:h-11 w-full outline-none focus:outline-1  text-black transition-all"
              />
              <span className="text-slate-500 absolute -left-3 md:left-0 top-2 md:top-[10px] mx-5 font-semibold px-2 transition duration-200 input-text text-xs md:text-base">
                Cari kelas...
              </span>
              <span className="absolute right-2 md:right-5 top-[2.5px] inline-block bg-violet-600 p-2 rounded-xl">
                <Search className="text-white w-3 h-3 md:w-auto md:h-auto" />
              </span>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-x-20">
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
