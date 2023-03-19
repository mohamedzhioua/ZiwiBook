import style from "./loading.module.css"
export const Loading = () => {
  return (
<div className={style.loadingSpinnerContainer}>
      <div className={style.loadingSpinner}></div>
    </div>
  );
};
export default Loading
