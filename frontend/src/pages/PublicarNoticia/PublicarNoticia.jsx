import styles from "./PublicarNoticia.module.css";
import { categorysLabelValue } from "../../utils/categorys";
import ButtonPublicar from "../../components/Buttons/ButtonPublicar/ButtonPublicar";
import { axiosLocalApi } from "../../utils/axiosInstance";
import { useContext, useEffect, useState } from "react";
import Message from "../../components/Message";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";

const PublicarNoticia = () => {
  const { id: idParams } = useParams();
  const { user } = useContext(UserContext);
  const [valuesNoticia, setValuesNoticia] = useState({
    titulo: "",
    foto: "",
    subtitulo: "",
    noticia: "",
    categoria_id: 1,
    user_id: user.id,
  });
  const [messageConfig, setMessageConfig] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (idParams) {
      axiosLocalApi
        .get(`/noticias/${idParams}`)
        .then((resp) => {
          const data = resp.data;
          console.log(data);
          setValuesNoticia((prev) => ({
            ...prev,
            categoria_id: data.categoria_id,
            foto: data.foto,
            noticia: data.noticia,
            subtitulo: data.subtitulo,
            titulo: data.titulo,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setValuesNoticia({
        titulo: "",
        foto: "",
        subtitulo: "",
        noticia: "",
        categoria_id: 1,
        user_id: user.id,
      });
    }
  }, [idParams]);

  const handleCadastrarNoticia = () => {
    axiosLocalApi
      .post("http://localhost:5000/cadastrarnoticia", valuesNoticia)
      .then((resp) => {
        const data = resp.data;
        console.log("aoba!");
        console.log(data);
        setMessageConfig((prev) => ({
          ...prev,
          message: data.message,
          type: "success",
        }));
      })
      .catch((error) => {
        setMessageConfig((prev) => ({
          ...prev,
          message: error.response?.data?.message,
          type: "error",
        }));
        console.log(error);
      });
  };

  const handleUpdateNoticia = () => {
    axiosLocalApi
      .put(`/editarnoticia/${idParams}`, valuesNoticia)
      .then((resp) => {
        const data = resp.data;
        console.log(data);
        setMessageConfig((prev) => ({
          ...prev,
          message: data.message,
          type: "success",
        }));
      })
      .catch((error) => {
        setMessageConfig((prev) => ({
          ...prev,
          message: error.response?.data?.message,
          type: "error",
        }));
        console.log(error);
      });
  };

  return (
    <div className="container_geral">
      {/* <button onClick={() => console.log(valuesNoticia)}>console</button> */}
      <div className={`${styles.form_cadastro_noticia} flex_row`}>
        <div className="col-7">
          <label>
            <h4>Título da Notícia</h4>
            <input
              value={valuesNoticia.titulo}
              type="text"
              onChange={(e) =>
                setValuesNoticia((prev) => ({
                  ...prev,
                  titulo: e.target.value,
                }))
              }
            />
          </label>
        </div>
        <div className="col-5" style={{ paddingLeft: "10px" }}>
          <label>
            <h4>Subtitulo da Notícia</h4>
            <input
              value={valuesNoticia.subtitulo}
              type="text"
              onChange={(e) =>
                setValuesNoticia((prev) => ({
                  ...prev,
                  subtitulo: e.target.value,
                }))
              }
            />
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
            <select
              className={styles.select_category}
              value={valuesNoticia.categoria_id}
              onChange={(e) =>
                setValuesNoticia((prev) => ({
                  ...prev,
                  categoria_id: parseInt(e.target.value),
                }))
              }
            >
              {categorysLabelValue.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-7" style={{ paddingLeft: "10px" }}>
          <label>
            <h4>Link da Foto de Capa</h4>
            <input
              value={valuesNoticia.foto}
              type="text"
              onChange={(e) =>
                setValuesNoticia((prev) => ({
                  ...prev,
                  foto: e.target.value,
                }))
              }
            />
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
            <textarea
              value={valuesNoticia.noticia}
              type="text"
              onChange={(e) =>
                setValuesNoticia((prev) => ({
                  ...prev,
                  noticia: e.target.value,
                }))
              }
            />
          </label>
        </div>
      </div>

      <div
        className={`${styles.form_cadastro_noticia} flex_row`}
        style={{ marginTop: "10px", justifyContent: "end" }}
      >
        <ButtonPublicar
          onClick={idParams ? handleUpdateNoticia : handleCadastrarNoticia}
          style={{
            marginRight: "0px",
            marginTop: "10px",
            width: "100%",
            marginBottom: "10px",
          }}
        />
        <Message msg={messageConfig.message} type={messageConfig.type} />
      </div>
    </div>
  );
};

export default PublicarNoticia;
