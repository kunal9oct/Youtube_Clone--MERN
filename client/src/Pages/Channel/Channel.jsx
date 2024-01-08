import React from 'react'
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid';
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar';
import DescribeChannel from './DescribeChannel';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import vid from "../../Components/Video/vid.mp4";

function Channel({ setEditCreateChannelBtn, setVidUploadPage }) {
  const { Cid } = useParams();
  const vids = useSelector(state => state.videoReducer)?.data?.filter(q => q.videoChannel === Cid).reverse();

    // const vids = [
    //     {
    //       _id: 1,
    //       video_src: vid,
    //       Chanel: "62bafe6752cea35a6c30685f",
    //       title: "video 1",
    //       Uploader: "abc",
    //       description: "description of  video 1",
    //     },
    //     {
    //       _id: 2,
    //       video_src: vid,
    //       Chanel: "cdd",
    //       title: "video 2",
    //       Uploader: "abc",
    //       description: "description of  video 2",
    //     },
    //     {
    //       _id: 3,
    //       video_src: vid,
    //       Chanel: "add",
    //       title: "video 3",
    //       Uploader: "abc",
    //       description: "description of  video 3",
    //     },
    //     {
    //       _id: 4,
    //       video_src: vid,
    //       Chanel: "add",
    //       title: "video 4",
    //       Uploader: "abc",
    //       description: "description of  video 4",
    //     },
    //   ];

  return (
        <div className="container_Pages_App">
          <LeftSidebar />
          <div className="container2_Pages_App">
            <DescribeChannel Cid={Cid} setVidUploadPage={setVidUploadPage} setEditCreateChannelBtn={setEditCreateChannelBtn} />
            <ShowVideoGrid vids={vids} />
          </div>
        </div>
      );
}

export default Channel
