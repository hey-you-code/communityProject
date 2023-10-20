import "./App.css";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import Profiles from "./components/Profiles";
import SideBar from "./components/SideBar";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="text-3xl my-4  pt-4 px-4 font-bold text-blue-500">
          <h1>Gopal Krishna Satra</h1>
        </div>
        <div className="flex h-full w-full">
          {/* sideBar */}
          <SideBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path ="/profiles" element={<Profiles />}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile/:id" element={<ProfilePage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
