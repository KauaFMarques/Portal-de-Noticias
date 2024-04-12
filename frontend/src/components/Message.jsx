import styles from "./Message.module.css";

const Message = ({ msg, type }) => {
  return (
    <>
      {msg && msg.length > 0 && (
        <div className={`${styles.msg_container} ${styles[`message_${type}`]}`}>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
};

export default Message;
