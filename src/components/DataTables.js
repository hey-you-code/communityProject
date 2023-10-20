import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Modal from "./Modal";
import { useParams } from "react-router-dom";

function DataTables({ memberID, setOpen, profile_id, memberName, datas }) {
  // const params = useParams();
  // const { profile_id } = params;
  // console.log("profileID ", id);
  const modalRef = useRef();
  const [id, setId] = useState(datas.id);
  const [year, setYear] = useState(0);
  const [sanda, setSanda] = useState(0);
  const [sabhar_sanda, setSabhar_sanda] = useState(0);
  const [donations, setDonations] = useState(0);
  const [paid, setPaid] = useState(false);
  const [status, setStatus] = useState("unpaid");
  // const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);

  //   const [member, setMember] = useState();
  // useEffect(() => {
  //     const getMember = async () => {
  //       const docSnap = await getDoc(doc(db, "profiles", id, "members", memberID));

  //       console.log("data:", docSnap.data());

  //       setMember(docSnap.data());
  //     };

  //     getMember();
  // }, [db])

  //   console.log("member", member);

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "profiles", profile_id, "members", memberID, "data"),
  //         orderBy("year", "desc")
  //       ),
  //       (snapshot) => {
  //         setDatas(snapshot.docs);
  //       }
  //     ),

  //   [db]
  // );

  const addData = async () => {
    await addDoc(
      collection(db, "profiles", profile_id, "members", memberID, "data"),
      {
        id: id,
        year: year,
        sanda: sanda,
        sabhar_sanda: sabhar_sanda,
        donations: donations,
        status: paid == true ? "paid" : "unpaid",
      }
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "year",
      headerName: "YEAR",
      type: "number",
      editable: true,
      width: 130,
    },
    {
      field: "sanda",
      headerName: "SANDA",
      type: "number",
      editable: true,
      width: 130,
    },
    {
      field: "sabhar_sanda",
      headerName: "SABHAR SANDA",
      type: "number",
      editable: true,
      width: 130,
    },
    {
      field: "donations",
      headerName: "DONATIONS",
      type: "number",
      editable: true,
      width: 130,
    },
    {
      field: "status",
      headerName: "STATUS",
      type: "boolean",
      width: 100,
      editable: true,
    },
  ];

  // const rows = [
  //   { id: 1, year: 2023, sanda: 400, sabhar_sanda: 300, donations: 200 },
  // ];

  return (
    <div className="w-full">
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
              onChange={(e) => setId(e.target.value)}
              className="outline-none border-b p-4 "
              placeholder="ID"
            />
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
              addData();
              modalRef.current.close();
            }}
            className="text-2xl bg-black hover:bg-gray-700 text-white rounded-full px-4 py-1"
          >
            Create
          </button>
        </div>
      </Modal>
      <div className="h-[375px] w-full  space-x-4">
        <DataGrid
          rows={datas.map((data) => data.id)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}

export default DataTables;
