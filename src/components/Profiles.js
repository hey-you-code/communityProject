import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
// import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import ProfileCard from "./ProfileCard";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Profiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "profiles"), orderBy("houseNo", "asc")),
        (snapshot) => {
          setProfiles(snapshot.docs);
        }
      ),

    [db]
  );

  console.log(profiles);

  return (
    <div className="bg-gray-100 h-full overflow-scroll flex-1 w-full p-4">
      {/* Header */}
      <div className="absolute top-2 py-4 right-8">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            background: "#1E1E1E",
            color: "white",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Search Profiles"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <Divider
            sx={{ height: 28, m: 0.5, color: "white", background: "white" }}
            orientation="vertical"
          />
          <IconButton
            type="button"
            sx={{ p: "10px", color: "white" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      {/* ProfileCards */}
      <div className="grid grid-cols-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            name={profile.data().name}
            id={profile.id}
            address={profile.data().address}
            houseId={profile.data().houseNo}
          />
        ))}
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
}

export default Profiles;
