import styles from "./Button.module.css";

const Button = ({ msg, style }) => {
  return (
    <button className={styles.button} style={style}>
      {msg}
    </button>
  );
};

export default Button;
