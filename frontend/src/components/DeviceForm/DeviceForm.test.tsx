import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import DeviceForm from "./DeviceForm";
import * as api from "../../services/api";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../services/api");

beforeEach(() => {
  window.alert = jest.fn();
});

describe("DeviceForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render", () => {
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

  it("should submit the form with correct input values for adding a device", async () => {
    // api.createDevice.mockResolvedValue({});
    // api.editDevice.mockResolvedValue({});
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
  });
});
