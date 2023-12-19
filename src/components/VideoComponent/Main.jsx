import ReactPlayer from "react-player";
import InfoCourse from "./InfoCourse";
import DescriptionCourse from "./DescriptionCourse";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CompletedButton from "./CompletedButton";
import { updateMaterialStatus } from "../../redux/actions/courseActions";

const Main = ({ materialId }) => {
  const { detail } = useSelector((state) => state.course);

  const material = detail?.materials?.filter(
    (material) => material.id == materialId
  );

  const dispatch = useDispatch();
  const updateMaterial = () => {
    dispatch(updateMaterialStatus(materialId));
  };
  return (
    <>
      <div className="flex flex-col">
        {/* isinya kyk judul, rating dll */}
        {/* InfoCourse ketika tampilan web */}
        <div className="hidden md:block">
          <InfoCourse />
        </div>
        {/* tampilan video */}
        <div className="flex justify-center">
          <div className="mt-1 md:mt-8 w-full ">
            <div className="player-wrapper md:rounded-xl overflow-hidden">
              <ReactPlayer
                url={material && material[0].url_video}
                controls
                width="100%"
                height="100%"
                className="react-player"
                onEnded={updateMaterial}
              />
            </div>
            <CompletedButton materialId={materialId} />
          </div>
        </div>
        {/* Infocourse ketika mobile */}
        <div className="block py-4 bg-layer w-full md:hidden">
          <InfoCourse />
        </div>
        {/* deskripsi course isinya kyk tentang kelas */}
        <DescriptionCourse />
      </div>
    </>
  );
};

Main.propTypes = {
  materialId: PropTypes.string,
};

export default Main;
