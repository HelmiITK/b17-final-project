import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const CardKategori = ({ img, title }) => {
   return (
      <>
         <div className="relative">
            <Link to={'/user'} className="flex flex-col items-center p-2 hover:scale-[1.07] duration-500">
               <img src={img} alt="gambar" className="w-80 blur-[2px] hover:blur-0" />
               <h1 className="my-4 font-medium text-black">{title}</h1>
            </Link>
         </div>
      </>
   )
}

export default CardKategori

CardKategori.propTypes = {
   img: PropTypes.string,
   title: PropTypes.string,
}