import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProgressBar from "../MyCourseComponent/ProgressBar";
import ChapterItem from "./ChapterItem";
import { cn } from "../../libs/utils";

const ProgressCourse = ({ isOpen }) => {
  const { courseId, materialId } = useParams();
  const { mycourse } = useSelector((state) => state.course);
  // cari dari mycourse yang sesuai dengan url
  const getCourseVideo = mycourse.find((x) => x.course.id == courseId);
  const sortCourseMaterial =
    getCourseVideo &&
    [...getCourseVideo.course.materials].sort((a, b) => a.id - b.id);

  const { chapters } = getCourseVideo
    ? getCourseVideo.course
    : { chapters: [] };

  // kelompokkan material berdasarkan chapternya
  const chapterWithMaterials = chapters?.map((chapter) => {
    const materialsAtChapter = sortCourseMaterial?.filter(
      (material) => material.chapter_id === chapter.id
    );
    const totalTime = materialsAtChapter.reduce((total, material) => {
      return total + material.duration_in_minutes;
    }, 0);
    const x = {
      title: chapter.title,
      materials: materialsAtChapter,
      totalDuration: totalTime,
    };
    return x;
  });

  // ambil semua data yang sudah beres ditonton oleh user
  const [allDoneMaterials, setAllDoneMaterials] = useState([]);
  useEffect(() => {
    setAllDoneMaterials(
      getCourseVideo?.userProgress.filter((course) => course.is_completed)
    );
  }, [materialId, getCourseVideo]);

  // untuk menampilkan angka pada setiap chapter material
  let number = 0;

  return (
    <div
      className={cn(
        "fixed -top-[100vh] left-0 right-0 rounded-b-lg md:rounded-none lg:sticky lg:top-24 duration-500 transition-all",
        isOpen && "top-20 "
      )}
    >
      <div className="bg-white rounded-lg shadow-2xl lg:shadow-lg flex flex-col px-2 py-4 h-[75vh] overflow-auto">
        <div className="grid grid-cols-2 md:gap-x-2">
          <h1 className="font-semibold ml-2 text-sm md:text-base">
            Materi Belajar
          </h1>
          <div className="">
            <ProgressBar
              percentage={
                getCourseVideo && getCourseVideo.progressPercentage.toFixed()
              }
            />
          </div>
        </div>
        {/* loop judul chapter  */}
        {chapterWithMaterials?.map((item, i) => (
          <div key={i} className="mx-2 my-1">
            <div className="mt-3 flex justify-between  text-xs lg:text-sm font-semibold">
              <h1 className="text-color-primary font-bold">{item.title}</h1>
              <p className="text-blue-400 mr-2 text-xs">
                {item.totalDuration.toFixed()} Menit
              </p>
            </div>
            {/* loop untuk mengambil list data dari setiap chapter */}
            {item.materials.map((material, x) => {
              // number increment setiap kali ada loop
              number = number + 1;
              return (
                <div
                  key={x}
                  className={cn("duration-300 cursor-pointer")}
                  // untuk menandakan bahwa material chaapter sedang aktif
                  onClick={() => {}}
                >
                  {/* item chapter */}
                  <ChapterItem
                    chapter={material}
                    numb={number}
                    isActive={materialId == material.id}
                    // cek apakah material sudah is_completed atau belum, fungsinya untuk memberi tanda bahwa mana yang sudah is_completed dan mana yang belum
                    isDone={
                      !!allDoneMaterials &&
                      allDoneMaterials.find(
                        (mat) => mat.course_material_id === material.id
                      )
                    }
                  />
                </div>
              );
            })}
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
