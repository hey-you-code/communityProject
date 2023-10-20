import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

function AddMembers({ modalRef, profileId }) {
  const [name, setName] = useState("");
  const [employable, setEmployable] = useState(false);
  // const [address, setAddress] = useState("");
  // const [people, setPeople] = useState(0);
  // const [male, setMale] = useState(0);
  // const [female, setFemale] = useState(0);

  const addMember = async () => {
    await addDoc(collection(db, "profiles", profileId, "members"), {
      name: name,
      employable: employable,
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 pt-4">
      <div className="text-3xl text-blue-500 font-semibold">Create Profile</div>
      {profileId}
      <div className=" grid grid-cols-3 gap-x-8 gap-y-4 p-4">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="outline-none border-b p-4 "
          placeholder="Enter Name"
        />
        <div className="flex space-x-4 text-xl p-4 items-center">
          <div className="text-xl">Employable:</div>
          <input
            type="checkbox"
            checked={employable}
            onChange={(e) => setEmployable(e.target.checked)}
            className="outline-none border-b p-4 h-8 w-8"
            label="Emplyoable"
          />
        </div>
      </div>

      <button
        onClick={() => {
          // console.log(name);
          addMember();
          modalRef.current.close();
        }}
        className="text-2xl bg-black hover:bg-gray-700 text-white rounded-full px-4 py-1"
      >
        Create
      </button>
    </div>
  );
}

export default AddMembers;
