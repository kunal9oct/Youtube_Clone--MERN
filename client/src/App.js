import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter as Router } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();

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
      <Navbar setEditCreateChannelBtn={setEditCreateChannelBtn} toggleDrawer={toggleDrawer} />

      <DrawerSidebar toggleDrawer={toggleDrawer} toggleDrawerSidebar={toggleDrawerSidebar} />

      <AllRoutes setVidUploadPage={setVidUploadPage} setEditCreateChannelBtn={setEditCreateChannelBtn} />
    </Router>
  );
}

export default App;
