import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  getDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import AddMembers from "./AddMembers";
import Modal from "./Modal";
import DataTables from "./DataTables";
import Records from "./Records";

function ProfilePage() {
  const params = useParams();
  const { id } = params;
  const modalRef = useRef();
  const [members, setMembers] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "profiles", id, "members"), (snapshot) => {
        setMembers(snapshot.docs);
      }),

    [db]
  );

  console.log(members);

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const docSnap = await getDoc(doc(db, "profiles", id));

      console.log(docSnap.data());

      setProfile(docSnap.data());
    };

    getUser();
  }, [db]);

  console.log(profile);

  const [open, setOpen] = useState(false);
  const [memberID, setMemberID] = useState("");
  const [member, setMember] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [datas, setDatas] = useState([]);

  console.log("id: ", memberID);

  const viewTable = (memberId) =>
    onSnapshot(
      query(
        collection(db, "profiles", id, "members", memberId, "data"),
        orderBy("year", "desc")
      ),
      (snapshot) => {
        setDatas(snapshot.docs);
      }
    );

  //   console.log("member", member);

  return (
    <div className="h-screen bg-gray-50 w-screen">
      <div className="text-3xl font-semibold justify-center flex">
        <h1>{profile.name}</h1>
      </div>
      <div className="text-2xl font-semibold mt-4 flex justify-evenly space-x-4 mb-4">
        <span>Father's/Husband's Name - {profile.fatherName}</span>
        <span>No of males- {profile.male}</span>
        <span>No of females- {profile.female}</span>
        <span>No of people- {profile.people}</span>
      </div>
      <div className="flex p-4">
        <button
          className="bg-blue-500 text-xl text-white px-4 py-2 rounded-full"
          onClick={() => modalRef.current.open()}
        >
          Add Members
        </button>

        <Modal ref={modalRef}>
          <AddMembers modalRef={modalRef} profileId={id} />
        </Modal>
      </div>
      <div className="p-4 space-x-4 flex">
        <div>
          {members.map((member) => {
            console.log(member.data().employable === true ? "true" : "false");
            return (
              <div
                className="grid  grid-cols-3 space-x-4 py-4 "
                key={member.id}
              >
                <div className="text-xl font-semibold">
                  {member.data().name}
                </div>

                {!member.data().employable ? (
                  <div>non Applicale</div>
                ) : (
                  <div>applicable</div>
                )}

                {member.data().employable && (
                  <>
                    <button
                      onClick={() => {
                        setMemberID(member.id);
                        setMemberName(member.data().name);
                        viewTable(member.id);
                        setOpen(true);
                        //   console.log(member.id);
                      }}
                      className="bg-black text-white px-4 py-2 w-[200px] rounded-full "
                    >
                      View
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex w-1/2 mt-4 mx-4">
          {open ? (
            // <DataTables
            //   memberID={memberID}
            //   setOpen={setOpen}
            //   profile_id={id}
            //   memberName={memberName}
            //   datas={datas}
            // />
            <Records memberID={memberID}
              setOpen={setOpen}
              profile_id={id}
              memberName={memberName}
              datas={datas}
              address={profile.address}
              />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
