import styles from "./Footer.module.css";
import { categorys as importedCategorys } from "../utils/categorys";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const Footer = () => {
  const location = useLocation();

  const categorys = useMemo(() => {
    let subArrays = [];

    for (let i = 0; i < importedCategorys.length; i += 3) {
      subArrays.push(importedCategorys.slice(i, i + 3));
    }

    return subArrays;
  }, []);

  return (
    <>
      {location.pathname !== "/register" && (
        <div className={styles.container_footer}>
          <div>
            <h1>Portal de Notícias</h1>
            <div className={styles.footer_team_credits}>
              <div style={{ display: "flex" }}>
                <span>Construção do Front-end:</span>
                <p>Engels Antero</p>
              </div>

              <div style={{ display: "flex" }}>
                <span>Construção do Back-end:</span>
                <div>
                  <p>Kauã Ferreira Marques</p>
                  <p>João Vitor Lima Santos</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>Categorias</h3>
            <div style={{ display: "flex" }}>
              {categorys.map((subarray, index) => (
                <div key={index} style={{ marginRight: "20px" }}>
                  {subarray.map((itemSubarray, indexSubarray) => (
                    <p key={indexSubarray}>{itemSubarray}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
