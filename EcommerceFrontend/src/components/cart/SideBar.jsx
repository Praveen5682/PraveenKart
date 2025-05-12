const SideBar = () => {
  return (
    <div className=" text-black rounded-xl flex flex-col gap-6 p-4 md:p-6  shadow-md">
      <div className="">
        <h6 className="font-medium mb-6 opacity-75">Order Summary</h6>

        <div className="flex justify-between items-center">
          <span>Sub total</span>
          <span className="font-bold">$2099</span>
        </div>
        <hr className="my-4 dark:border-slate-700" />
        <div className="flex justify-between items-center">
          <span>Shipping Fee</span>
          <span className="font-bold">$99</span>
        </div>
        <hr className="my-4 dark:border-slate-700" />
        <div className="flex justify-between items-center">
          <span>Tax</span>
          <span className="font-bold">$168</span>
        </div>
        <hr className="my-4 dark:border-slate-700" />
        <div className="flex justify-between items-center">
          <span className="fs-5 font-bold">Total</span>
          <span className="font-bold">$2238</span>
        </div>
      </div>
      <div className="">
        <button className="w-full bg-blue-600 rounded-md text-white hover:bg-opacity-90 py-2.5">
          {/* BUY (13) */}
          Proceed To Billing Address
        </button>
      </div>
    </div>
  );
};

export default SideBar;
