import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateMaterialStatus } from "../../redux/actions/courseActions";
import { cn } from "../../libs/utils";

const CompletedButton = ({ materialId, progress, materialNextIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const updateMaterial = () => {
    dispatch(
      updateMaterialStatus(materialId, navigate, courseId, materialNextIndex)
    );
  };

  const isCompleted =
    !!progress &&
    progress.find((n) => n.course_material_id == materialId && n.is_completed);

  return (
    <div className="pt-3 bg-layer md:bg-inherit">
      <div className=" text-right mr-1 md:mr-0">
        <button
          disabled={isCompleted}
          onClick={updateMaterial}
          className={cn(
            "text-white font-semibold text-[10px] md:text-sm p-1 md:p-2 rounded-lg bg-slate-700 hover:scale-105 duration-300 transition-all",
            isCompleted &&
              "bg-slate-200 text-slate-400 hover:scale-100 cursor-not-allowed duration-300 transition-all"
          )}
        >
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

CompletedButton.propTypes = {
  materialId: PropTypes.string,
  progress: PropTypes.array,
  materialNextIndex: PropTypes.number,
};

export default CompletedButton;
