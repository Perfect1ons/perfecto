import styles from "./style.module.css";
import cn from "clsx";
interface ButtonProps {
  background: "blue" | "yellow" | "white";
  children: React.ReactNode;
  click?: () => void;
  size?: "xs" | "lg" | "wide";
}

const Button = ({ background, children, click, size }: ButtonProps) => {
  return (
    <button
      onClick={click}
      className={cn(
        styles.btn,
        background && styles[background],
        size && styles[size]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
