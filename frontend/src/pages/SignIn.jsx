import { useContext, useState } from "react";
import HeaderSignInUp from "../components/HeaderSignInUp";
import styles from "./SignIn.module.css";
import Button from "../components/Button";
import { axiosLocalApi } from "../utils/axiosInstance";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [signInValues, setSignInValues] = useState({
    username: "",
    password: "",
  });
  const [requisicaoEmProgresso, setRequisicaoEmProgresso] = useState(false);
  const [messageConfig, setMessageConfig] = useState({
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setRequisicaoEmProgresso(true);
    axiosLocalApi
      .post("/login", signInValues)
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("token", resp.data.user.token);
        setRequisicaoEmProgresso(false);
        setMessageConfig((prev) => ({
          ...prev,
          msg: resp.data.message,
          type: "success",
        }));
        setUser(resp.data.user);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setRequisicaoEmProgresso(false);
        setMessageConfig((prev) => ({
          ...prev,
          msg: error.response.data.error,
          type: "error",
        }));
      });
  };

  return (
    <>
      <HeaderSignInUp type={"SignIn"} />
      <div className={styles.form_div}>
        <form className={styles.form_styled} onSubmit={handleSubmit}>
          <label>
            <p>Nome de Usuário:</p>
            <input
              type="text"
              onChange={(e) =>
                setSignInValues((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </label>

          <label>
            <p>Senha:</p>
            <input
              type="password"
              onChange={(e) =>
                setSignInValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </label>

          <Button
            requisicaoEmProgresso={requisicaoEmProgresso}
            msg={"Logar"}
            style={{
              width: "80%",
              marginTop: "15px",
              height: "37px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </form>
      </div>
      <Message msg={messageConfig.msg} type={messageConfig.type} />
    </>
  );
};

export default SignIn;
