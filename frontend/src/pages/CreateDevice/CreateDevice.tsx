import DeviceForm from "../../components/DeviceForm/DeviceForm";
import global from "../../styles/global.module.css";
import styles from "../../styles/FormPage.module.css";
import { Link } from "react-router-dom";

function CreateDevice() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <button className={global.button}>
            Voltar
          </button>
        </Link>
        <h2>Criar novo dispositivo</h2>
      </div>
      <DeviceForm />
    </div>
  );
}

export default CreateDevice;
