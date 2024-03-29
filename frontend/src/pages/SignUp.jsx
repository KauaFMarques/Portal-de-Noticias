import Button from "../components/Button";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Requisicao de cadastro");
  };

  return (
    <>
      <div className={styles.header_signup}>
        <h1>Portal de Notícias</h1>
        <div>
          <span>Já tem uma conta?</span>
          <button onClick={() => console.log("teste")}>Log In</button>
        </div>
      </div>
      <div className={styles.form_div}>
        <form className={styles.form_styled} onSubmit={handleSubmit}>
          <label>
            <p>Nome de Usuário:</p>
            <input type="text" />
          </label>
          <label>
            <p>E-mail:</p>
            <input type="text" />
          </label>
          <label>
            <p>Tipo de Usuário:</p>
            <select>
              <option value="leitor">Leitor</option>
              <option value="jornalista">Jornalista</option>
            </select>
          </label>
          <label>
            <p>Senha:</p>
            <input type="password" />
          </label>
          <label>
            <p>Confirmar Senha:</p>
            <input type="password" />
          </label>
          <Button
            msg={"Cadastrar"}
            style={{ width: "80%", marginTop: "15px" }}
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;
