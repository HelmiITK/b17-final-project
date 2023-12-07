import { useState } from "react";
import { cn } from "../../libs/utils";
import Card from "./Card";
import PropTypes from "prop-types";
import ClockLoader from "react-spinners/ClockLoader";

const Main = ({ data, course, isLoading }) => {
  const [flag, setFlag] = useState(0);
  if (!course) {
    course = [];
  }
  return (
    <div className="">
      {/* filter */}
      <div className="grid grid-cols-3 gap-x-2">
        {data.map((item, i) => (
          <div
            key={i}
            className={cn(
              "bg-white font-semibold rounded-xl md:rounded-2xl text-slate-500/80 transition",
              flag === i && "bg-primary text-white transition-all"
            )}
          >
            <button
              onClick={() => {
                setFlag(i);
              }}
              className="w-full h-8 md:h-10 -tracking-wider md:tracking-wider text-xs md:text-sm"
            >
              {item}
            </button>
          </div>
        ))}
      </div>
      {/* loading ambil data dari api */}
      {isLoading && (
        <div className="h-96 w-full items-center flex justify-center sticky top-24 ">
          <ClockLoader color="#6a00ff" size={30} speedMultiplier={2} />
        </div>
      )}
      {/* kalau tidak ada datanya */}
      {course.length === 0 && !isLoading && (
        <div className="h-32 w-full items-center flex justify-center">
          jirlah fak kata gua teh
        </div>
      )}
      {/* loop semua data */}
      <div
        className={cn(
          "grid md:grid-cols-2 gap-8 mt-4 md:mt-6",
          isLoading && "hidden"
        )}
      >
        {course.map((item) => (
          <Card key={item.id} course={item} />
        ))}
      </div>
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.array,
  course: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default Main;
