type DBConfigType = {
  DB_URL?: string,
  DB_PORT?: string,
  DB_NAME?: string
}

export const getDB = (): DBConfigType => {
  const { DB_URL, DB_PORT, DB_NAME } = process.env;

  return {
    DB_URL,
    DB_PORT,
    DB_NAME
  };
};
