import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateMaterialStatus } from "../../redux/actions/courseActions";

const CompletedButton = ({ materialId }) => {
  const dispatch = useDispatch();
  const updateMaterial = () => {
    dispatch(updateMaterialStatus(materialId));
  };
  return (
    <div className="pt-3 bg-layer md:bg-inherit">
      <div className=" text-right mr-1 md:mr-0">
        <button
          onClick={updateMaterial}
          className="text-white font-semibold text-[10px] md:text-sm p-1 md:p-2 rounded-lg bg-slate-700 hover:scale-105 duration-300 transition-all "
        >
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

CompletedButton.propTypes = {
  materialId: PropTypes.string,
};

export default CompletedButton;
