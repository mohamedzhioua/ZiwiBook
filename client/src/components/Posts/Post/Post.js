import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// features
import { openModal } from "../../../app/features/modal/modalSlice";
import {
  selectPostById,
  useLikePostMutation,
} from "../../../app/features/post/postSlice";

// Components
import { Comments, CustomButton, Likes, PostHead, Card } from "../../index";
import CommentForm from "./Comments/CommentForm";

// Styles
import { GoComment } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import "./index.css";
import {
  selectAllComments,
  useAddNewCommentMutation,
} from "../../../app/features/comment/commentSlice";

const Post = ({ postId, user }) => {
  const [likePost] = useLikePostMutation();
  const [addNewComment] =useAddNewCommentMutation();

  const [commentOpen, setCommentOpen] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, postId));
  const LIKES = post?.likes;
  const canDelete = Boolean(
    user?._id === post?.owner?._id || user?._id === post?.owner
  );

  //filetring comments by post and sorting them
  const comments = useSelector(selectAllComments)?.filter(
    (comment) => comment.post === post?._id
  );

  //rootcomments that have no parent
  const rootComments = comments.filter((comment) => comment.parentId === null);

  // onsubmitHandler
  async function addComment(text) {
    if (Boolean(text)) {
      let id = post?._id;
      await addNewComment({ id , text }).unwrap();
    }
  }
  return (
    <Card>
      <PostHead post={post} userId={user?._id} />
      <p className="post-text">{post?.text.substring(0, 20)}</p>
      {post?.image && (
        <img src={post?.image} className="post-image" alt="..." />
      )}
      <hr />
      <div className="post_footer-row" style={{ padding: "10px" }}>
        <div onClick={() => likePost(post?._id)}>
          <Likes userId={user?._id} LIKES={LIKES} />
        </div>
        <div>
          <CustomButton
            Icon={GoComment}
            onClick={() => setCommentOpen(!commentOpen)}
          >
            &nbsp;
            {comments.length === 0
              ? "comment"
              : `${comments.length} ${
                  comments.length > 1 ? "comments" : "comment"
                }`}
          </CustomButton>
        </div>

        <div>
          {canDelete && (
            <CustomButton
              Icon={BsTrash}
              onClick={() => {
                dispatch(
                  openModal({
                    name: "DeleteConfirm",
                    childrenProps: { id: post?._id },
                  })
                );
              }}
            >
              &nbsp;Delete
            </CustomButton>
          )}
        </div>
      </div>
      {commentOpen && (
        <section>
          <CommentForm submitLabel="write" onSubmit={addComment} />
          {rootComments != null && rootComments.length > 0 && (
            <div className="comments-section">
              <Comments rootComments={rootComments} />
            </div>
          )}
        </section>
      )}
    </Card>
  );
};

export default Post;
