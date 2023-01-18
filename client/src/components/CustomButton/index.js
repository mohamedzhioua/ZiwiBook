import "./index.css";

const CustomButton = ({ type, className, value, disabled, onClick, Icon , children }) => {
  return !Icon ? (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  ) : (
    <button type="button" className="icon icon-btn"  onClick={onClick}>
      <span>
        <Icon/>
      </span>
      {children}
    </button>
  );
};

export default CustomButton;
