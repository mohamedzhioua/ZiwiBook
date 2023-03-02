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
import IconStyle from "../../../styles/icons.module.css";
import reactionStyle from "./Likes/react.module.css";
import PostStyle from "./post.module.css";

import { BsTrash } from "react-icons/bs";
import {
  selectAllComments,
  useAddNewCommentMutation,
} from "../../../app/features/comment/commentSlice";

const Post = ({ postId, user }) => {
  const [likePost] = useLikePostMutation();
  const [addNewComment] = useAddNewCommentMutation();

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
      await addNewComment({ id, text }).unwrap();
    }
  }
  return (
    <Card>
      <div className={PostStyle.post}>
        <PostHead post={post} userId={user?._id} />
        <p className={PostStyle.post_text}>{post?.text.substring(0, 20)}</p>
        {post?.image && (
          <img src={post?.image} className={PostStyle.post_image} alt="..." />
        )}
        <div className={PostStyle.footer}>
          <div className={PostStyle.reaction_infos}>
            <div className={PostStyle.reaction_infos_left}>
              <Likes userId={user?._id} LIKES={LIKES} />
            </div>
            <div
              className={PostStyle.reaction_infos_right}
              onClick={() => setCommentOpen(!commentOpen)}
            >
              <span>
                {comments.length === 0
                  ? "comment"
                  : `${comments.length} ${
                      comments.length > 1 ? "comments" : "comment"
                    }`}
              </span>
            </div>
          </div>
          <div className={PostStyle.reaction}>
            <div
              className={`${reactionStyle.reaction} hover1`}
              onClick={() => likePost(post?._id)}
            >
              <i className={IconStyle.like_icon} />
              <span className={reactionStyle.react_span}>Like</span>
            </div>
            <div
              className={`${reactionStyle.reaction} hover1`}
              onClick={() => setCommentOpen(true)}
            >
              <i className={IconStyle.comment_icon} />
              <span className={reactionStyle.react_span}>comment</span>
            </div>

            {canDelete && (
              <div
                className={`${reactionStyle.reaction} hover1`}
                onClick={() => {
                  dispatch(
                    openModal({
                      name: "DeleteConfirm",
                      childrenProps: { id: post?._id },
                    })
                  );
                }}
              >
                <i className={IconStyle.trash_icon} />

                <span className={reactionStyle.react_span}>Delete</span>
              </div>
            )}
          </div>
        </div>
        {commentOpen && (
          <section>
            <CommentForm
              submitLabel="write"
              onSubmit={addComment}
              placholdertxt={`write a Comment ....`}
            />
            {rootComments != null && rootComments.length > 0 && (
              <div className={PostStyle.comments_section}>
                <Comments rootComments={rootComments} />
              </div>
            )}
          </section>
        )}
      </div>
    </Card>
  );
};

export default Post;
