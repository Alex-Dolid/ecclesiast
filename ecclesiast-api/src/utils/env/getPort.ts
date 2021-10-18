// Instruments
import { ServerError } from "../errors";

export const getPort = (): string | number => {
  const { PORT } = process.env;

  if (!PORT) {
    throw new ServerError("Environment variable PORT should be specified");
  }

  const isValid = /^[3-9]{1}[0-9]{3}$/.test(PORT);

  if (!isValid) {
    throw new ServerError(
      "Environment variable PORT should a number and be between 3000 and 9999"
    );
  }

  return PORT;
};
