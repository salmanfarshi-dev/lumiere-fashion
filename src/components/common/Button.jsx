import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}) => {
  const baseStyle =
    "inline-flex items-center justify-center px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300";

  const variants = {
    primary:
      "bg-[#171717] text-white hover:bg-[#C8A98B] hover:text-[#171717]",

    secondary:
      "border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white",

    light:
      "bg-white text-[#171717] hover:bg-[#C8A98B]",
  };

  const styles = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

export default Button;