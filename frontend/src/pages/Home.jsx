import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import InfosCardNoticia from "../components/InfosCardNoticia";
import { Link } from "react-router-dom";
import { categorysLabelValue } from "../utils/categorys";
import { axiosLocalApi } from "../utils/axiosInstance";

const Home = () => {
  const [noticias, setNoticias] = useState([]);

  const fetchNoticias = () => {
    axiosLocalApi.get("/noticias-todos-sites").then((resp) => {
      const data = resp.data;
      console.log(data);
      setNoticias(data.reverse());
    });
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  if (noticias.length === 0) {
    return <div>...</div>;
  }

  return (
    <div className={styles.home_container}>
      <div className="flex_row">
        <div className="col-7 hover_div">
          <Link to={`/noticia/${noticias[0].id}`}>
            <div className={"div_img_noticia"} style={{ height: "500px" }}>
              <img src={noticias[0].foto} />
            </div>

            <InfosCardNoticia
              title={noticias[0].titulo}
              category={
                categorysLabelValue.find(
                  (item) => item.value === noticias[0].categoria_id
                )?.label
              }
              resume={
                noticias[0].noticia.length > 325
                  ? noticias[0].noticia.substring(0, 325) + "..."
                  : noticias[0].noticia
              }
            />
          </Link>
        </div>
        <div className={`col-5 ${styles.div_noticias_laterais}`}>
          {noticias.slice(1, 5).map((item, index) => (
            <Link key={index} to={`/noticia/${item.id}`}>
              <div
                key={index}
                className={`${styles.noticias_laterais} hover_div`}
                style={index === 0 ? { borderTop: "1px solid #d3cac5" } : null}
              >
                <InfosCardNoticia
                  title={item.titulo}
                  category={
                    categorysLabelValue.find(
                      (caregory) => caregory.value === item.categoria_id
                    )?.label
                  }
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <div
                    className={"div_img_noticia"}
                    style={{
                      width: "200px",
                      height: "100px",
                    }}
                  >
                    <img src={item.foto} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <h1 className={styles.h1_ultimas_noticias}>Ultimas notícias</h1>

      {noticias.slice(0, 3).map((item, index) => (
        <Link key={index} to={`/noticia/${item.id}`}>
          <div
            className={`${styles.div_ultimas_noticias} flex_row hover_div`}
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
      ))}
    </div>
  );
};

export default Home;
