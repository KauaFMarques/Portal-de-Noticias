import styles from "./Navbar.module.css";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import NavbarLateral from "./NavbarLateral";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [menuLateralAberto, setMenuLateralAberto] = useState(false);
  const [subMenuUserAberto, setSubMenuUserAberto] = useState(false);
  const divSubMenu = useRef(null);
  const iconUserProfileNavRef = useRef(null);

  useEffect(() => {
    console.log("teste");
    const handleClickForaDoSubMenu = (event) => {
      if (
        divSubMenu.current &&
        iconUserProfileNavRef.current &&
        !divSubMenu.current.contains(event.target) &&
        !iconUserProfileNavRef.current.contains(event.target)
      ) {
        setSubMenuUserAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickForaDoSubMenu);

    return () =>
      document.removeEventListener("mousedown", handleClickForaDoSubMenu);
  }, []);

  return (
    <>
      {location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register_site" && (
          <>
            <NavbarLateral
              menuLateralAberto={menuLateralAberto}
              setMenuLateralAberto={setMenuLateralAberto}
            />
            <div className={styles.header_user}>
              <div className={styles.header_user_links}>
                <Link>Sobre</Link>
                <Link>Contatos</Link>
                <Link>Colunistas</Link>
              </div>
              {user && user.username && (
                <div className={styles.user_nav}>
                  <div className={styles.user_nav_hello}>
                    <p>
                      Olá, <span>{user.username}</span>
                    </p>
                    <Icon
                      icon="ei:user"
                      ref={iconUserProfileNavRef}
                      height={60}
                      style={{ color: "#d0d0d0", cursor: "pointer" }}
                      onClick={() => setSubMenuUserAberto((prev) => !prev)}
                    />
                    {subMenuUserAberto && (
                      <div ref={divSubMenu} className={styles.user_submenu}>
                        {user.user_type === 2 && (
                          <Link to={"/publicar-noticia"}>
                            <Icon
                              height={20}
                              icon="bxs:pencil"
                              style={{ color: "#000" }}
                            />
                            <p>Publicar Notícia</p>
                          </Link>
                        )}
                        <Link>
                          <Icon
                            icon="subway:mark-2"
                            height={20}
                            style={{ color: "#000" }}
                          />
                          <p>Notícias Salvas</p>
                        </Link>
                        <Link>
                          <Icon
                            icon="icon-park-solid:like"
                            height={20}
                            style={{ color: "#000" }}
                          />
                          <p>Notícias Curtidas</p>
                        </Link>
                        {user.user_type === 2 && (
                          <Link to={"/noticias-publicadas"}>
                            <Icon
                              icon="material-symbols:news"
                              height={20}
                              style={{ color: "#000" }}
                            />
                            <p>Notícias Publicadas</p>
                          </Link>
                        )}

                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            setUser(null);
                          }}
                        >
                          <Icon
                            icon="material-symbols:logout"
                            height={22}
                            style={{ color: "#000" }}
                          />
                          <p>Log Out</p>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(!user || typeof user !== "object") && (
                <div className={styles.nav_links}>
                  <Link to={"/login"}>Logar</Link>
                  <Link to={"/register"} className="link_button">
                    <Button
                      style={{ marginLeft: "10px" }}
                      msg={"Cadastre-se"}
                    />
                  </Link>
                </div>
              )}
            </div>
            <div className={styles.navbar_fixed_div}>
              <div className={styles.navbar}>
                <Link to={"/"}>
                  <h1>Portal de Notícias</h1>
                </Link>
                <div className={styles.search_div}>
                  <Icon
                    icon="mi:search"
                    style={{ color: "#707c89" }}
                    width={21}
                  />
                  <input type="text" className={styles.input_search} />
                </div>
                <div
                  className={styles.menu_hamburguer}
                  onClick={() => setMenuLateralAberto(true)}
                >
                  <Icon
                    width={40}
                    icon="ic:round-menu"
                    style={{ color: "#cacaca" }}
                  />
                </div>

                {/* <button onClick={() => console.log(user)}>click</button> */}
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
