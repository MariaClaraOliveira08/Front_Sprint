import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.68:3000/projeto_final",
  headers: {
    accept: "application/json",
  },
});

// Adicionar token no header se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints
api.postCadastro = (user) => api.post("/user", user);
api.postLogin = (user) => api.post("/login", user);
api.buscarEstabelecimentosGoogle = (location, radius, type) =>
  api.get("/buscar", { params: { location, radius, type } });
api.postAvaliacao = (data) => api.post("/avaliacao", data);
api.getFavoritos = () => api.get("/favoritos");
api.deleteFavorito = (id_favorito) => api.delete(`/favoritos/${id_favorito}`);

// ✅ Buscar avaliações de um usuário
api.buscarAvaliacoesDoUsuario = (id_usuario) =>
  api.get(`/avaliacoes/${id_usuario}`);

export default api;
