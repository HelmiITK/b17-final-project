import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardKategori = ({ title, img, id }) => {
  return (
    <>
      <div className="relative">
        <Link
          to={"/course"}
          state={{ categoryId: id }}
          className="flex flex-col items-center pt-2 hover:scale-[1.07] duration-500"
        >
          <img
            src={img}
            alt={title}
            className="w-80 md:w-80 md:h-44 p-2 rounded-3xl"
          />
          <h1 className="my-4 font-medium text-black">{title}</h1>
        </Link>
      </div>
    </>
  );
};

export default CardKategori;

CardKategori.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
};
