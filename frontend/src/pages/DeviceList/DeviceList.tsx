import { Link } from "react-router-dom";
import global from "../../styles/global.module.css";
import { fetchDevices, deleteDevice } from "../../services/api";
import { useEffect, useState } from "react";
import { ElectronicDevice } from "../../types/EletronicDevice";
import styles from "./DeviceList.module.css";
import DeviceDetails from "../../components/DeviceDetails/DeviceDetails";

function DeviceList() {
  const [devices, setDevices] = useState<ElectronicDevice[]>([]);

  const handleFetchDevices = async () => {
    try {
      const response = await fetchDevices();
      setDevices(response.data);
    } catch (err) {
      console.error("Erro ao buscar dispositivos", err);
    }
  };

  useEffect(() => {
    handleFetchDevices();
  }, []);

  const handleDeleteDevice = async (id: string) => {
    try {
      const response = await deleteDevice(id);
      alert("dispositivo excluído com sucesso!");
      handleFetchDevices();
    } catch (err) {
      console.error("Erro ao excluir dispositivo", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link to="/add">
          <button className={global.button}>+ Novo dispositivo</button>
        </Link>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Serial</th>
              <th>MAC Address</th>
              <th>Tipo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <DeviceDetails
                handleDeleteDevice={handleDeleteDevice}
                key={device.id}
                device={device}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeviceList;
