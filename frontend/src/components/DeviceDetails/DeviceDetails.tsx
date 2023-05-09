import { ElectronicDevice } from "../../types/EletronicDevice";
import { Link } from "react-router-dom";
import styles from "./DeviceDetails.module.css";

interface DeviceDetailsProps {
  device: ElectronicDevice;
  handleDeleteDevice: (id: string) => void;
}
function DeviceDetails({ device, handleDeleteDevice }: DeviceDetailsProps) {
  return (
    <tr key={device.id}>
      <td>{device.name}</td>
      <td>{device.serial}</td>
      <td>{device.macAddress}</td>
      <td>{device.type}</td>
      <td>
        <Link to={`/edit/${device.id}`}>
          <button className={styles.editButton}>Editar</button>
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
          data-testid={`delete-button-${device.id}`}
          className={styles.deleteButton}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

export default DeviceDetails;
