import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
//features
import {
  selectAllComments,
  selectCommentById,
  useAddCommentReplyMutation,
  useDeleteCommentMutation,
  useFetchCommentsQuery,
  useLikeCommentMutation,
  useUpdateCommentMutation,
} from "../../../../app/features/comment/commentSlice";
//components
import CommentForm from "./CommentForm";
import { Comments, CustomButton } from "../../../index";
import chekedlike from "../../../../svg/like.svg";

// Styles
import "./index.css";

import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => state.auth);
  const [areRepliesHidden, setAreRepliesHidden] = useState(true);
  const [activeComment, setActiveComment] = useState(null);
  const id = activeComment?.id;
  const LIKES = comment?.likes;
  const { isLoading: fetchIsLoading, isFetching: CommentsIsFetching } =
    useFetchCommentsQuery();
  const [addCommentReply] = useAddCommentReplyMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const fetchLoading = fetchIsLoading || CommentsIsFetching;
  // replies
  const getReplies = useSelector(selectAllComments)?.filter(
    (i) => i.parentId === comment?._id
  );

  //User Can Edit or Delete his own comment
  const canDeleteEdit = Boolean(
    user._id === comment?.owner?._id || user._id === comment?.owner
  );

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
  const InitialText = useSelector((state) => selectCommentById(state, id));

  //onsubmitHandler
  const addComment = (text) => {
    const canAddReply =
      Boolean(activeComment.type === "replying") && Boolean(text);
    const canEditComment =
      Boolean(activeComment.type === "editing") && Boolean(text);
    if (canAddReply) {
      try {
        addCommentReply({ id, text }).unwrap();
        setActiveComment(null);
      } catch (error) {
        console.error("failed to save the comment", error);
      }
    }

    if (canEditComment) {
      try {
        updateComment({ id, text }).unwrap();
        setActiveComment(null);
      } catch (error) {
        console.error("failed to save the comment", error);
      }
    }
  };

  //handle Editing cancel
  const EditCancelHandler = () => setActiveComment(null);

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-header-left">
          <Link
            to={`/profile/${comment?.owner?.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              className="comment-image"
              src={comment?.owner?.photo}
              alt="."
            />
          </Link>
        </div>
        <div className="comment-header-right">
          <div className="comment_info">
            <Link
              to={`/profile/${comment?.owner?.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="comment_info_auther"
            >
              {comment?.owner?.firstName}
            </Link>

            {isEditing ? (
              <CommentForm
                autoFocus
                submitLabel="update"
                onSubmit={addComment}
                loading={fetchLoading}
                hasCancelButton
                EditCancelHandler={EditCancelHandler}
                InitialText={InitialText.text}
              />
            ) : (
              <div className="comment_info_text">{comment?.text}</div>
            )}
            {Boolean(LIKES?.length > 0) && (
              <div className="comment_info_likes">
                <img src={chekedlike} alt="" style={{ width: "18px" }} />
                <span>{LIKES?.length}</span>
              </div>
            )}
          </div>

          <div className="comment-actions">
            {!isEditing && (
              <>
                <span
                  className="actions"
                  onClick={() => likeComment(comment?._id)}
                >
                  Like
                </span>

                <span
                  className="actions"
                  onClick={() =>
                    setActiveComment({ id: comment?._id, type: "replying" })
                  }
                >
                  Reply
                </span>

                {canDeleteEdit && (
                  <>
                    <span
                      className="actions"
                      onClick={() =>
                        setActiveComment({
                          id: comment?._id,
                          type: "editing",
                        })
                      }
                    >
                      Edit
                    </span>

                    <span
                      className="actions"
                      onClick={() => deleteComment(comment?._id)}
                    >
                      Delete
                    </span>
                    <span className="comment_date">
                      {moment(comment?.createdAt).fromNow()}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <div className="replying">
          <CommentForm
            autoFocus
            submitLabel="Reply"
            onSubmit={addComment}
            loading={fetchLoading}
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
    </div>
  );
};

export default Comment;
