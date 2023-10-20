import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

function CreateProfile({ modalRef }) {
  const [houseNo, setHouseNo] = useState(0);
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [address, setAddress] = useState("");
  const [people, setPeople] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);

  const uploadProfile = async () => {
    await addDoc(collection(db, "profiles"), {
      houseNo: houseNo,
      name: name,
      fatherName: fatherName,
      address: address,
      people: people,
      male: male,
      female: female,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 pt-4">
      <div className="text-3xl text-blue-500 font-semibold">Create Profile</div>
      <div className=" grid grid-cols-3 gap-x-8 gap-y-4 p-4">
        <input
          type="number"
          onChange={(e) => setHouseNo(e.target.value)}
          className="outline-none border-b p-4 "
          placeholder="House No."
        />
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="outline-none border-b p-4 "
          placeholder="Enter Name"
        />
        <input
          type="text"
          onChange={(e) => setFatherName(e.target.value)}
          className="outline-none border-b p-4"
          placeholder="Enter Father's/Husband's Name"
        />
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          className="outline-none border-b p-4"
          placeholder="Enter Address"
        />
        <input
          type="number"
          onChange={(e) => setPeople(e.target.value)}
          className="outline-none border-b p-4"
          placeholder="Number of people"
        />
        <input
          type="number"
          onChange={(e) => setMale(e.target.value)}
          className="outline-none border-b p-4"
          placeholder="Number of Males"
        />
        <input
          type="number"
          onChange={(e) => setFemale(e.target.value)}
          className="outline-none border-b p-4"
          placeholder="Number of Females"
        />
      </div>

      <button
        onClick={() => {
          // console.log(name);
          uploadProfile();
          modalRef.current.close();
        }}
        className="text-2xl bg-black hover:bg-gray-700 text-white rounded-full px-4 py-1"
      >
        Create
      </button>
    </div>
  );
}

export default CreateProfile;
