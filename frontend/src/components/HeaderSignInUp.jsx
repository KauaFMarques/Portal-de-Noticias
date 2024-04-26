import { Link } from "react-router-dom";
import styles from "./HeaderSignInUp.module.css";

const HeaderSignInUp = ({ type }) => {
  return (
    <div className={styles.header_signup}>
      <Link to={"/"}>
        <h1>Portal de Notícias</h1>
      </Link>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <span>
            {type === "SignUp" && "Já tem uma conta?"}
            {type === "SignIn" && "Ainda não tem uma conta?"}
          </span>
          {type === "SignUp" && (
            <Link to={"/login"}>
              <button>
                <p>Log In</p>
              </button>
            </Link>
          )}
          {type === "SignIn" && (
            <Link to={"/register"}>
              <button>
                <p>Cadastre-se</p>
              </button>
            </Link>
          )}
        </div>

        {type === "SignUp" && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ color: "#55534f" }}>
              É propriétario de um site de notícias?{" "}
              <Link className={styles.link_join_us} to={"/register_site"}>
                junte-se a nós
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSignInUp;
