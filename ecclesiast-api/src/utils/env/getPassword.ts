// Instruments
import { ServerError } from "../errors";

export const getPassword = (): string => {
  const { PASSWORD } = process.env;

  if (!PASSWORD) {
    throw new ServerError("Environment variable PASSWORD should be specified");
  }

  const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(PASSWORD);

  if (!isValid) {
    throw new ServerError(
      "Environment variable PASSWORD should have a minimum eight characters, at least one letter, one number and one special character"
    );
  }

  return PASSWORD;
};
