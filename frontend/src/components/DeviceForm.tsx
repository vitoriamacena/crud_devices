import { useEffect, useMemo } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DeviceForm.module.css";
import global from "../global.module.css";
import { ElectronicDevice } from "../types/EletronicDevice";
import { createDevice, editDevice } from "../services/api";

type Props = {
  isEdit?: boolean;
  selectedDevice?: ElectronicDevice | null;
  submitRef?: React.MutableRefObject<HTMLButtonElement | null>;
};

function DeviceForm({ isEdit = false, selectedDevice, submitRef }: Props) {
  const navigate = useNavigate();

  const newDeviceSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    serial: Yup.number()
      .typeError("Serial deve ser um número")
      .required("Serial é obrigatório")
      .min(1, "Serial deve ser maior que 0"),
    macAddress: Yup.string().required("MAC Address é obrigatório"),
    type: Yup.string().required("Tipo é obrigatório"),
  });

  const defaultValues = useMemo(
    () => ({
      name: selectedDevice?.name || "",
      serial: selectedDevice?.serial || undefined,
      macAddress: selectedDevice?.macAddress || "",
      type: selectedDevice?.type || "",
    }),
    [selectedDevice]
  );

  const methods = useForm<ElectronicDevice>({
    resolver: yupResolver(newDeviceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isEdit && selectedDevice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, selectedDevice]);

  const onSubmit = async (data: ElectronicDevice) => {
    try {
      if (!isEdit) {
        await createDevice(data);
        alert("dispositivo criado com sucesso!");
        navigate("/");
      } else {
        if (selectedDevice && selectedDevice.id) {
          await editDevice(selectedDevice.id, data);
          alert("dispositivo atualizado com sucesso!");
          navigate("/");
        } else {
          console.error("selected device ID is undefined");
        }
      }
    } catch (err) {
      alert("Erro ao criar dispositivo.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.container} ${styles.testContainer}`}
    >
      <div className={styles.row}>
        <div className={styles.group}>
          <label htmlFor="name" className={styles.label}>
            Nome
          </label>
          <input {...register("name")} id="name" className={styles.input} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.group}>
          <label htmlFor="serial" className={styles.label}>
            Serial
          </label>
          <input {...register("serial")} id="serial" className={styles.input} />
          {errors.serial && (
            <p className={styles.error}>{errors.serial.message}</p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label htmlFor="macAddress" className={styles.label}>
            MAC Address
          </label>
          <input
            {...register("macAddress")}
            id="macAddress"
            className={styles.input}
          />
          {errors.macAddress && (
            <p className={styles.error}>{errors.macAddress.message}</p>
          )}
        </div>

        <div className={styles.group}>
          <label htmlFor="type" className={styles.label}>
            Tipo
          </label>
          <select className={styles.input} {...register("type")} id="type">
            <option />
            <option value="camera">Câmera</option>
            <option value="sensor">Sensor</option>
            <option value="remote_control">Controle Remoto</option>
          </select>
          {errors.type && <p className={styles.error}>{errors.type.message}</p>}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button type="submit" className={global.button}>
          Salvar
        </button>
      </div>
    </form>
  );
}

export default DeviceForm;
