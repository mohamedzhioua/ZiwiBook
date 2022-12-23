import "./CustomButton.css";

const CustomButton = ({ type, className, value }) => {
  return (
    <div class="d-grid gap-5">
      <button type={type} className={className}>
        {value}
      </button>
    </div>
  );
};

export default CustomButton;
