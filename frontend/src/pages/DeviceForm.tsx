import { useEffect, useMemo } from 'react'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

type ElectronicDevice = {
  id?: string;
  name: string;
  serial: number
  macAddress: string;
  type: string;
}

type Props = {
  isEdit?: boolean;
  selectedDevice?: ElectronicDevice;
  submitRef?: React.MutableRefObject<HTMLButtonElement | null>;
};

function DeviceForm({ isEdit = false, selectedDevice, submitRef }: Props) {

  const newDeviceSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    serial: Yup.number().required('Serial é obrigatório'),
    macAddress: Yup.string().required('MAC Address é obrigatório'),
    type: Yup.string().required('Tipo é obrigatório'),
  });

  const defaultValues = useMemo(
    () => ({
      name: selectedDevice?.name || '',
      serial: selectedDevice?.serial || undefined,
      macAddress: selectedDevice?.macAddress || '',
      type: selectedDevice?.type || '',
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
    control,
    setValue,
    setError,
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
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <label htmlFor="name">Nome</label>
      <input {...register('name')} id="name" />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="serial">Serial</label>
      <input {...register('serial')} id="serial" />
      {errors.serial && <p>{errors.serial.message}</p>}

      <label htmlFor="macAddress">MAC Address</label>
      <input {...register('macAddress')} id="macAddress" />
      {errors.macAddress && <p>{errors.macAddress.message}</p>}

      <label htmlFor="type">Tipo</label>
      <select {...register('type')} id="type">
        <option />
        <option value="camera">Camera</option>
        <option value="sensor">Sensor</option>
        <option value="remote_control">Remote Control</option>
      </select>
      {errors.type && <p>{errors.type.message}</p>}

        <button type="submit">Salvar</button>
    </form>
  )
}

export default DeviceForm