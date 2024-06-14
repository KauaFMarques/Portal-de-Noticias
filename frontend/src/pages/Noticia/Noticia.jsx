import { useCallback, useEffect, useState } from "react";
import { axiosLocalApi } from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import ConteudoNoticia from "../../components/ConteudoNoticia/ConteudoNoticia";

const Noticia = () => {
  const { id: idParams } = useParams();
  const [noticia, setNoticia] = useState({});

  const fetchNoticia = useCallback(() => {
    console.log("teste");
    axiosLocalApi.get("/noticias-todos-sites").then((resp) => {
      const data = resp.data;
      const noticiaEncontrada = data.find(
        (noticia) => noticia.id === parseInt(idParams)
      );
      if (noticiaEncontrada) {
        setNoticia(noticiaEncontrada);
      }
    });
  }, [idParams]);

  useEffect(() => {
    fetchNoticia();
  }, [fetchNoticia]);

  if (Object.keys(noticia).length === 0) {
    return <div>...</div>;
  }

  return (
    <div className="container_geral">
      <div className="flex_row">
        <div className="col-12">
          <div className="div_img_noticia" style={{ height: "500px" }}>
            <img src={noticia.foto} alt="" />
          </div>
        </div>
        <div className="col-12" style={{ marginTop: "10px" }}>
          <ConteudoNoticia noticia={noticia} />
        </div>
      </div>
    </div>
  );
};

export default Noticia;
