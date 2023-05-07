import { useEffect, useMemo } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./DeviceForm.module.css";
import global from "../../styles/global.module.css";
import { DeviceType, ElectronicDevice } from "../../types/EletronicDevice";
import { createDevice, editDevice } from "../../services/api";
import { useMacAddressInput } from "../../hooks/useMacAdressInput";

type Props = {
  isEdit?: boolean;
  selectedDevice?: ElectronicDevice | null;
  submitRef?: React.MutableRefObject<HTMLButtonElement | null>;
};

function DeviceForm({ isEdit = false, selectedDevice, submitRef }: Props) {
  const navigate = useNavigate();
  const macAddressInput = useMacAddressInput("");

  const newDeviceSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    serial: Yup.number()
      .required("Serial é obrigatório")
      .typeError("Serial deve ser um número"),
    macAddress: Yup.string().required("MAC Address é obrigatório"),
    type: Yup.string()
    .oneOf(Object.values(DeviceType), "Tipo inválido")
    .required("Tipo é obrigatório"),
  });

  const defaultValues = useMemo(
    () => ({
      name: selectedDevice?.name || "",
      serial: selectedDevice?.serial || undefined,
      macAddress: selectedDevice?.macAddress || "",
      type: selectedDevice?.type || undefined,
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
      alert(
        isEdit ? "Erro ao editar dispositivo." : "Erro ao criar dispositivo."
      );
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
          {errors.name && (
            <span className={`${styles.error} ${styles.helperText}`}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div className={styles.group}>
          <label htmlFor="serial" className={styles.label}>
            Serial
          </label>
          <input {...register("serial")} id="serial" className={styles.input} />

          {errors.serial ? (
            <span className={`${styles.error} ${styles.helperText}`}>
              {errors.serial.message}
            </span>
          ) : (
            <span className={styles.helperText}>Somente números *</span>
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
            {...macAddressInput}
            id="macAddress"
            className={styles.input}
          />
          {errors.macAddress && (
            <span className={`${styles.error} ${styles.helperText}`}>
              {errors.macAddress.message}
            </span>
          )}
        </div>

        <div className={styles.group}>
          <label htmlFor="type" className={styles.label}>
            Tipo
          </label>
          <select className={styles.input} {...register("type")} id="type">
            <option />
            <option value="Câmera">Câmera</option>
            <option value="Sensor">Sensor</option>
            <option value="Controle Remoto">Controle Remoto</option>
          </select>
          {errors.type && (
            <span className={`${styles.error} ${styles.helperText}`}>
              {errors.type.message}
            </span>
          )}
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
