import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../app/features/modal/modalSlice";
import { selectPostById } from "../../../app/features/post/postApi";
import { Comments, Likes, PostHead, Card } from "../../index";
import CommentForm from "./Comments/CommentForm";
import chekedlike from "../../../assets/svg/like.svg";
import IconStyle from "../../../styles/icons.module.css";
import reactionStyle from "./Likes/react.module.css";
import PostStyle from "./post.module.css";
import {
  selectAllComments,
  useAddNewCommentMutation,
  useFetchCommentsQuery,
} from "../../../app/features/comment/commentApi";
import {
  selectAllReactions,
  useLikePostMutation,
} from "../../../app/features/reaction/reactionApi";
import ImageViewer from 'react-simple-image-viewer';
import Portal from "../../../utils/Portal";

const Post = ({ postId, isVisitor }) => {
  const { user } = useSelector((state) => state.user);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [likePost] = useLikePostMutation();
  const [addNewComment] = useAddNewCommentMutation();
  const [commentOpen, setCommentOpen] = React.useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, postId));
  const images = [post?.image];

  // const { post } = useFetchPostsQuery('fetchPosts', {
  //   selectFromResult: ({ data }) => ({
  //     post: data?.entities[postId]
  //   }),
  // })
  const canDelete = Boolean(
    user?._id === post?.owner?._id || user?._id === post?.owner
  );

  //filtering reactions by post
  const Reactions = useSelector(selectAllReactions).filter(
    (react) => react?.post === post?._id
  );
  const {
    data: commentsData,
    isLoading: CommentsIsLoading,
    isFetching: CommentsIsFetching,
    isSuccess } = useFetchCommentsQuery('fetchComments');

  const comments = useSelector(selectAllComments)?.filter(
    (comment) => comment?.post === post?._id
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

  //view image handlers
  const openImageViewer = React.useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  React.useEffect(() => {
    if (isViewerOpen) {
      document.getElementById("root").style.overflow = "hidden";
    } else {
      document.getElementById("root").style.overflow = "auto";
    }
  }, [isViewerOpen]);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Card className={PostStyle.post}>
      <PostHead post={post} isVisitor={isVisitor} />
      <div className={PostStyle.post_body}>
        <p className={PostStyle.post_text}>{post?.text.substring(0, 20)}</p>
        {post?.image && (
          <div className={`${PostStyle.image_container} `}>
            <img src={post?.image} className={PostStyle.post_image} alt="..." onClick={() => openImageViewer(0)}
            />
          </div>
        )}
      </div>
      <div className={PostStyle.footer}>
        <div className={PostStyle.reaction_infos}>
          <div className={PostStyle.reaction_infos_left}>
            <Likes userId={user?._id} Reactions={Reactions} />
          </div>
          <div
            className={PostStyle.reaction_infos_right}
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <span>
              {comments?.length === 0
                ? "comment"
                : `${comments?.length} ${comments?.length > 1 ? "comments" : "comment"
                }`}
            </span>
          </div>
        </div>
        <div className={PostStyle.reaction}>
          <div
            className={`${reactionStyle.reaction} hover1`}
            onClick={() => {
              likePost(post?._id);
            }}
          >
            {Reactions?.find((reaction) => reaction.owner === user?._id) ? (
              <img src={chekedlike} alt="" style={{ width: "18px" }} />
            ) : (
              <i className={IconStyle.like_icon} />
            )}
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
              <Comments rootComments={rootComments} CommentsIsFetching={CommentsIsFetching} CommentsIsLoading={CommentsIsLoading} />
            </div>
          )}

        </section>
      )}
      {isViewerOpen && (
        <Portal>
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        </Portal>
      )}
    </Card>
  );
};

export default Post;
