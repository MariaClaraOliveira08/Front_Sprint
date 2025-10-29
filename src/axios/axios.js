import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.79:3000/projeto_final/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o token salvo no login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Endpoints
api.postCadastro = (user) => api.post("/user", user);
api.postLogin = (user) => api.post("/login", user);
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
api.postAvaliacao = (data) => api.post("/avaliacao", data);
api.buscarAvaliacoesDoUsuario = () => api.get("/avaliacao");
api.buscarAvaliacoesPorEstabelecimento = (google_place_id) =>
  api.get(`/avaliacao/${google_place_id}`);
api.atualizarAvaliacao = (data) => api.put("/avaliacao", data);
api.deletarAvaliacao = (id_avaliacao) =>
  api.delete(`/avaliacao/${id_avaliacao}`);
api.getFavoritos = () => api.get("/favoritos");
api.deleteFavoritos = () => api.get("/favoritos/${id}");

export default api;