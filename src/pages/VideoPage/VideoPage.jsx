// import ReactPlayer from "react-player";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressCourse from "../../components/VideoComponent/ProgressCourse";
import Main from "../../components/VideoComponent/Main";

const VideoPage = () => {
  return (
    <div className="relative w-full">
      <div className="z-10 left-[50%] -translate-x-[50%] absolute w-10/12 mt-10">
        <Link to={"/course"}>
          <h1 className="flex font-semibold">
            <span className="mr-2">
              <ArrowLeft />
            </span>{" "}
            Kelas Lainnya
          </h1>
        </Link>
        <div className="mx-auto grid grid-cols-3 gap-x-14  ">
          <div className="col-span-2">
            <Main />
          </div>
          <div>
            <ProgressCourse />
          </div>
        </div>
      </div>
      <div className="bg-layer h-[30vh]" />
    </div>
  );
};

export default VideoPage;
