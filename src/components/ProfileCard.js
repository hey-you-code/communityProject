import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProfileCard({ name, id, houseId }) {
  return (
    <div className="h-[250px] w-[180px] shadow-xl rounded-xl my-2  bg-white  border-x-2 ">
      <div className="h-1/2">
        <img
          src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202304/f7j6hnt4brnuxnqb3ose6lxafm-sixteen_nine.jpg?size=948:533"
          alt=""
          className="cover rounded-t-xl"
        />
      </div>
      <div className="flex justify-center text-center">
        <div>
          <h2>{name}</h2>
          <h3>{houseId}</h3>
        </div>
      </div>
      <div className="flex justify-center text-center">
        <Link to={`/communityProject/profile/${id}`}>
          <button className="rounded-full bg-[#1E1E1E] justify-center items-center  flex text-white px-4 py-2 mt-2 hover:opacity-90">
            View Profile
          </button>
        </Link>
      </div>
      {/* image */}
      {/* Info */}
    </div>
  );
}

export default ProfileCard;
