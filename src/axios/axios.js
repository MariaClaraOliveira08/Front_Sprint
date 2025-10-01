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
api.putUsuario = (user) => {
  const formData = new FormData();
  formData.append("nome", user.nome);
  formData.append("cpf", user.cpf);
  formData.append("email", user.email);
  if (user.senha) formData.append("senha", user.senha);
  if (user.confirmarSenha)
    formData.append("confirmarSenha", user.confirmarSenha);

  if (user.imagem) {
    formData.append("imagem", user.imagem);
  }

  return api.put("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

  api.deleteUsuario = (id) => api.delete(`/user/${id}`);
  api.buscarEstabelecimentosGoogle = (location, radius, type) =>
  api.get("/buscar", {
    params: { location, radius, type },
  });

export default api;
