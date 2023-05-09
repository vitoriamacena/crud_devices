import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DeviceList from "./DeviceList";
import { DeviceType, ElectronicDevice } from "../../types/EletronicDevice";
import userEvent from "@testing-library/user-event";
import { fetchDevices, deleteDevice } from "../../services/api";

jest.mock("../../services/api");

const testDevice: ElectronicDevice[] = [
  {
    id: "1",
    name: "Câmera Inteligente",
    serial: 12345,
    macAddress: "00:11:22:33:44:55",
    type: DeviceType.Camera,
  },
  {
    id: "2",
    name: "Sensor Externo",
    serial: 67890,
    macAddress: "66:77:88:99:AA:BB",
    type: DeviceType.Sensor,
  },
];

describe("DeviceList", () => {
  beforeEach(() => {
    (fetchDevices as jest.Mock).mockResolvedValue({ data: testDevice });
    (deleteDevice as jest.Mock).mockResolvedValue({});
  });

  it("should fetch and render devices on the page", async () => {
    render(
      <BrowserRouter>
        <DeviceList />
      </BrowserRouter>
    );

    const camera = await screen.findByText("Câmera Inteligente");
    const sensor = await screen.findByText("Sensor Externo");

    expect(camera).toBeInTheDocument();
    expect(sensor).toBeInTheDocument();
  });

  it("should call deleteDevice with correct id when handleDeleteDevice is called", async () => {
    render(
      <BrowserRouter>
        <DeviceList />
      </BrowserRouter>
    );

    const deleteButton = await screen.findByTestId(`delete-button-1`);
    userEvent.click(deleteButton);

    await waitFor(() => expect(deleteDevice).toHaveBeenCalledTimes(1));
    expect(deleteDevice).toHaveBeenCalledWith("1");
  });
});
