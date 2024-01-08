import React, { useState } from "react";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/comments";
import moment from "moment";

function DisplayComments({ cId, commentBody, userCommented, userId, commentOn }) {
  const [edit, setEdit] = useState(false);
  const [cmtBdy, setCmtBdy] = useState("");
  const [commentId, setCommentId] = useState("");
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const dispatch = useDispatch();

  const handleEdit = (ctId, ctBdy) => {
    setEdit(true);
    setCommentId(ctId)
    setCmtBdy(ctBdy);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(!cmtBdy) {
      alert("Type Your comments");
    } else {
      dispatch(editComment({
        id: commentId,
        commentBody: cmtBdy
      }));
      setCmtBdy("");
    }
    setEdit(false);
  };

  const handleDel = (id) => {
    dispatch(deleteComment(id));
    // console.log(id);
  }

  return (
    <>
      {edit ? (
        <>
          <form
            className="comments_sub_form_comments"
            onSubmit={handleOnSubmit}
          >
            <input
              type="text"
              onChange={(e) => setCmtBdy(e.target.value)}
              value={cmtBdy}
              placeholder="Edit comment..."
              className="comment_ibox"
            />
            <input
              type="submit"
              value="Edit"
              className="comment_add_btn_comments"
            />
          </form>
        </>
      ) : (
        <>
          <p className="comment_body">{commentBody}</p>
        </>
      )}
      <p className="usercommented"> - {userCommented} commented {moment(commentOn).fromNow()}</p>
      {
        CurrentUser?.result._id === userId && (
          <p className="EditDel_DisplayComment">
            <i onClick={() => handleEdit(cId, commentBody)}>Edit</i>
            <i onClick={() => handleDel(cId)}>Delete</i>
          </p>
        )
      }
    </>
  );
}

export default DisplayComments;
