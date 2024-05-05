import { Link } from "react-router-dom";
import styles from "./SiteSignUp.module.css";
import Button from "../components/Button";

const SiteSignUp = () => {
  return (
    <>
      <div className="flex_row" style={{ minHeight: "100vh" }}>
        <div className={`col-6 ${styles.div_esquerda}`}>
          <Link to={"/"}>
            <h1 style={{ textAlign: "start" }}>Portal de Notícias</h1>
          </Link>

          <div className={styles.form_container}>
            <h2>Cadastre seu site na nossa plataforma.</h2>
            <h4 style={{ marginBottom: "40px" }}>
              Garanta mais alcance para as suas notícias.
            </h4>

            <div className={styles.form_register}>
              <label>
                <h4>Link do Site:</h4>
                <input placeholder="Digite o link do seu site" type="text" />
              </label>
              <Button
                msg={"Cadastrar"}
                style={{ marginTop: "14px", width: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className={`col-6 ${styles.div_direita}`}>
          <div className={styles.infos_box}>
            <h2>Amplie o Alcance de seu Site de Notícias</h2>
            <p>
              Nosso serviço oferece uma solução prática e eficaz para sites de
              notícias que desejam ampliar seu alcance e visibilidade. Ao
              cadastrar seu site em nosso serviço, você terá a oportunidade de
              alcançar um público ainda maior, garantindo que suas notícias
              sejam encontradas e acessadas por mais pessoas.
            </p>
            <p>
              Além disso, nosso serviço oferece uma série de benefícios para os
              sites cadastrados, incluindo:
            </p>
            <p>
              <span>Visibilidade Ampliada:</span> Ao integrar seu site ao nosso
              serviço, suas notícias serão indexadas e disponibilizadas para um
              público mais amplo, aumentando sua visibilidade online.
            </p>
            <p>
              <span>Facilidade de Acesso:</span> Nossa plataforma oferece uma
              interface fácil de usar, tornando simples para os usuários
              encontrar e acessar as notícias de seu site.
            </p>
            <p>
              <span>Mais Tráfego:</span> Com um alcance ampliado, seu site
              receberá mais tráfego e, consequentemente, mais oportunidades de
              engajamento e monetização.
            </p>
            <p>
              Não perca a oportunidade de ampliar o alcance de seu site de
              notícias. Cadastre-se em nosso serviço de acervo e leve suas
              notícias a um público ainda maior!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteSignUp;
