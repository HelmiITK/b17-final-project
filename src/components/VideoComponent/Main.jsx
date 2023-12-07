import ReactPlayer from "react-player";
import InfoCourse from "./InfoCourse";
import DescriptionCourse from "./DescriptionCourse";

const Main = () => {
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
                url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                controls
                width="100%"
                height="100%"
                className="react-player"
              />
            </div>
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

export default Main;
