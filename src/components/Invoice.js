import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { formData, formInfo } from "../store/formSlice";

function Invoice() {
  const data = useSelector(formData);
  const info = useSelector(formInfo);
  console.log(info);
  


  // console.log(items);
  const printRef = useRef();
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <button className="absolute bottom-2  mx-auto p-3 text-white bg-black">
            Print this out!
          </button>
        )}
        content={() => printRef.current}
      />
      <div ref={printRef}>
        <div className=" mb-4">
          {/*Header  */}
          <div className="flex items-center justify-between  p-4">
            <span className=" ">
              <span className="text-3xl text-bold">Gopal Krishna Satra</span>

              <br></br>
              <span className="text-xl">Keotpara, Sualkuchi</span>
            </span>
          </div>
          <div className="flex">
            <div className="bg-blue-500 h-[50px] w-3/4"></div>
            <span className="text-5xl px-2">INVOICE</span>
            <div className="bg-blue-500 flex flex-end h-[50px] w-1/4 "></div>
          </div>
        </div>
        <div className="px-8 py-4 flex justify-between">
          <div className="">
            <span className="text-semibold text-2xl">Invoice to : </span>
            <br></br>
            <span className="text-xl">
              {info.name} <br></br> {info.address} <br></br> Token : 012
            </span>
          </div>
          <div className="text-bold text-2xl">
            <span className="space-x-8">
              <span>Invoice#</span> <span>12345</span>{" "}
            </span>
            <br />
            <span className="space-x-8">
              <span>Date</span> <span className="flex-end">13/04/2023</span>{" "}
            </span>
          </div>
        </div>
        {/* Main section */}
        <div className="flex  w-full mx-auto justify-center max-w-5xl ">
          <div className="justify-center w-full ">
            <div className=" w-full grid grid-cols-3   p-4 text-2xl bg-black text-white">
              <span>Sl No.</span>
              <span>Descriptiom</span>
              <span>Payable</span>
            </div>
            {data.map((item, index) => (
              <div
                className="w-full items-center grid grid-cols-3   p-4 text-2xl"
                key={index}
              >
                <span>{item.id}</span>
                <span>{item.desc}</span>
                <span>{item.price}</span>
                {/* <input
                  type="number"
                  className="outline-none bg-gray-100 border-blue-500 border-b-2 px-2 py-1"
                  value={item.price}
                  onChange={(e) => {
                    console.log(item.id);
                    const price = parseInt(e.target.value);
                    setItems((currentItem) =>
                      currentItem.map((x) =>
                        x.id === item.id ? { ...x, price } : x
                      )
                    );
                  }}
                /> */}
              </div>
            ))}
            <div className="h-1 bg-black w-full "></div>
            <div className="w-full items-center grid grid-cols-3   p-4 text-2xl">
              <div></div>
              <div className="font-bold">Total</div>
              <div className="font-bold">{info.sum}</div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div>
          <div className="h-2 bg-blue-500 w-full "></div>
          <div className="flex justify-between items-center p-4 mx-4 mb-10">
            <span className="text-3xl font-semibold">Thank You</span>
            <div className="text-3xl font-semibold">
              Signature
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
