import success from "../../assets/successBuy.png";

const SuccessBuyPage = () => {
  return (
    <div>
      <div className="w-full relative">
        <div className="shadow-md pb-3 pt-24 lg:pt-32">
          <h1 className="w-11/12 md:w-8/12 xl:w-6/12 p-2 mx-auto font-semibold rounded-md text-white text-xs -tracking-wider bg-green-500 text-center">
            Terima kasih atas pembayaran transaksi
          </h1>
        </div>
        <div className=" flex flex-col mt-20 justify-center items-center">
          <h1 className="font-semibold text-xl text-color-primary">Selamat!</h1>
          <img src={success} alt="" width={140} height={140} />
          <p className="font-semibold text-xs mt-3">
            Transaksi pembayaran kelas premuim berhasil!
          </p>
          <p className="font-semibold text-[10px] mt-1">
            E-receipt telah dikirimkan ke email
          </p>
          <button className="mt-10 bg-primary text-white font-semibold text-sm py-1 md:py-[6px] rounded-full w-8/12 md:w-6/12 lg:w-3/12">
            Mulai Belajar
          </button>
          <p className="text-blue-400 font-semibold text-xs mt-3">
            Kembali ke beranda
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessBuyPage;
