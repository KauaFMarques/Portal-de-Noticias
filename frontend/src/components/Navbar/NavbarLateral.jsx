import styles from "./NavbarLateral.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { categorys } from "../../utils/categorys";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ButtonPublicar from "../Buttons/ButtonPublicar/ButtonPublicar";

const NavbarLateral = ({ setMenuLateralAberto, menuLateralAberto }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div
      className={styles.container_nav_lateral}
      style={menuLateralAberto ? null : { marginLeft: "-1000px" }}
    >
      <div className={styles.header_nav_lateral}>
        {user && user.username && (
          <>
            <div className={styles.nav_top_user_authenticated}>
              <div>
                <Icon
                  icon="ei:user"
                  height={60}
                  style={{ color: "#000", marginLeft: "-7px" }}
                />
                <p>
                  Olá <span>{user.username}</span>
                </p>
                {user.user_type === 2 && (
                  <Link to={"/publicar-noticia"}>
                    <ButtonPublicar />
                  </Link>
                )}
              </div>

              <div>
                <button>
                  <Link>
                    <Icon
                      icon="subway:mark-2"
                      height={22}
                      style={{ color: "#919191" }}
                    />
                    <p>Notícias Salvas</p>
                  </Link>
                </button>

                <button>
                  <Link>
                    <Icon
                      icon="icon-park-solid:like"
                      height={22}
                      style={{ color: "#919191" }}
                    />
                    <p>Notícias Curtidas</p>
                  </Link>
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                  }}
                >
                  <Icon
                    icon="material-symbols:logout"
                    height={22}
                    style={{ color: "#919191" }}
                  />
                  <p>Log Out</p>
                </button>
              </div>
            </div>
          </>
        )}
        {(!user || typeof user !== "object") && (
          <>
            <Link to={"/login"} style={{ marginBottom: "10px" }}>
              Fazer Login
            </Link>
            <Link to={"/register"}>Cadastre-se</Link>
          </>
        )}
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
