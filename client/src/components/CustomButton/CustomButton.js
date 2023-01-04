import "./CustomButton.css";

const CustomButton = ({ type, className, value ,disabled }) => {
  return (
    <div class="d-grid gap-5 mb-2">
      <button type={type} className={className}  disabled={disabled} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        {value}
      </button>
    </div>
  );
};

export default CustomButton;
