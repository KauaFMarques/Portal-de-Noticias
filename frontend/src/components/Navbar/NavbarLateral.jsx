import styles from "./NavbarLateral.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const NavbarLateral = ({ setMenuLateralAberto, menuLateralAberto }) => {
  return (
    <div
      className={styles.container_nav_lateral}
      style={menuLateralAberto ? null : { marginLeft: "-1000px" }}
    >
      <div
        className={styles.arrow_back}
        onClick={() => setMenuLateralAberto(false)}
      >
        <Icon icon="ep:arrow-up" style={{ color: "#cacaca" }} rotate={135} />
      </div>
    </div>
  );
};

export default NavbarLateral;
