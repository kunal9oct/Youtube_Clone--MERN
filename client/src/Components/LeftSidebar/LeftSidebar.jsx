import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import shorts from "./shorts.png";
import "./LeftSidebar.css";

function LeftSidebar() {
  return (
    <div className="container_leftSidebar max-[450px]:flex max-[450px]:flex-col max-[450px]:gap-4 max-[360px]:gap-5">
      <NavLink to={"/"} className="icon_sidebar_div">
        <AiOutlineHome size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon max-[450px]:hidden">Home</div>
      </NavLink>
      <NavLink to={"/explore"} className="icon_sidebar_div">
        <MdOutlineExplore size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon max-[450px]:hidden">Explore</div>
      </NavLink>
      <div className="icon_sidebar_div">
        <img src={shorts} width={22} className="icon_sidebar" />
        <div className="text_sidebar_icon max-[450px]:hidden">Shorts</div>
      </div>
      <div className="icon_sidebar_div">
        <MdOutlineSubscriptions size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon max-[450px]:hidden" style={{ fontSize: "0.8rem" }}>
          Subscriptions
        </div>
      </div>
      <NavLink to={"/library"} className="icon_sidebar_div">
        <MdOutlineVideoLibrary size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon max-[450px]:hidden">Library</div>
      </NavLink>
      <NavLink to={"/askQuestions"} className="icon_sidebar_div">
        <img
          src="/assets/icons/add-post.svg"
          width={22}
          className="icon_sidebar"
        />
        <div
          className="text_sidebar_icon max-[450px]:hidden"
          style={{ fontSize: "1rem", textAlign: "center" }}
        >
          Ask Questions
        </div>
      </NavLink>
      <NavLink to={"/createPost"} className="icon_sidebar_div ">
        <img
          src="/assets/icons/edit.svg"
          width={22}
          className="icon_sidebar invert-white"
        />
        <div
          className="text_sidebar_icon max-[450px]:hidden"
          style={{ fontSize: "1rem", textAlign: "center" }}
        >
          Create Post
        </div>
      </NavLink>
    </div>
  );
}

export default LeftSidebar;
