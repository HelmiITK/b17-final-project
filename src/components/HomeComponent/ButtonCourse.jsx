import PropTypes from "prop-types"

const ButtonCourse = ({ filterItems, val }) => {
  return (
    <>
      <div className="grid">
        <button 
          onClick={() => filterItems(val)} 
          className="flex justify-center text-xs font-medium border-none bg-layer cursor-pointer text-black py-2 px-2 mx-2 rounded-2xl 
                      hover:scale-105 duration-300 hover:bg-indigo-600 hover:text-white lg:font-semibold">
          {val}
        </button>
      </div>
    </>
  )
}

export default ButtonCourse

ButtonCourse.propTypes = {
  filterItems: PropTypes.func,
  val: PropTypes.string
}