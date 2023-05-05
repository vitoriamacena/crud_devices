import React from "react";
import DeviceForm from "./DeviceForm";

const EditDevide = () => {
  return (
    <div>
      <h2>Editar dispositivo</h2>
      <DeviceForm isEdit={true} />
    </div>
  );
};

export default EditDevide;
