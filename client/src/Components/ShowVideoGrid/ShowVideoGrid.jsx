import React from "react";
import ShowVideo from "../ShowVideo/ShowVideo";
import "./ShowVideoGrid.css";

function ShowVideoGrid({ vids }) {
  return (
    <div className="Container_ShowVideoGrid">
      {vids?.map((video, index) => {
        return (
          <div key={video.title + index} className="video_box_app">
            <ShowVideo vid={video} />
          </div>
        );
      })}
    </div>
  );
}

export default ShowVideoGrid;
