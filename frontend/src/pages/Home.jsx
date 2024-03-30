import { useMemo, useState } from "react";
import styles from "./Home.module.css";
import InfosCardNoticia from "../components/InfosCardNoticia";

const Home = () => {
  const [imageSrc] = useState(undefined);
  const categorys = useMemo(() => {
    return [
      "Arte",
      "Negócios",
      "Saúde",
      "Politica",
      "Ciência",
      "Esportes",
      "Tecnologia",
      "Mundo",
    ];
  }, []);
  const titleLoremImpsum = useMemo(() => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis feugiat nisl, sit amet venenatis ipsum. Pellentesque metus velit,";
  }, []);
  const noticeResume = useMemo(() => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis feugiat nisl, sit amet venenatis ipsum. Pellentesque metus velit, venenatis quis odio at, pretium viverra leo. Duis quis tincidunt nunc, sed convallis elit. Quisque sagittis mattis nibh, sit amet maximus enim tempor a. Vestibulum varius lacus ipsum, in commodo enim volutpat eget. Morbi elementum et turpis volutpat varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed elementum sed tortor vel luctus. Proin ornare erat sit amet interdum luctus. Aliquam leo tortor, ornare at neque ut, fermentum scelerisque libero. Aenean in sem elementum, finibus ante nec, facilisis felis. Nunc molestie lorem quam, id ornare arcu efficitur in. Cras congue urna semper mi ultrices rutrum. Cras varius diam quis lacus auctor, nec euismod nibh egestas. Nullam nibh erat, lobortis id metus in, placerat blandit orci. Maecenas sed varius dui, vel imperdiet augue.";
  }, []);

  return (
    <div className={styles.home_container}>
      <div className="flex_row">
        <div
          style={{
            flex: "2",
            maxWidth: "677px",
          }}
        >
          {imageSrc ? (
            <img src={imageSrc} />
          ) : (
            <div style={{ height: "450px", marginBottom: "23px" }}>
              <div className="sem_imagem"></div>
            </div>
          )}
          <InfosCardNoticia
            title={titleLoremImpsum}
            category={"Mundo"}
            resume={noticeResume}
          />
        </div>
        <div style={{ flex: "1", paddingLeft: "47px" }}>
          {categorys.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className={styles.noticias_laterais}
              style={index === 0 ? { borderTop: "1px solid #d3cac5" } : null}
            >
              <InfosCardNoticia title={titleLoremImpsum} category={item} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                {imageSrc ? (
                  <img src={imageSrc} />
                ) : (
                  <div
                    style={{
                      height: "85px",
                      width: "120px",
                    }}
                  >
                    <div
                      className="sem_imagem"
                      style={{ alignSelf: "center" }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
