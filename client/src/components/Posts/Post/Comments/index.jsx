import Comment from "./Comment";
import Styles from "./comment.module.css";

const Comments = ({ rootComments }) => {
   
  return rootComments?.map((rootComment) => (
        <React.Fragment className={Styles.comments} key={rootComment._id}>
          <Comment comment={rootComment} />
        </React.Fragment>
      ))
    }
    
  

export default Comments;
