import React, { useState } from "react";
import { useDispatch } from "react-redux";

// features
import { openModal } from "../../app/features/modal/modalSlice";
import { likePost } from "../../app/features/post/postSlice";

// Components
import { Comments, CustomButton, CustomLikes, PostHead } from "../index";
import Card from "../Card";

// Styles
import { GoComment } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import "./index.css";

const Post = ({ post, userId }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const dispatch = useDispatch();
  const LIKES = post?.likes;

  return (
    <Card>
      <PostHead post={post} userId={userId} />
      <p className="post-text">{post.text.substring(0, 20)}</p>
      {post?.image && <img src={post.image} className="post-image" alt="..." />}
      <hr />
      <div className="post-row" style={{ padding: "10px" }}>
        <div onClick={() => dispatch(likePost(post._id))}>
          <CustomLikes userId={userId} LIKES={LIKES} />
        </div>
        <div>
          <CustomButton
            Icon={GoComment}
            onClick={() => setCommentOpen(!commentOpen)}
          >
            &nbsp;Comment
          </CustomButton>
        </div>
        {userId === post.owner._id && (
          <>
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
          </>
        )}
      </div>

      <section>{commentOpen && <Comments postId={post._id} />}</section>
    </Card>
  );
};

export default Post;
