import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";
import ModalExcluirFavorito from "../components/ModalExcluirFavorito"; // ✅ novo modal

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [favoritoSelecionado, setFavoritoSelecionado] = useState(null);

  // 🔹 Buscar favoritos do usuário logado
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await api.get("/favoritos");
        setFavoritos(response.data.favoritos || []);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };
    fetchFavoritos();
  }, []);

  // 🔹 Abrir modal de confirmação
  const confirmarRemocao = (favorito) => {
    setFavoritoSelecionado(favorito);
    setModalAberto(true);
  };

  // 🔹 Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setFavoritoSelecionado(null);
  };

  // 🔹 Callback após exclusão
  const handleExclusaoSucesso = (idRemovido) => {
    setFavoritos(favoritos.filter((f) => f.id_favorito !== idRemovido));
  };

  // 🔹 Filtrar favoritos pelo nome
  const favoritosFiltrados = favoritos.filter((f) =>
    f.nome_estabelecimento?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      {/* Menu lateral */}
      <HamburgerDrawer />

      {/* Conteúdo principal */}
      <div style={styles.container}>
        {/* Cabeçalho */}
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <h2 style={styles.logoText}>Glimp</h2>
        </header>

        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        {/* Campo de busca */}
        <div style={styles.searchBox}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Buscar local favorito..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* Lista de favoritos */}
        <div style={styles.listaFavoritos}>
          {favoritosFiltrados.length === 0 ? (
            <p style={{ color: "#666" }}>Nenhum favorito encontrado.</p>
          ) : (
            favoritosFiltrados.map((f) => (
              <div key={f.id_favorito} style={styles.card}>
                <div style={styles.infoContainer}>
                  <span style={styles.nome}>{f.nome_estabelecimento}</span>
                  <span style={styles.endereco}>{f.endereco}</span>
                </div>
                <button
                  style={styles.deleteButton}
                  onClick={() => confirmarRemocao(f)}
                >
                  <DeleteOutlineIcon sx={{ color: "#d11a2a" }} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Ícone decorativo */}
        <div style={styles.topHeart}>
          <FavoriteIcon sx={{ fontSize: 36, color: "#d11a2a" }} />
        </div>
      </div>

      {/* ✅ Modal de confirmação */}
      <ModalExcluirFavorito
        open={modalAberto}
        onClose={fecharModal}
        favorito={favoritoSelecionado}
        onSuccess={handleExclusaoSucesso}
      />
    </div>
  );
}

export default Favoritos;

// ========================
// 🎨 Estilos padronizados
// ========================
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  topHeart: { position: "absolute", top: 50, right: 30, zIndex: 10 },

  container: {
    flex: 1,
    padding: 50,
    paddingLeft: 200,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logoText: {
    margin: 0,
    fontSize: 26,
    color: "#4a5a87",
    fontWeight: 700,
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: "0 15px",
    border: "1px solid #ccc",
    marginBottom: 40,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 10px",
    fontSize: 14,
  },

  listaFavoritos: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginRight: 200,
    overflowY: "auto",
    maxHeight: "70vh",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  },
  infoContainer: { display: "flex", flexDirection: "column", gap: 6, flex: 1 },
  nome: { fontWeight: 700, fontSize: 18, color: "#000" },
  endereco: { fontSize: 16, color: "#555" },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    top: 10,
    right: 10,
  },
};
