import { useEffect, useState } from 'react';
import './App.css';
import './myStyles.css';
import React from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AllRoutes from './Components/AllRoutes';
import DrawerSidebar from './Components/LeftSidebar/DrawerSidebar.jsx';
import CreateEditChannel from './Pages/Channel/CreateEditChannel.jsx';
import { useDispatch } from 'react-redux';
import { fetchAllChannel } from './actions/channelUser.js';
import VideoUpload from './Pages/VideoUpload/VideoUpload.jsx';
import { getAllVideo } from './actions/video.js';
import { getAlllikedVideo } from './actions/likedVideo.js';
import { getAllwatchLater } from './actions/watchLater.js';
import { getAllHistory } from './actions/History.js';
import { getAllComment } from './actions/comments.js';
import AuthLayout from "./Pages/Auth/AuthLayout.jsx";
import SigninForm from "./Pages/Auth/forms/SigninForm.jsx";
import SignupForm from "./Pages/Auth/forms/SignupForm.jsx";

function App() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    dispatch(fetchAllChannel());
    dispatch(getAllVideo());
    dispatch(getAlllikedVideo());
    dispatch(getAllwatchLater());
    dispatch(getAllHistory());
    dispatch(getAllComment());
  }, [dispatch])

  const [toggleDrawerSidebar, setToggleDrawerSidebar] = useState({
    display: "none",
  })

  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === "none") {
      setToggleDrawerSidebar({
        display: "flex",
      })
    } else {
      setToggleDrawerSidebar({
        display: "none",
      })
    }
  };

  const [vidUploadPage, setVidUploadPage] = useState(false);

  const [editCreateChannelBtn, setEditCreateChannelBtn] = useState(false);

  return (
    <Router>
      {vidUploadPage && <VideoUpload setVidUploadPage={setVidUploadPage} />}
      {
        editCreateChannelBtn && <CreateEditChannel setEditCreateChannelBtn={setEditCreateChannelBtn} />
      }
      <Navbar display={display} setEditCreateChannelBtn={setEditCreateChannelBtn} toggleDrawer={toggleDrawer} />

      <DrawerSidebar toggleDrawer={toggleDrawer} toggleDrawerSidebar={toggleDrawerSidebar} />

      <AllRoutes setDisplay={setDisplay} setVidUploadPage={setVidUploadPage} setEditCreateChannelBtn={setEditCreateChannelBtn} />

      <Routes>
        <Route element={<AuthLayout setDisplay={setDisplay} />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
