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
api.getUsuarioById = (id) => api.get(`/user/${id}`);
api.putUsuario = (user) =>
  api.put("/user", {
    id: user.id,
    nome: user.nome,
    cpf: user.cpf,
    email: user.email,
    senha: user.senha,
    confirmarSenha: user.confirmarSenha || user.senha, // validação
  });

  api.deleteUsuario = (id) => api.delete(`/user/${id}`);


export default api;
