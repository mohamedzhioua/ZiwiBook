import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
//components
import CommentForm from "./CommentForm";
import { Card, Comments, CustomButton, CustomLikes } from "../index";

// Styles
import "./index.css";
import {
  addCommentReply,
  deleteComment,
  updateComment,
} from "../../app/features/post/postSlice";
import { BsTrash } from "react-icons/bs";
import { FaReply, FaEdit } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const CurrentUserId = useSelector((state) => state.auth.user._id);
  const { comments, status } = useSelector((state) => state.post);
  const [areRepliesHidden, setAreRepliesHidden] = useState(true);
  const [activeComment, setActiveComment] = useState(null);
  const id = activeComment?.id;

  // replies
  const getReplies = comments
    .filter((i) => i.parentId === comment._id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // checking if the user is allowed to Reply, Edit or Delete
  const canReply = Boolean(CurrentUserId);
  const canEdit = CurrentUserId === comment?.owner?._id;
  const canDelete = CurrentUserId === comment?.owner?._id;

  // conditions to know what exactly the User willing to do
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment._id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;

  //comment old text field
  const InitialText = useSelector((state) =>
    state.post.comments.find((comment) => comment._id === id)
  );

  //onsubmitHandler
  const addComment = (text) => {
    const canAddReply =
      Boolean(activeComment.type === "replying") && Boolean(text);
    const canEditComment =
      Boolean(activeComment.type === "editing") && Boolean(text);
    if (canAddReply) {
      try {
        dispatch(addCommentReply({ id, text })).unwrap();
        setActiveComment(null);
      } catch (error) {
        console.error("failed to save the comment", error);
      }
    }

    if (canEditComment) {
      try {
        dispatch(updateComment({ id, text })).unwrap();
        setActiveComment(null);
      } catch (error) {
        console.error("failed to save the comment", error);
      }
    }
  };

  //handle Editing cancel
  const EditCancelHandler = () => setActiveComment(null);

  return (
    <Card className="comment">
      <div className="comment-header">
        <div>
          <img className="comment-image" src={comment?.owner?.image} alt="." />
          <span className="author">{comment?.owner?.name}</span>
        </div>
        <span className="date">{moment(comment?.createdAt).fromNow()}</span>
      </div>
      {isEditing ? (
        <CommentForm
          autoFocus
          submitLabel="update"
          onSubmit={addComment}
          loading={status}
          hasCancelButton
          EditCancelHandler={EditCancelHandler}
          InitialText={InitialText.text}
          editAComment
        />
      ) : (
        <div className="comment-text">{comment?.text}</div>
      )}
      <div className="comment-actions">
        <CustomLikes />
        {!isEditing && (
          <>
            {canReply && (
              <CustomButton
                Icon={FaReply}
                onClick={() =>
                  setActiveComment({ id: comment?._id, type: "replying" })
                }
              />
            )}
            {canEdit && (
              <CustomButton
                Icon={FaEdit}
                onClick={() =>
                  setActiveComment({ id: comment?._id, type: "editing" })
                }
              />
            )}
            {canDelete && (
              <CustomButton
                type="submit"
                Icon={BsTrash}
                onClick={() =>
                  dispatch(deleteComment(comment?._id))
                    .unwrap()
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }
              />
            )}
          </>
        )}
      </div>
      {isReplying && (
        <div className="replying">
          <CommentForm
            autoFocus
            submitLabel="Reply"
            onSubmit={addComment}
            loading={status}
            replyToComment
          />
        </div>
      )}
      {/* Comment Replies */}

      {getReplies?.length > 0 && (
        <>
          <div
            className={`nested-replies-stack ${areRepliesHidden ? "hide" : ""}`}
          >
            <CustomButton
              className="collapse-line"
              area-label="Hide Replies"
              onClick={() => setAreRepliesHidden(true)}
            />
            <div className="nested-replies">
              <Comments rootComments={getReplies} />
            </div>
          </div>
          {areRepliesHidden && (
            <CustomButton
              Icon={CgDetailsMore}
              className={`icon icon-btn mt-1 ${
                !areRepliesHidden ? "hide" : ""
              }`}
              area-label="Show Replies"
              onClick={() => setAreRepliesHidden(false)}
            >
              &nbsp;
              {` ${getReplies.length} ${
                getReplies.length === 1 ? " more reply" : " more replies"
              }`}
            </CustomButton>
          )}
        </>
      )}
    </Card>
  );
};

export default Comment;
