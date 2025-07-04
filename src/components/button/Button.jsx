import "./Button.css";

function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  color = "",
  ...props
}) {
  return (
    <button
      className={`btn ${color} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
