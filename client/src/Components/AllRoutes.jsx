import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home.jsx";
import Library from "../Pages/Library/Library.jsx";
import WatchHistory from "../Pages/WatchHistory/WatchHistory.jsx";
import YourVideo from "../Pages/YourVideo/YourVideo.jsx";
import WatchLater from "../Pages/WatchLater/WatchLater.jsx";
import LikedVideo from "../Pages/LikedVideo/LikedVideo.jsx";
import VideoPage from "../Pages/VideoPage/VideoPage.jsx";
import Channel from "../Pages/Channel/Channel.jsx";
import Search from "../Pages/Search/Search.jsx";
import AskQuestions from "../Pages/AskQuestions/AskQuestions.jsx";
import CreatePost from "../Pages/CreatePost/CreatePost.jsx";
import Explore from "../Pages/Explore/Explore.jsx";
import EditProfile from "../Pages/EditProfile/EditProfile.jsx";
import PublicLayout from "../Pages/PublicLayout.jsx";

function AllRoutes({ setEditCreateChannelBtn, setVidUploadPage, setDisplay }) {
  return (
    <Routes>
      <Route element={<PublicLayout setDisplay={setDisplay} />}>
        <Route path="/" element={<Home />} />
        <Route path="/askQuestions" element={<AskQuestions />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/editProfile/:Cid" element={<EditProfile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/history" element={<WatchHistory />} />
        <Route path="/yourvideos" element={<YourVideo />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/likedvideo" element={<LikedVideo />} />
        <Route path="/videopage/:vid" element={<VideoPage />} />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route
          path="/channel/:Cid"
          element={
            <Channel
              setVidUploadPage={setVidUploadPage}
              setEditCreateChannelBtn={setEditCreateChannelBtn}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
