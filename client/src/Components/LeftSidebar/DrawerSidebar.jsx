import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftSidebar.css";
import { AiFillLike, AiFillPlaySquare, AiOutlineHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
} from "react-icons/md";
import shorts from "./shorts.png";

function DrawerSidebar({ toggleDrawer, toggleDrawerSidebar }) {
  return (
    <div className="container_DrawerLeftSidebar" style={toggleDrawerSidebar}>
      <div className="container2_DrawerLeftSidebar">
        <div className="Drawer_leftsidebar">
          <NavLink to={'/'} className="icon_sidebar_div">
            <p>
              <AiOutlineHome
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Home</div>
            </p>
          </NavLink>

          <div className="icon_sidebar_div">
            <p>
              <MdOutlineExplore
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Explore</div>
            </p>
          </div>

          <div className="icon_sidebar_div">
            <p>
              <img
                src={shorts}
                width={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Shorts</div>
            </p>
          </div>

          <div className="icon_sidebar_div">
            <p>
              <MdOutlineSubscriptions
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Subscriptions</div>
            </p>
          </div>
        </div>

        <div className="libraryBtn_DrawerleftSidebar">
          <NavLink to={'/library'} className="icon_sidebar_div">
            <p>
              <MdOutlineVideoLibrary
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Library</div>
            </p>
          </NavLink>

          <NavLink to={'/history'} className="icon_sidebar_div">
            <p>
              <FaHistory
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">History</div>
            </p>
          </NavLink>

          <NavLink to={'/yourvideos'} className="icon_sidebar_div">
            <p>
              <AiFillPlaySquare
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Your Videos</div>
            </p>
          </NavLink>

          <NavLink to={'/watchlater'} className="icon_sidebar_div">
            <p>
              <MdOutlineWatchLater
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Watch Later</div>
            </p>
          </NavLink>

          <NavLink to={'likedvideo'} className="icon_sidebar_div">
            <p>
              <AiFillLike
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Liked Videos</div>
            </p>
          </NavLink>
        </div>

        <div className="subScriptions_lsdbar">
            <h3>Your Subscriptions</h3>
            <div className="chanel_lsdbar">
                <p>A</p>
                <div>Channel 1</div>
            </div>
            <div className="chanel_lsdbar">
                <p>B</p>
                <div>Channel 2</div>
            </div>
            <div className="chanel_lsdbar">
                <p>C</p>
                <div>Channel 3</div>
            </div>
            <div className="chanel_lsdbar">
                <p>D</p>
                <div>Channel 4</div>
            </div>
            <div className="chanel_lsdbar">
                <p>E</p>
                <div>Channel 5</div>
            </div>
        </div>

      </div>

      <div className="container3_DrawerLeftSidebar" onClick={() => toggleDrawer()}>

      </div>

    </div>
  );
}

export default DrawerSidebar;
