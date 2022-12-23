import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import LayOut from "./pages/LayOut";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import 'react-toastify/dist/ReactToastify.css';
import Search from "./pages/Search";
import Tags from "./pages/Tags";
import Profile from "./pages/Profile";
import HomeProfile from "./components/Profile/HomeProfile";
import VideoUser from "./components/Profile/VideoUser";
import VideoLiked from "./components/Profile/VideoLiked";
import VideoSaved from "./components/Profile/VideoSaved";
import SubUser from "./components/Profile/SubUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />} >
          <Route index element={<Home type="random" />} />
          <Route path="/trends" element={<Home type="trend" />} />
          <Route path="/sub" element={<Home type="sub" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/videos/:videoId" element={<Video />} />
          <Route path="/tags/:tags" element={<Tags />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="/profile" element={<HomeProfile />} />
            <Route path="/profile/sub" element={<SubUser />} />
            <Route path="/profile/video" element={<VideoUser />} />
            <Route path="/profile/liked" element={<VideoLiked />} />
            <Route path="/profile/saved" element={<VideoSaved />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
{/* <Route path="/video" element={<Video />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/video/:id/edit" element={<Video />} />
        <Route path="/video/:id/delete" element={<Video />} />
        <Route path="/video/:id/play" element={<Video />} />
        <Route path="/video/:id/pause" element={<Video />} />
        <Route path="/video/:id/seek" element={<Video />} />
        <Route path="/video/:id/volume" element={<Video />} />
        <Route path="/video/:id/mute" element={<Video />} />
        <Route path="/video/:id/unmute" element={<Video />} />
        <Route path="/video/:id/fullscreen" element={<Video />} />
        <Route path="/video/:id/screenshot" element={<Video />} /> */}
