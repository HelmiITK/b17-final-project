import { useState } from "react";
import { cn } from "../../libs/utils";
import Card from "./Card";
import PropTypes from "prop-types";

const Main = ({ data, course }) => {
  const [flag, setFlag] = useState(0);

  if (!course) {
    course = [];
  }
  return (
    <div>
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
      {/* cek filter */}
      {course.length === 0 && (
        <div className="h-32 w-full items-center flex justify-center">
          jirlah fak kata gua teh
        </div>
      )}
      {/* loop semua data */}
      <div className="grid md:grid-cols-2 gap-8 mt-4 md:mt-6">
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
};

export default Main;
