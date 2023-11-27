import ProgressBar from "../MyCourseComponent/ProgressBar";
import ChapterItem from "./ChapterItem";
const ProgressCourse = () => {
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

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-lg shadow-lg flex flex-col px-2 py-4 h-[75vh] overflow-auto">
        <div className="grid grid-cols-2 gap-x-2">
          <h1 className="font-semibold ml-2">Materi Belajar</h1>
          <div className="pl-6">
            <ProgressBar />
          </div>
        </div>
        {data.map((item, i) => (
          <div key={i} className="mx-2 my-1">
            <div className="mt-3 flex justify-between  text-xs font-semibold">
              <h1 className="text-color-primary font-bold">
                Chapter {i + 1} - {item.title}
              </h1>
              <p className="text-blue-400 mr-2">60 Menit</p>
            </div>
            {item.chapter.map((chapter, i) => (
              <ChapterItem key={i} chapter={chapter} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressCourse;
