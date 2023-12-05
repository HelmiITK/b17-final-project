import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const CardKategori = ({ title }) => {
   return (
      <>
         <div className="relative">
            <Link to={'/'} className="flex flex-col items-center pt-2 hover:scale-[1.07] duration-500">
               <img src={'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                     alt="gambar" 
                     className="w-80 md:w-80 md:h-44 p-2 rounded-3xl lg:blur-[2px] hover:blur-0" />
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