import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

// import Card from "../../components/MyCourseComponent/Card";

// import { useState } from "react";
// import Accordion from "../../components/payment/Accordion";

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
        <div className="shadow-md pb-3 pt-24 lg:pt-32">
          <div>
            <Link to="/">
              <h3 className="flex items-center font-semibold duration-300 hover:scale-105 hover:underline ml-4 lg:ml-">
                <span className="mr-3">
                  <FaArrowLeft />
                </span>
                Kembali
              </h3>
            </Link>
          </div>
          <h1 className="w-11/12 md:w-8/12 xl:w-6/12 p-2 mx-auto font-semibold rounded-md text-white text-xs -tracking-wider bg-red-600 text-center">
            Selesaikan Pembayaran sampai 10 Maret 2023 12:00
          </h1>
        </div>
      </div>
      <div className="w-[90%] mx-auto">
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
          <div id="Class Buy" className=" md:ml-16">
            <div className="border-2 rounded-xl my-5 p-4 md:my-0">
              <div className=" mx-auto">
                <div className="bg-white w-full h-[200px] rounded-xl shadow-xl md:w-[440px] md:h-[280px] md:mx-auto">
                  <div className=" bg-gray-500 w-full h-[40%] rounded-t-xl"></div>
                  <div className="p-2">
                    <div className="flex justify-between w-full">
                      <div className="font-poppins text-black md:text-xl">UI/UX Design</div>
                    </div>
                    <div className="font-poppins md:text-xl">Belajar Web Design dengan Figma</div>
                    <div className="font-poppins text-sm md:pt-2">By Angela Doe</div>
                  </div>
                </div>
                <div className="flex justify-between md:justify-around">
                  <div className="pt-3">
                    <div className="font-poppins">Harga</div>
                    <p>Rp 400,000</p>
                  </div>
                  <div className="pt-3">
                    <h1 className="font-poppins">PPN 11%</h1>
                    <p>Rp 40,000</p>
                  </div>
                  <div className="pt-3">
                    <div className="font-poppins">Total Bayar</div>
                    <div className="text-blue-500 font-bold">Rp 440,000</div>
                  </div>
                </div>
                <div className="py-3">
                  <button className="bg-red-600 mx-auto text-center py-3 px-8 rounded-xl text-white flex">
                    Bayar dan Ikuti Kelas Selamanya
                    {/* <img src={next} className="ml-3" /> */}
                  </button>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full py-16 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="">
            <div className="px-[40px] max-w-[800px]">
              {accordionData.map((data, index) => {
                return (
                  <Accordion
                    key={index}
                    open={index === open}
                    title={data.title}
                    desc={data.desc}
                    toggle={() => toggle(index)}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center">
          <div className="relativ bg-gray-white shadow border border-blue-950 flex-col justify-center items-center gap-2.5 px-6 pt-5 mt-2 pb-9 mx-auto w-full max-w-lg rounded-2xl">
            <div className="font-semibold text-xl mb-2">Pembayaran Kelas</div>
            <Card />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default BuyPage;
