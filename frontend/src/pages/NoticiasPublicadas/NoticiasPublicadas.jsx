import { useState, useEffect, useContext, useCallback } from "react";
import { axiosLocalApi } from "../../utils/axiosInstance";
import { UserContext } from "../../contexts/UserContext";
import InfosCardNoticia from "../../components/InfosCardNoticia";
import { categorysLabelValue } from "../../utils/categorys";
import { Link } from "react-router-dom";
import styles from "../Home.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const NoticiasPublicadas = () => {
  const [noticiasPublicadas, setNoticiasPublicadas] = useState([]);
  const { user } = useContext(UserContext);

  const fetchNoticias = useCallback(() => {
    axiosLocalApi.get("/noticias-todos-sites").then((resp) => {
      const data = resp.data;
      console.log(data);
      setNoticiasPublicadas(
        data.filter((item) => item.jornalista_id === user.id).reverse()
      );
    });
  }, [user]);

  const deletarNoticia = (idNoticia) => {
    console.log(idNoticia);

    axiosLocalApi
      .delete(`/excluirnoticia/${idNoticia}`)
      .then((resp) => {
        setNoticiasPublicadas((prev) =>
          [...prev].filter((item) => item.id !== idNoticia)
        );
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  return (
    <div className="container_geral">
      {noticiasPublicadas.map((item, index) => (
        <div className="hover_div" key={index} style={{ position: "relative" }}>
          <Link to={`/noticia/${item.id}`}>
            <div
              className={`${styles.div_ultimas_noticias} flex_row `}
              style={index === 0 ? { border: "none" } : null}
            >
              <div className="col-4">
                <div className={"div_img_noticia"} style={{ height: "300px" }}>
                  <img src={item.foto} />
                </div>
              </div>
              <div className="col-8" style={{ paddingLeft: "46px" }}>
                <InfosCardNoticia
                  title={item.titulo}
                  category={
                    categorysLabelValue.find(
                      (caregory) => caregory.value === item.categoria_id
                    )?.label
                  }
                  resume={item.subtitulo}
                />
              </div>
            </div>
          </Link>
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              right: "10px",
            }}
          >
            <Icon
              icon="material-symbols:delete"
              className="hover_div_2"
              height={25}
              onClick={() => deletarNoticia(item.id)}
              style={{ color: "red", cursor: "pointer", padding: "10px" }}
            />
            <Link to={`/editar-noticia/${item.id}`}>
              <Icon
                icon="material-symbols:edit"
                className="hover_div_2"
                height={25}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  marginLeft: "10px",
                  padding: "10px",
                }}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiasPublicadas;
