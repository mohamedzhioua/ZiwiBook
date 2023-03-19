import Skeleton from "react-loading-skeleton";
import {Card} from "../../index";
import styles from"./skeleton.module.css"

function PostSkeleton() {
  return (
    <Card>
      <div className={styles.post}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Skeleton
            circle
            height={40}
            width={40}
           containerClassName="avatar-skeleton"           
          />
        </div>
        <div className={styles.middle}>
          <Skeleton
            width={150}
            height={15}
            style={{
              transform: "translateY(4px)",
            }}
            
          />
          <Skeleton width={80} height={8}  />
        </div>
      </div>
      <div className={styles.body} style={{ padding: "10px" }}>
        <Skeleton count={3} height={18} width="100%"  />
        <Skeleton count={2} height={10} width="100%"  />
      </div>
      </div>
    </Card>
  );
}

export default PostSkeleton;
