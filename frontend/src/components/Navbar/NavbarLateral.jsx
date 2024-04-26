import styles from "./NavbarLateral.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { categorys } from "../../utils/categorys";

const NavbarLateral = ({ setMenuLateralAberto, menuLateralAberto }) => {
  return (
    <div
      className={styles.container_nav_lateral}
      style={menuLateralAberto ? null : { marginLeft: "-1000px" }}
    >
      <div className={styles.header_nav_lateral}>
        <Link to={"/login"} style={{ marginBottom: "10px" }}>
          Fazer Login
        </Link>
        <Link to={"/register"}>Cadastre-se</Link>
      </div>
      <div className={styles.nav_lateral_categorias}>
        <h3>Categorias</h3>
        <ul>
          {categorys.map((category, index) => (
            <li key={index}>
              <Link to="/">{category}</Link>
            </li>
          ))}
        </ul>
      </div>
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
