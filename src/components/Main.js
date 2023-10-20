import React, { useRef } from "react";
import Invoice from "./Invoice";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import Modal from "./Modal";
import Form from "./Form";

function Main() {
  //   const printRef = useRef();

  //   const handlePrint = useReactToPrint({
  //     content: () => printRef.current,
  //   });

  const modalRef = useRef();

  return (
    <div className=" w-full bg-gray-100 mr-4 overflow-y-scroll mb-[200px]">
      
        <button
          className="bg-blue-500 text-white text-xl"
          onClick={() => modalRef.current.open()}
        >
          Edit Invoice
        </button>
      

      <Invoice />
      <Modal ref={modalRef}>
        <Form modalRef={modalRef} />
      </Modal>

      {/* <button onClick={handlePrint}>Print this out!</button> */}
    </div>
  );
}

export default Main;
