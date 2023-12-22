import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import CardPayment from "../../components/payment/CardPayment";

const BuyPage = () => {
  // const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // const [open, setOpen] = useState(false);

  // const toggle = (index) => {
  //   if (!open.includes(index)) {
  //     return setOpen(null);
  //   }
  //   setOpen(index);
  // };

  return (
    <>
      <div>
        <div className="shadow-md pb-3 pt-24 lg:pt ">
          <div className="">
            <Link to={"/"}>
              <h1 className="flex font-semibold text-sm md:text-base items-center hover:underline transition-all duration-300 hover:scale-100">
                <span className="ml-4 block sm:mr-2">
                  <FaArrowLeft className="w-4 h-4" />
                </span>{" "}
                Kembali
              </h1>
            </Link>
          </div>
          <h1 className="w-11/12 md:w-8/12 xl:w-6/12 p-2 mx-auto font-semibold rounded-md text-white text-xs -tracking-wider bg-red-600 text-center">
            Selesaikan Pembayaran sampai 10 Maret 2023 12:00
          </h1>
        </div>
      </div>
      <div className="w-[90%] mx-auto pt-10">
        <div className="md:grid grid-cols-2">
          <div id="Transfer Method">
            <div className="bg-[#3C3C3C] rounded-xl flex justify-between items-center p-3">
              <div className="text-white">Bank Transfer</div>
              <FaAngleDown className="text-white" />
            </div>
            <div>
              <div>Isi Pembayaran</div>
            </div>
            <div className="bg-[#003E9C] rounded-xl flex justify-between items-center p-3 mt-4">
              <div className="text-white">Credit Card</div>
              <FaAngleDown className="text-white" />
            </div>
            <div>
              <div className="w-[100%]">
                <div>
                  <div className="font-poppins">Card Number</div>
                  <div>
                    <input
                      className="mb-4 py-2 px-2 pr-24 border-b-2"
                      type="text"
                      placeholder="4480 0000 0000 0000"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-poppins">Card Holder Name</div>
                  <div>
                    <input
                      className="mb-4 py-2 px-2 pr-24 border-b-2"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <div className="font-poppins">CVV</div>
                    <div>
                      <input className="mb-4 py-2 px-2  border-b-2" type="text" placeholder="000" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="font-poppins">Expiry Date</div>
                    <div>
                      <input className="mb-4 py-2 border-b-2" type="text" placeholder="Date" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center md:pl-10 mb-20">
            <div className="relativ bg-gray-white shadow border border-black flex-col justify-center items-center gap-2.5 px-6 pt-5 mt-2 pb-9 mx-auto w-full max-w-lg rounded-2xl">
              <div className="font-semibold text-2xl mb-2">Pembayaran Kelas</div>
              <CardPayment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyPage;
