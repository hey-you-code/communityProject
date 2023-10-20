import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formData, setFormData, setFormInfo } from "../store/formSlice";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

function Form({
  modalRef,
  recordRef,
  memberName,
  year,
  sanda,
  sabhar_sanda,
  donations,
  memberAddress,
  setOpenRecord,
  openRecord,
}) {
  const [name, setName] = useState(memberName || "");
  const [address, setAddress] = useState(memberAddress || "");
  const [items, setItems] = useState([
    {
      id: 1,
      desc: "Pujar Sanda",
      price: sanda || 0,
    },
    {
      id: 2,
      desc: "Sabhar Sanda",
      price: sabhar_sanda || 0,
    },
    {
      id: 3,
      desc: "Donations",
      price: donations || 0,
    },
    {
      id: 4,
      desc: "Fine",
      price: 0,
    },
  ]);
  const [sum, setSum] = useState(0);

  const getTotal = () => {
    setSum(
      items.reduce(
        (total, currentValue) => (total = total + parseInt(currentValue.price)),
        0
      )
    );
  };

  const dispatch = useDispatch();

  return (
    <div className="mt-2 p-2 ">
      <div className="flex w-full justify-center items-center text-xl space-x-4">
        <TextField
          label="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=""
          variant="standard"
        />
        <TextField
          label="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className=""
          variant="standard"
        />
      </div>

      <div className="">
        <div className="grid grid-cols-4 mt-4">
          {items.map((item, index) => (
            <div
              className=" items-center grid grid-cols-2   p-4 text-2xl"
              key={index}
            >
              <TextField
                label={item.desc}
                //  className="text-xl"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                size="large"
                sx={{
                  // width: 300,
                  // height: 300,
                  paddingTop: 2,

                  "& .MuiInputLabel-root": {
                    fontSize: "1.5rem",
                    color: "black",
                  },
                }}
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
              />
            </div>
          ))}
        </div>
        <div className="items-center justify-evenly flex my-4">
          <button
            className="rounded-full py-2 px-4  bg-black text-white"
            onClick={getTotal}
          >
            Get Total
          </button>
          <div>
            <span className="text-3xl">Total: Rs {sum}</span>
          </div>
        </div>

        <Link to="/"
          onClick={() => {
            dispatch(setFormData(items));
            dispatch(
              setFormInfo({
                name: name,
                address: address,
                sum: sum,
              })
            );
            !openRecord ? modalRef.current.close() : recordRef.current.close();
            if (openRecord) {
              setOpenRecord(!openRecord);
            }

          }}
        >

          Done
        </Link>
      </div>
    </div>
  );
}

export default Form;
