import styles from "./PublicarNoticia.module.css";
import { categorys } from "../../utils/categorys";
import ButtonPublicar from "../../components/Buttons/ButtonPublicar/ButtonPublicar";

const PublicarNoticia = () => {
  const handleCadastrarNoticia = () => {
    console.log(".");
  };

  return (
    <div className="container_geral">
      <div className={`${styles.form_cadastro_noticia} flex_row`}>
        <div className="col-7">
          <label>
            <h4>Título da Notícia</h4>
            <input type="text" />
          </label>
        </div>
        <div className="col-5" style={{ paddingLeft: "10px" }}>
          <label>
            <h4>Subtitulo da Notícia</h4>
            <input type="text" />
          </label>
        </div>
      </div>

      <div
        className={`${styles.form_cadastro_noticia} flex_row`}
        style={{ marginTop: "10px" }}
      >
        <div className="col-5">
          <label>
            <h4>Categoria da Notícia</h4>
            <select className={styles.select_category}>
              {categorys.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-7" style={{ paddingLeft: "10px" }}>
          <label>
            <h4>Link da Foto de Capa</h4>
            <input type="text" />
          </label>
        </div>
      </div>

      <div
        className={`${styles.form_cadastro_noticia} flex_row`}
        style={{ marginTop: "10px" }}
      >
        <div className="col-12">
          <label>
            <h4>Conteúdo da Notícia</h4>
            <textarea type="text" />
          </label>
        </div>
      </div>

      <div
        className={`${styles.form_cadastro_noticia} flex_row`}
        style={{ marginTop: "10px", justifyContent: "end" }}
      >
        <ButtonPublicar
          onClick={handleCadastrarNoticia}
          style={{ marginRight: "0px", marginTop: "10px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default PublicarNoticia;
