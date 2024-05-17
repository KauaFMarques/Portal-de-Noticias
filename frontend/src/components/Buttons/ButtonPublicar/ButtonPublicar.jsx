import styles from "./ButtonPublicar.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const ButtonPublicar = (props) => {
  return (
    <button
      {...props}
      className={`${styles.button_publicar} ${props.className}`}
    >
      <Icon
        height={22}
        icon="hugeicons:quill-write-01"
        style={{ color: "#fff" }}
      />
      <span>Publicar</span>
    </button>
  );
};

export default ButtonPublicar;
