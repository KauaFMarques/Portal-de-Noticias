import { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.css";
import InfosCardNoticia from "../components/InfosCardNoticia";
import { categorys, categorysLabelValue } from "../utils/categorys";
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

  const titleLoremImpsum = useMemo(() => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis feugiat nisl, sit amet venenatis ipsum. Pellentesque metus velit,";
  }, []);
  const noticeResume = useMemo(() => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis feugiat nisl, sit amet venenatis ipsum. Pellentesque metus velit, venenatis quis odio at, pretium viverra leo. Duis quis tincidunt nunc, sed convallis elit. Quisque sagittis mattis nibh, sit amet maximus enim tempor a. Vestibulum varius lacus ipsum, in commodo enim volutpat eget. Morbi elementum et turpis volutpat varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed elementum sed tortor vel luctus. Proin ornare erat sit amet interdum luctus. Aliquam leo tortor, ornare at neque ut, fermentum scelerisque libero. Aenean in sem elementum, finibus ante nec, facilisis felis. Nunc molestie lorem quam, id ornare arcu efficitur in. Cras congue urna semper mi ultrices rutrum. Cras varius diam quis lacus auctor, nec euismod nibh egestas. Nullam nibh erat, lobortis id metus in, placerat blandit orci. Maecenas sed varius dui, vel imperdiet augue.";
  }, []);

  if (noticias.length === 0) {
    return <div>...</div>;
  }

  return (
    <div className={styles.home_container}>
      <div className="flex_row">
        <div className="col-7">
          <div className={styles.div_img_noticia} style={{ height: "500px" }}>
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
        </div>
        <div className={`col-5 ${styles.div_noticias_laterais}`}>
          {noticias.slice(1, 5).map((item, index) => (
            <div
              key={index}
              className={styles.noticias_laterais}
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
                  className={styles.div_img_noticia}
                  style={{
                    width: "200px",
                    height: "100px",
                  }}
                >
                  <img src={item.foto} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className={styles.h1_ultimas_noticias}>Ultimas notícias</h1>

      {categorys
        .reverse()
        .slice(0, 3)
        .map((item, index) => (
          <div
            key={index}
            className={`${styles.div_ultimas_noticias} flex_row`}
            style={index === 0 ? { border: "none" } : null}
          >
            <div
              className="col-4"
              style={{
                height: "230px",
              }}
            >
              <div className="sem_imagem"></div>
            </div>
            <div className="col-8" style={{ paddingLeft: "46px" }}>
              <InfosCardNoticia
                title={titleLoremImpsum}
                category={item}
                resume={noticeResume}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
