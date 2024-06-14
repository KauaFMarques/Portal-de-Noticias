import { categorysLabelValue } from "../../utils/categorys";
import styles from "./ConteudoNoticia.module.css";

const ConteudoNoticia = ({ noticia }) => {
  return (
    <div className={styles.conteudo_noticia}>
      <h1>{noticia.titulo}</h1>
      <h3>{noticia.subtitulo}</h3>
      <div style={{ marginTop: "20px" }}>
        <span style={{ color: "#3E57FF" }}>
          {
            categorysLabelValue.find((item) => item.id === noticia.category_id)
              .label
          }{" "}
        </span>
        - {"Nome do Autor"}
      </div>
      <p>{noticia.noticia}</p>
    </div>
  );
};

export default ConteudoNoticia;
