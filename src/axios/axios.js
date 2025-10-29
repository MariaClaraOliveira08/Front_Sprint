import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.79:3000/projeto_final",
  headers: { accept: "application/json" },
});

// Adicionar token no header se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Endpoints
api.postCadastro = (user) => api.post("/user", user);
api.postLogin = (user) => api.post("/login", user);
api.buscarEstabelecimentosGoogle = (location, radius, type) =>
  api.get("/buscar", { params: { location, radius, type } });

// Avaliações
api.postAvaliacao = (data) => api.post("/avaliacao", data);
api.buscarAvaliacoesDoUsuario = () => api.get("/avaliacao"); 
api.buscarAvaliacoesPorEstabelecimento = (google_place_id) =>
  api.get(`/avaliacao/${google_place_id}`); 
api.deletarAvaliacao = (id_avaliacao) => api.delete(`/avaliacao/${id_avaliacao}`);

//favoritos
api.getFavoritos = () => api.get("/favoritos");
api.deleteFavoritos = () => api.get("/favoritos/${id}");

api.solicitarCodigoCadastro = (dadosCadastro) => api.post("/user", dadosCadastro);
api.confirmarCodigoCadastro = (dadosConfirmacao) => api.post("/user/confirm", dadosConfirmacao);

api.loginUsuario = (credenciais) => api.post("/login", credenciais);
api.solicitarRedefinicaoSenha = (email) => api.post("/user/redefinir", { email });
api.resetarSenha = (dadosReset) => api.post("/user/reset-password", dadosReset);

export default api;
