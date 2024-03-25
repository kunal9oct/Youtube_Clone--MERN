import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import "./DescribeChannel.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DescribeChannel({ setEditCreateChannelBtn, Cid, setVidUploadPage }) {
  const channels = useSelector((state) => state?.channelReducers);
  const currentChannel = channels.filter((c) => c._id === Cid)[0];
  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  return (
    <div className="container3_channel">
      {CurrentUser?.result._id === currentChannel?._id && (
        <Link to={`/editProfile/${Cid}`} className="no-underline">
          {CurrentUser?.result.avatarImgURL ||
          CurrentUser?.result.profileImgURL ? (
            <div className="flex-center gap-3">
              <img
                src={
                  CurrentUser?.result.avatarImgURL ||
                  (CurrentUser?.result.profileImgURL &&
                    `https://youtube-clone-4ea3.onrender.com/uploads/${CurrentUser?.result?.profileImgURL}`)
                }
                alt="profile"
                className="h-24 w-24 max-[600px]:h-16 max-[600px]:w-16 max-[500px]:h-12 max-[500px]:w-12 rounded-full"
              />
            </div>
          ) : (
            <div className="Chanel_logo_App mx-auto h-24 w-24 max-[600px]:h-16 max-[600px]:w-16 max-[500px]:w-12 max-[500px]:h-12">
              <p className="fstChar_logo_App text-6xl max-[600px]:text-4xl max-[500px]:text-2xl">
                {CurrentUser?.result.name ? (
                  <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                ) : (
                  <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                )}
              </p>
            </div>
          )}
        </Link>
      )}
      <div className="description_channel">
        <b>{currentChannel?.name}</b>
        <p className="channel_desc-ji">{currentChannel?.desc}</p>
      </div>

      {CurrentUser?.result._id === currentChannel?._id && (
        <div className="channel_buttons">
          <p
            className="editbtn_channel"
            onClick={() => setEditCreateChannelBtn(true)}
          >
            <FaEdit />
            <b className="hideIt">Edit Channel</b>
          </p>

          <p
            className="uploadbtn_channel"
            onClick={() => setVidUploadPage(true)}
          >
            <FaUpload />
            <b className="hideIt">Upload Video</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default DescribeChannel;
