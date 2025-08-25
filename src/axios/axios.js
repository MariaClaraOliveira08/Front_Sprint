import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.68:3000/projeto_final/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 🔴 Importante
  }
  return config;
});

// Endpoints
api.postCadastro = (user) => api.post("/user", user);
api.postLogin = (user) => api.post("/login", user);
//api.getbuscarEstabelecimento = () => api.get("/buscar");


export default api;
