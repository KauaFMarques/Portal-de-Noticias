import styles from "./Navbar.module.css";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/register" && (
        <>
          <div className={styles.navbar_fixed_div}>
            <div className={styles.navbar}>
              <div className={styles.search_div}>
                <Icon icon="mi:search" style={{ color: "#000" }} width={21} />
                <input type="text" className={styles.input_search} />
              </div>
              <Link to={"/"}>
                <h1>Portal de Notícias</h1>
              </Link>

              <div className={styles.nav_links}>
                <Link to={"/about"}>Sobre</Link>
                <Link to={"/"}>Logar</Link>
                <Link to={"/register"} className="link_button">
                  <Button style={{ marginLeft: "10px" }} msg={"Cadastre-se"} />
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.sublinks_navbar}>
            <ul>
              <li>
                <Link to={"/"}>Arte</Link>
              </li>
              <li>
                <Link to={"/"}>Negócios</Link>
              </li>
              <li>
                <Link to={"/"}>Saúde</Link>
              </li>
              <li>
                <Link to={"/"}>Política</Link>
              </li>
              <li>
                <Link to={"/"}>Ciência</Link>
              </li>
              <li>
                <Link to={"/"}>Esportes</Link>
              </li>
              <li>
                <Link to={"/"}>Tecnologia</Link>
              </li>
              <li style={{ marginRight: "0px" }}>
                <Link to={"/"}>Mundo</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
