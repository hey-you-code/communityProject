import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../firebase";
import Modal from "./Modal";
import Form from "./Form";

function Records({
  memberID,
  setOpen,
  profile_id,
  memberName,
  datas,
  address,
}) {
  const modalRef = useRef();
  const [openRecord, setOpenRecord] = useState(false);
  const [id, setId] = useState();
  const [year, setYear] = useState(0);
  const [sanda, setSanda] = useState(0);
  const [sabhar_sanda, setSabhar_sanda] = useState(0);
  const [donations, setDonations] = useState(0);
  const [paid, setPaid] = useState(false);
  const [status, setStatus] = useState("unpaid");
  // const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const recordRef = useRef();

  const addData = async () => {
    await addDoc(
      collection(db, "profiles", profile_id, "members", memberID, "data"),
      {
        year: year,
        sanda: sanda,
        sabhar_sanda: sabhar_sanda,
        donations: donations,
        status: paid == true ? "paid" : "unpaid",
      }
    );
  };

  const updateData = async (id) => {
    await updateDoc(
      doc(db, "profiles", profile_id, "members", memberID, "data", id),
      {
        year: year,
        sanda: sanda,
        sabhar_sanda: sabhar_sanda,
        donations: donations,
        status: paid == true ? "paid" : "unpaid",
      }
    );
  };

  return (
    <div className="w-full h-[400px]">
      <div className="flex justify-between w-full  mb-2 items-center ">
        <button
          className="border-2 rounded-full px-4 py-2"
          onClick={() => modalRef.current.open()}
        >
          ADD
        </button>
        <div className="text-xl font-semibold">{memberName}</div>
        <button
          className="text-3xl text-red-500 font-bold cursor-pointer"
          onClick={() => setOpen(false)}
        >
          X
        </button>
      </div>

      <Modal ref={modalRef}>
        <div className="w-full flex flex-col items-center space-y-4 pt-4">
          <div className="text-3xl text-blue-500 font-semibold">Add Data</div>
          <div className=" grid grid-cols-3 gap-x-8 gap-y-4 p-4">
            <input
              type="number"
              onChange={(e) => setYear(e.target.value)}
              className="outline-none border-b p-4"
              placeholder="Enter Year"
            />
            <input
              type="number"
              onChange={(e) => setSanda(e.target.value)}
              className="outline-none border-b p-4"
              placeholder="Sanda"
            />
            <input
              type="number"
              onChange={(e) => setSabhar_sanda(e.target.value)}
              className="outline-none border-b p-4"
              placeholder="Sabhar Sanda"
            />
            <input
              type="number"
              onChange={(e) => setDonations(e.target.value)}
              className="outline-none border-b p-4"
              placeholder="Donations"
            />
            <input
              type="checkbox"
              checked={paid}
              onChange={(e) => {
                setPaid(e.target.checked);
                paid ? setStatus("paid") : setStatus("unpaid");
              }}
              className="outline-none border-b p-4 h-8 w-8"
              label="Paid"
            />
          </div>

          <button
            onClick={() => {
              // console.log(name);
              edit ? updateData(id) : addData();
              if (edit == true) {
                setEdit(!edit);
              }
              modalRef.current.close();
            }}
            className="text-2xl bg-black hover:bg-gray-700 text-white rounded-full px-4 py-1"
          >
            {edit ? `EDIT` : `CREATE`}
          </button>
        </div>
      </Modal>
      <Modal ref={recordRef}>
        <Form
          recordRef={recordRef}
          memberName={memberName}
          year={year}
          sanda={sanda}
          sabhar_sanda={sabhar_sanda}
          donations={donations}
          memberAddress={address}
          setOpenRecord={setOpenRecord}
          openRecord={openRecord}
        />
      </Modal>
      <div className=" w-full grid grid-cols-7 gap-y-4">
        <div>YEAR</div>
        <div>SANDA</div>
        <div>SABHAR SANDA</div>
        <div>DONATIONS</div>
        <div>STATUS</div>
        <div>ACTIONS</div>
        <div>PRINT</div>
      </div>
      {datas.map((data) => (
        <div className=" w-full grid grid-cols-7 gap-y-4 mt-4">
          <div>{data.data().year}</div>
          <div>{data.data().sanda}</div>
          <div>{data.data().sabhar_sanda}</div>
          <div>{data.data().donations}</div>
          <div>{data.data().status}</div>

          <button
            onClick={() => {
              setEdit(true);
              setId(data.id);
              modalRef.current.open();
            }}
            className="border-2 rounded-full px-4 py-2"
          >
            EDIT
          </button>
          <button
            onClick={() => {
              setYear(data.data().year);
              setSanda(data.data().sanda);
              setSabhar_sanda(data.data().sabhar_sanda);
              setDonations(data.data().donations);
              setOpenRecord(true);
              recordRef.current.open();
            }}
          >
            Print
          </button>
        </div>
      ))}
    </div>
  );
}

export default Records;
