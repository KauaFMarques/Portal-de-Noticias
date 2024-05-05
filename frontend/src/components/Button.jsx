import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./Button.module.css";

const Button = ({ msg, style, onClick, requisicaoEmProgresso }) => {
  const handleClickButton = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClickButton} className={styles.button} style={style}>
      {requisicaoEmProgresso ? (
        <Icon
          icon="line-md:loading-loop"
          style={{ color: "#fff" }}
          width={27}
        />
      ) : (
        msg
      )}
    </button>
  );
};

export default Button;
