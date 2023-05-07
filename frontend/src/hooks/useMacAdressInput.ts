import { useState } from "react";

export const useMacAddressInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
      .toUpperCase()
      .replace(/[^0-9A-F]/g, "")
      .substring(0, 12);

    const formattedValue = rawValue
      .match(/.{1,2}/g)
      ?.join("-")
      .substring(0, 17) || "";

    setValue(formattedValue);
  };

  return {
    value,
    onChange: handleChange,
  };
}