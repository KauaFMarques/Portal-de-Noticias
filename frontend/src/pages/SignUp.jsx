import { useState } from "react";
import Button from "../components/Button";
import styles from "./SignUp.module.css";
import { axiosLocalApi } from "../utils/axiosInstance";
import HeaderSignInUp from "../components/HeaderSignInUp";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpValues, setSignUpValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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
      .post("/register", signUpValues)
      .then((resp) => {
        console.log(resp);
        setRequisicaoEmProgresso(false);
        setMessageConfig((prev) => ({
          ...prev,
          msg: resp.data.message,
          type: "success",
        }));

        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
      <HeaderSignInUp type="SignUp" />
      <div className={styles.form_div}>
        <form className={styles.form_styled} onSubmit={handleSubmit}>
          <label>
            <p>Nome de Usuário:</p>
            <input
              type="text"
              onChange={(e) =>
                setSignUpValues((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </label>
          <label>
            <p>E-mail:</p>
            <input
              type="text"
              onChange={(e) =>
                setSignUpValues((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </label>

          <label>
            <p>Senha:</p>
            <input
              type="password"
              onChange={(e) =>
                setSignUpValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </label>
          <label>
            <p>Confirmar Senha:</p>
            <input
              type="password"
              onChange={(e) =>
                setSignUpValues((prev) => ({
                  ...prev,
                  confirm_password: e.target.value,
                }))
              }
            />
          </label>
          <Button
            requisicaoEmProgresso={requisicaoEmProgresso}
            msg={"Cadastrar"}
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

export default SignUp;
