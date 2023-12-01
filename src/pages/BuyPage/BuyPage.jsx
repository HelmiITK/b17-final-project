import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Card from "../../components/MyCourseComponent/Card";

import { useState } from "react";
import Accordion from "../../components/AccordionComponent/Accordion";

const BuyPage = () => {
  // const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (!open.includes(index)) {
      return setOpen(null);
    }
    setOpen(index);
  };

  const accordionData = [
    {
      title: "this paymen",
      desc: "fsadfjsdgsbkgbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    },
    {
      title: "this paymen2",
      desc: "fsadfjsdgsbkgbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    },
  ];
  // const toggleAccordion = () => {
  //   setIsAccordionOpen(!isAccordionOpen);
  // };

  return (
    <>
      {/* <div className="w-full relative flex flex-col"> */}
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
      <div className="w-full py-16 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          {/* <img
            src="https://images.unsplash.com/photo-1682687982470-8f1b0e79151a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          /> */}
          <div className="">
            {/* <div className="cursor-pointer p-4 border-b border-black" onClick={toggleAccordion}>
              <h2 className="text-lg font-semibold text-center">Accordion Title</h2>
              {isAccordionOpen && (
                <div className="p-4">
                  <div className="w-72 h-5 justify-center items-center gap-4 inline-flex">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png"
                      alt=""
                      className="w-20 relative"
                    />
                    <img
                      src="https://www.freepnglogos.com/uploads/visa-card-logo-9.png"
                      className="w-20 relative"
                    />
                    <img
                      src="https://www.freepnglogos.com/uploads/visa-card-logo-9.png"
                      className="w-20 relative"
                    />
                  </div>
                  Accordion Content Goes Here
                  <p>Accordion Content Goes Here</p>
                </div>
              )}
            </div> */}
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

          {/* <div className="flex flex-col justify-center"> */}
          <div className="relativ bg-gray-white shadow border border-blue-950 flex-col justify-center items-center gap-2.5 px-6 pt-5 mt-2 pb-9 mx-auto w-full max-w-lg rounded-2xl">
            <div className="font-semibold text-xl mb-2">Pembayaran Kelas</div>
            <Card />
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div className="flex justify-center items-center">
          <div className="flex justify-center items-center lg:w-full lg:overflow-hidden"> */}
      {/* Left Column with Accordion */}
      {/* <div className="lg:w-1/4 flex-shrink-0 border-r border-gray-300">
              <div className="cursor-pointer p-4 border-b border-black" onClick={toggleAccordion}>
                <h2 className="text-lg font-semibold text-center">Accordion Title</h2>
                {isAccordionOpen && (
                  <div className="p-4">
                    <div className="w-72 h-5 justify-center items-center gap-4 inline-flex">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png"
                        alt=""
                        className="w-20 relative"
                      />
                      <img
                        src="https://www.freepnglogos.com/uploads/visa-card-logo-9.png"
                        className="w-20 relative"
                      />
                      <img
                        src="https://www.freepnglogos.com/uploads/visa-card-logo-9.png"
                        className="w-20 relative"
                      />
                    </div>
                    Accordion Content Goes Here
                    <p>Accordion Content Goes Here</p>
                  </div>
                )}
              </div> 
      {/* </div> */}
      {/* </div> */}

      {/* Right Column with Card */}
      {/* <div className="lg:w-3/4">
            <div className="bg-white w-full h-[900px] lg:h-screen">
              <div className="absolute px-4 lg:pt-20 w-full lg:w-full lg:px-[760px]">
                <div className="box mt-[150px] lg:mt-0 lg:w-[480px]">
                  <div className="relativ bg-gray-white shadow border border-blue-950 flex-col justify-center items-center gap-2.5 px-6 pt-5 pb-9 mx-auto w-full max-w-lg rounded-2xl">
                    <div className="font-semibold text-xl mb-2">Pembayaran Kelas</div>
                    <Card />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default BuyPage;
