import styles from "./ModalDelete.module.css";

const ModalDelete = ({ opened = true, setOpened, deleteFunction }) => {
  return (
    <>
      <div
        className={`${styles.modal_backdrop} ${opened && styles.show}`}
      ></div>
      <div className={`${styles.modal_container} ${opened && styles.show}`}>
        <div className={styles.modal_text}>
          <h1>Deseja deletar essa notícia?</h1>
          <p>Não será possivel desfazer essa ação.</p>
        </div>

        <div className={styles.div_buttons}>
          <button onClick={() => deleteFunction()}>SIM</button>
          <button onClick={() => setOpened(false)}>NÃO</button>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
