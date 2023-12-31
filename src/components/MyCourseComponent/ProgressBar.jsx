import { BadgeCheck } from "lucide-react";
import PropTypes from "prop-types";

// persentase progress
export default function ProgressBar({ percentage }) {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <span className="text-green-500">
          <BadgeCheck size={20} />
        </span>
      </div>
      <div className="w-9/12 relative overflow-hidden h-5 rounded-full bg-slate-300">
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            transition: "width 0.5s",
          }}
          className="animate-fade bg-primary"
        ></div>
        <span className="font-semibold absolute top-[50%] left-3 -translate-y-[50%] text-white text-[10px] md:text-xs drop-shadow-lg progressPercent">
          {percentage}% Complete
        </span>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  percentage: PropTypes.string,
};
