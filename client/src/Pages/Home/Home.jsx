import React from "react";
import "./Home.css";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid";
import { useSelector } from "react-redux";

function Home() {
  const vids = useSelector(state => state.videoReducer)?.data?.filter(q => q).reverse();

  const NavList = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "MongoDB",
    "Express",
    "Animation",
    "JavaScript",
    "Node",
    "Gaming",
    "Music",
    "React",
    "Next.js",
    "Comedy",
    "Suspense",
    "C++",
    "Movies",
    "Science",
    "MongoDB",
    "Express",
    "Animation",
    "JavaScript",
  ];

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {NavList.map((m, index) => {
            return (
              <p key={m + index} className="btn_nav_home">
                {m}
              </p>
            );
          })}
        </div>
        <ShowVideoGrid vids={vids} />
      </div>
    </div>
  );
}

export default Home;
