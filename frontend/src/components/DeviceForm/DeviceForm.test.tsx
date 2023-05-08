import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import DeviceForm from "./DeviceForm";
import * as api from "../../services/api";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { createDevice, editDevice } from "../../services/api";
import { DeviceType } from "../../types/EletronicDevice";

jest.mock("../../services/api", () => ({
  createDevice: jest.fn(),
  editDevice: jest.fn(),
}));

beforeEach(() => {
  window.alert = jest.fn();
});

describe("DeviceForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the DeviceForm component", () => {
    render(
      <MemoryRouter>
        <DeviceForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/serial/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mac address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo/i)).toBeInTheDocument();
  });

  it("should update input values", () => {
    render(
      <MemoryRouter>
        <DeviceForm />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/nome/i);
    const serialInput = screen.getByLabelText(/serial/i);
    const macAddressInput = screen.getByLabelText(/mac address/i);
    const type = screen.getByLabelText(/tipo/i);

    userEvent.type(nameInput, "Test Device");
    userEvent.type(serialInput, "12345");
    userEvent.type(macAddressInput, "00-B0-D0-63-C2-26");
    userEvent.selectOptions(type, "Sensor");

    expect(nameInput).toHaveValue("Test Device");
    expect(serialInput).toHaveValue("12345");
    expect(macAddressInput).toHaveValue("00-B0-D0-63-C2-26");
    expect(type).toHaveValue("Sensor");
  });

  it("should display error messages when submitting with empty values", async () => {
    render(
      <MemoryRouter>
        <DeviceForm />
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("button", { name: /salvar/i }));

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/serial deve ser um número/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/mac address é obrigatório/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/tipo é obrigatório/i)).toBeInTheDocument();
  });

  it("should call createDevice when isEdit is false and submit the form", async () => {
    render(
      <MemoryRouter>
        <DeviceForm />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/nome/i), "Test Device");
    userEvent.type(screen.getByLabelText(/serial/i), "12345");
    userEvent.type(screen.getByLabelText(/mac address/i), "00-B0-D0-63-C2-26");
    userEvent.selectOptions(screen.getByLabelText(/tipo/i), "Sensor");

    userEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => expect(api.createDevice).toHaveBeenCalledTimes(1));

    expect(api.createDevice).toHaveBeenCalledWith({
      name: "Test Device",
      serial: 12345,
      macAddress: "00-B0-D0-63-C2-26",
      type: "Sensor",
    });
    expect(editDevice).not.toHaveBeenCalled();
  });

  it("should call editDevice when isEdit is true and submit the form", async () => {
    const selectedDevice = {
      id: "1",
      name: "Câmera Inteligente",
      serial: 12345,
      macAddress: "00-B0-D0-63-C2-26",
      type: DeviceType.Camera,
    };

    render(
      <MemoryRouter>
        <DeviceForm isEdit={true} selectedDevice={selectedDevice} />
      </MemoryRouter>
    );

    userEvent.clear(screen.getByLabelText(/nome/i));
    userEvent.type(screen.getByLabelText(/nome/i), "Sensor Externo");
    userEvent.clear(screen.getByLabelText(/serial/i));
    userEvent.type(screen.getByLabelText(/serial/i), "67890");
    userEvent.clear(screen.getByLabelText(/mac address/i));
    userEvent.type(screen.getByLabelText(/mac address/i), "00-B0-D0-63-C2-28");
    userEvent.selectOptions(screen.getByLabelText(/tipo/i), "Sensor");

    userEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => expect(api.editDevice).toHaveBeenCalledTimes(1));

    expect(api.editDevice).toHaveBeenCalledWith(selectedDevice.id, {
      name: "Sensor Externo",
      serial: 67890,
      macAddress: "00-B0-D0-63-C2-28",
      type: "Sensor",
    });
    expect(createDevice).not.toHaveBeenCalled();
  });
});
