import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// features
import { openModal } from "../../app/features/modal/modalSlice";
import { likePost } from "../../app/features/post/postSlice";

// Components
import { Comments, CustomButton, Likes, PostHead, Card } from "../index";
import CommentForm from "../Comments/CommentForm";

// Styles
import { GoComment } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import "./index.css";
import { AddComment } from "../../app/features/comment/commentSlice";

const Post = ({ post, userId }) => {

  const [commentOpen, setCommentOpen] = useState(false);
  const dispatch = useDispatch();
  const LIKES = post?.likes;

  //filetring comments by post and sorting them
  const comments = useSelector((state) => state.comment.comments)
    .filter((comment) => comment.post === post._id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  //rootcomments that have no parent
  const rootComments = comments.filter((comment) => comment.parentId === null);

  //grouping comments by parentId
  // const commentsByParentId = useMemo(() => {
  //   const group = {}
  //   comments.forEach(comment => {
  //     group[comment.parentId] ||= []
  //     group[comment.parentId].push(comment)
  //   })
  //   return group
  // }, [comments])
  // const rootComments = commentsByParentId[null]

  // onsubmitHandler
  function addComment(text) {
    if (Boolean(text)) {
      try {
        dispatch(AddComment({ id: post._id, text })).unwrap();
      } catch (error) {
        console.error("failed to save the comment", error);
      }
    }
  }
  return (
    <Card>
      <PostHead post={post} userId={userId} />
      <p className="post-text">{post.text.substring(0, 20)}</p>
      {post?.image && <img src={post.image} className="post-image" alt="..." />}
      <hr />
      <div className="x-row" style={{ padding: "10px" }}>
        <div onClick={() => dispatch(likePost(post._id))}>
          <Likes userId={userId} LIKES={LIKES} />
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
        {userId === post.owner._id && (
          <div>
            <CustomButton
              Icon={BsTrash}
              onClick={() => {
                dispatch(
                  openModal({
                    name: "DeleteConfirm",
                    childrenProps: { id: post._id },
                  })
                );
              }}
            >
              &nbsp;Delete
            </CustomButton>
          </div>
        )}
      </div>
      {commentOpen && (
        <section>
          <CommentForm submitLabel="write" onSubmit={addComment}  />
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
