import { Link } from "react-router-dom";
import global from "../../global.module.css";
import { fetchDevices, deleteDevice } from "../../services/api";
import { useEffect, useState } from "react";
import { ElectronicDevice } from "../../types/EletronicDevice";
import styles from "./DeviceList.module.css";

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
              <tr key={device.id}>
                <td>{device.name}</td>
                <td>{device.serial}</td>
                <td>{device.macAddress}</td>
                <td>{device.type}</td>
                <td>
                  <Link to={`/edit/${device.id}`}>
                    <button className={styles.editButton}>Editar</button>{" "}
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      if (device.id) {
                        handleDeleteDevice(device.id);
                      } else {
                        console.error("Device ID is undefined");
                      }
                    }}
                    className={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeviceList;
