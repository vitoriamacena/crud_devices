import { Link } from "react-router-dom";
import DeviceForm from "../../components/DeviceForm";
import styles from "../../styles/FormPage.module.css";
import global from "../../global.module.css";
import { useParams } from "react-router-dom";
import { ElectronicDevice } from "../../types/EletronicDevice";
import { useEffect, useState } from "react";
import { fetchDeviceById } from "../../services/api";

const EditDevide = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [selectedDevice, setSelectedDevice] = useState<ElectronicDevice | null>(
    null
  );

  useEffect(() => {
    const handleFetchDeviceById = async () => {
      try {
        const response = await fetchDeviceById(id);
        setSelectedDevice(response.data);
      } catch (err) {
        console.error("Erro ao buscar dispositivo", err);
      }
    };

    handleFetchDeviceById();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <button className={global.button}>Voltar</button>
        </Link>
        <h2>Editar dispositivo - {selectedDevice?.name}</h2>
      </div>

      <DeviceForm selectedDevice={selectedDevice} isEdit={true} />
    </div>
  );
};

export default EditDevide;
