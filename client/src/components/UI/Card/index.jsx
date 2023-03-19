import styles from "./Card.module.css";

function Card({ className, innerRef, children }) {
  return (
    <div ref={innerRef} className={`${styles.card_container} ${className}`}>
      {children}
    </div>
  );
}

export default Card;
