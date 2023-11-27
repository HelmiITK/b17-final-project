import { useState } from "react";
import { cn } from "../../libs/utils";
import Card from "./Card";
import PropTypes from "prop-types";

const data2 = [
  "All",
  "In Progress",
  "Done",
  "All",
  "In Progress",
  "Done",
  "All",
  "In Progress",
  "Done",
  "All",
  "In Progress",
  "Done",
  "All",
  "In Progress",
  "Done",
];

const Main = ({ data }) => {
  const [flag, setFlag] = useState(0);
  return (
    <div>
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
      <div className="grid md:grid-cols-2 gap-8 mt-4 md:mt-6">
        {data2.map((item, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.array,
};

export default Main;
