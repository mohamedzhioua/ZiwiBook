import "./CustomButton.css";

const CustomButton = ({ type, className, value, disabled, onClick }) => {
  return (
    <div class="d-grid gap-5 mb-2">
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        {value}
      </button>
    </div>
  );
};

export default CustomButton;
