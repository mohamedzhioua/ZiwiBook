import Skeleton from "react-loading-skeleton";
import styles from "./skeleton.module.css"

function NotificationSkeleton() {
    return (
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
                    width={250}
                    height={30}
                    style={{
                        transform: "translateY(4px)",
                    }}

                />
            </div>
        </div>
    )
}

export default NotificationSkeleton