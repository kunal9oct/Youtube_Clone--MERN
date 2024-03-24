import React from 'react'
import ShowVideo from "../ShowVideo/ShowVideo";
import { useSelector } from 'react-redux';

function ShowVideoList({ videoId }) {
  const vids = useSelector(s => s.videoReducer);

  return (
    <div className="Container_ShowVideoGrid">
      {vids?.data?.filter(q => q._id === videoId).map((video) => {
        return (
          <div key={video._id} className="video_box_app">
            <ShowVideo vid={video} />
          </div>
        );
      })}
    </div>
  )
}

export default ShowVideoList
