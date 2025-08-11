import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.70:5000/projeto_final/",
  headers: { accept: "application/json" },
});

// Interceptador para adicionar o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

const sheets = {
  postLogin: (usuario) => api.post("login/", usuario),
  postCadastro: (usuario) => api.post("user/", usuario),
}
export default sheets;