import { useEffect, useState } from "react";
import { cn } from "../../libs/utils";
import { XCircle } from "lucide-react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ClockLoader } from "react-spinners";

const SideFilter = ({
  handleCategory,
  isLoading,
  handleLevel,
  handleFilter,
  categoryFromHome,
}) => {
  const filter = ["Paling Baru", "Paling Populer"];
  const { category } = useSelector((state) => state.category);
  const levelKesulitan = ["pemula", "menengah", "lanjutan"];
  const [open, setOpen] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState(
    categoryFromHome ? [categoryFromHome] : []
  );
  const [checkedLevels, setCheckedLevels] = useState([]);
  const [checkedFilter, setCheckedFilter] = useState([]);
  useEffect(() => {
    handleCategory(checkedCategories);
    handleLevel(checkedLevels);
    handleFilter(checkedFilter);
  }, [
    checkedCategories,
    handleCategory,
    handleLevel,
    checkedLevels,
    checkedFilter,
    handleFilter,
  ]);

  const deleteFilter = () => {
    setCheckedCategories([]);
    setCheckedLevels([]);
    setCheckedFilter([]);
  };

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
          "opacity-0 fixed w-full left-0 bottom-[-71vh] z-50 md:z-0 max-h-[70vh] h-auto rounded-t-xl md:opacity-100 overflow-auto  md:flex md:sticky md:top-24 transition-all duration-300 bg-white rounded-lg",
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
            {filter.map((item, i) => {
              const checked = checkedFilter?.includes(item);
              return (
                <div className="flex items-center my-2 ml-1" key={i}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          // remove dari array jika sudah diceklis
                          setCheckedFilter(
                            checkedFilter.filter((i) => i !== item)
                          );
                        } else {
                          // tambahkan ke array jika belum diceklis
                          setCheckedFilter([...checkedFilter, item]);
                        }
                      }}
                    />
                    <span className="checkbox-custom" />
                  </label>
                  <p className="ml-4 font-semibold text-slate-600 -tracking-wide text-sm">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
          {/* kategori */}
          <div className="mx-5 my-2">
            <h1 className="tracking-wider font-bold text-lg">Kategori</h1>
            {isLoading && (
              <div className="h-32 w-full items-center flex justify-center sticky top-24 ">
                <ClockLoader color="#6a00ff" size={24} speedMultiplier={2} />
              </div>
            )}
            {category.map((item) => {
              const checked = checkedCategories.includes(item.id);
              return (
                <div className="flex items-center my-2 ml-1" key={item.id}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          // remove dari array jika sudah diceklis
                          setCheckedCategories(
                            checkedCategories.filter((i) => i !== item.id)
                          );
                        } else {
                          // tambahkan ke array jika belum diceklis
                          setCheckedCategories([...checkedCategories, item.id]);
                        }
                      }}
                    />
                    <span className="checkbox-custom" />
                  </label>
                  <p className="ml-4 font-semibold text-slate-600 -tracking-wide text-sm">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
          {/* level kesulitah */}
          <div className="mx-5 my-2">
            <h1 className="tracking-wider font-bold text-lg">
              Level Kesulitan
            </h1>
            {levelKesulitan.map((item, i) => {
              const checked = checkedLevels?.includes(item);
              return (
                <div className="flex items-center my-2 ml-1" key={i}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          // remove dari array jika sudah diceklis
                          setCheckedLevels(
                            checkedLevels.filter((i) => i !== item)
                          );
                        } else {
                          // tambahkan ke array jika belum diceklis
                          setCheckedLevels([...checkedLevels, item]);
                        }
                      }}
                    />
                    <span className="checkbox-custom" />
                  </label>
                  <p className="ml-4 font-semibold text-slate-600 -tracking-wide text-sm">
                    Level {item.charAt(0).toUpperCase() + item.slice(1)}
                  </p>
                </div>
              );
            })}
          </div>
          {/* tombol untuk hapus filter */}
          <div className="my-3 mx-5">
            <button
              onClick={deleteFilter}
              className="p-1 -tracking-wider w-full bg-inherit font-semibold rounded-md md:bg-transparent bg-white text-red-500 hover:bg-red-500 hover:text-white hover:scale-105 transition duration-300 mb-4"
            >
              Hapus Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

SideFilter.propTypes = {
  handleCategory: PropTypes.func,
  isLoading: PropTypes.bool,
  handleLevel: PropTypes.func,
  handleFilter: PropTypes.func,
  categoryFromHome: PropTypes.number,
};

export default SideFilter;
