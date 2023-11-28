import ProgressBar from "../MyCourseComponent/ProgressBar";
import ChapterItem from "./ChapterItem";
import { cn } from "../../libs/utils";
import PropTypes from "prop-types";
import { useState } from "react";
const ProgressCourse = ({ isOpen }) => {
  const data = [
    {
      chapter: [
        "ULuluululululo",
        "LIlililililililil",
        "huhuhuhuhuhuhuhuhu",
        "Contoh",
      ],
      title: "Kenalan",
    },
    {
      chapter: [
        "ULuluululululo",
        "LIlililililililil",
        "huhuhuhuhuhuhuhuhu",
        "Contoh",
      ],
      title: "Pembukaan",
    },
    {
      chapter: [
        "ULuluululululo",
        "LIlililililililil",
        "huhuhuhuhuhuhuhuhu",
        "Contoh",
      ],
      title: "Pembukaan",
    },
  ];
  const [isActive, setIsActive] = useState({
    title: 0,
    chapter: 0,
  });
  return (
    <div
      className={cn(
        "absolute -top-[100vh] left-0 right-0 rounded-b-lg md:rounded-none lg:sticky lg:top-24 duration-500 transition-all",
        isOpen && "top-0 md:-top-4"
      )}
    >
      <div className="bg-white rounded-lg shadow-2xl lg:shadow-lg flex flex-col px-2 py-4 h-[75vh] overflow-auto">
        <div className="grid grid-cols-2 md:gap-x-2">
          <h1 className="font-semibold ml-2 text-sm md:text-base">
            Materi Belajar
          </h1>
          <div className="">
            <ProgressBar />
          </div>
        </div>
        {/* loop judul chapter  */}
        {/* Contohnya Chapter 1 - Pendahuluan */}
        {data.map((item, i) => (
          <div key={i} className="mx-2 my-1">
            <div className="mt-3 flex justify-between  text-xs lg:text-sm font-semibold">
              <h1 className="text-color-primary font-bold">
                Chapter {i + 1} - {item.title}
              </h1>
              <p className="text-blue-400 mr-2">60 Menit</p>
            </div>
            {/* loop untuk mengambil list data dari setiap chapter */}
            {item.chapter.map((chapter, x) => (
              <div
                key={x}
                className={cn(
                  "duration-300 cursor-pointer",
                  isActive.title === i &&
                    isActive.chapter === x &&
                    "scale-105 bg-primary text-white"
                )}
                onClick={() => setIsActive({ title: i, chapter: x })}
              >
                <ChapterItem
                  chapter={chapter}
                  isActive={isActive.title === i && isActive.chapter === x}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

ProgressCourse.propTypes = {
  isOpen: PropTypes.bool,
};

export default ProgressCourse;
