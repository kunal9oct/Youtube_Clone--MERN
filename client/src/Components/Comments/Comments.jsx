import React, { useState } from "react";
import "./Comments.css";
import DisplayComments from "./DisplayComments";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../actions/comments";

function Comments({ videoId }) {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const commentsList = useSelector((s) => s.commentReducer);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (CurrentUser) {
      if (!commentText) {
        alert("Please Type your comment !");
      } else {
        dispatch(
          postComment({
            videoId: videoId,
            userId: CurrentUser?.result._id,
            commentBody: commentText,
            userCommented: CurrentUser?.result.name,
          })
        );
        setCommentText("");
      }
    } else {
      alert("Please login to comment !");
    }
  };

  return (
    <>
      <form className="comments_sub_form_comments" onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
          placeholder="Add comment..."
          className="comment_ibox"
        />
        <input type="submit" value="Add" className="comment_add_btn_comments" />
      </form>

      <div className="display_comment_container">
        {commentsList?.data
          ?.filter((q) => videoId === q?.videoId)
          .reverse()
          .map((m) => {
            return (
              <DisplayComments
                key={m.commentBody}
                cId={m._id}
                userId={m.userId}
                commentBody={m.commentBody}
                commentOn={m.commentOn}
                userCommented={m.userCommented}
              />
            );
          })}
      </div>
    </>
  );
}

export default Comments;
