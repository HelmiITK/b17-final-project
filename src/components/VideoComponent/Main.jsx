import ReactPlayer from "react-player";
import InfoCourse from "./InfoCourse";
import DescriptionCourse from "./DescriptionCourse";

const Main = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-col">
        <InfoCourse />
        <div className="flex justify-center">
          <div className=" mt-8 w-full ">
            <div className="player-wrapper rounded-xl overflow-hidden">
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
        <DescriptionCourse />
      </div>
    </div>
  );
};

export default Main;
