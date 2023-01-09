import "./CustomButton.css";

const CustomButton = ({ type, className, value, disabled, onClick ,dispatch}) => {
  return (
    <div class="d-grid gap-5 mb-2">
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
       >
        {value}
      </button>
    </div>
  );
};

export default CustomButton;
