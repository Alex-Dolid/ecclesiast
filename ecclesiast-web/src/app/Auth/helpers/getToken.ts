const getToken = (): string | null => localStorage.getItem("token");

export default getToken;
