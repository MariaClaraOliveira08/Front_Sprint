import React, { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ParkIcon from "@mui/icons-material/Park";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HamburgerDrawer from "../components/HamburgerDrawer";
import DetalhesModal from "../components/Modal";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const navigate = useNavigate();

  const categorias = [
    {
      nome: "Restaurantes",
      type: "restaurant",
      icon: <RestaurantMenuIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        { nome: "Pizzarias", type: "restaurant", keyword: "pizzaria" },
        { nome: "Hamburguerias", type: "restaurant", keyword: "hamburgueria" },
        { nome: "Bares", type: "bar", keyword: "bar" },
      ],
    },
    {
      nome: "Lojas",
      type: "store",
      icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        { nome: "Mercados", type: "supermarket", keyword: "mercado" },
        { nome: "Shopping", type: "shopping_mall", keyword: "shopping" },
        { nome: "Farmácias", type: "pharmacy", keyword: "farmácia" },
      ],
    },
    {
      nome: "Parques",
      type: "park",
      icon: <ParkIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        { nome: "Jardins Botânicos", type: "park", keyword: "jardim botânico" },
        { nome: "Parques Urbanos", type: "park", keyword: "parque urbano" },
      ],
    },
  ];

  const lugaresFiltrados = lugares.filter((lugar) =>
    (lugar.nome || "").toLowerCase().includes(termoBusca.toLowerCase())
  );

  if (loading && categoriaSelecionada)
    return (
      <div style={styles.loadingContainer}>
        <p>Carregando...</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <HamburgerDrawer />
      <div style={styles.main}>
        <div style={styles.logoWrapper}>
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <h2 style={styles.logo}>Glimp</h2>
        </div>
        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        {/* Campo de busca */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Pesquisar..."
            style={styles.search}
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <SearchIcon style={styles.searchIcon} />
        </div>

        {/* Categorias Pai */}
        <div style={styles.categorias}>
          {categorias.map((cat) => (
            <button
              key={cat.nome}
              onClick={() => {
                if (categoriaSelecionada === cat.nome.toLowerCase()) {
                  setCategoriaSelecionada(null);
                  setSubcategoriaSelecionada(null);
                } else {
                  setCategoriaSelecionada(cat.nome.toLowerCase());
                  setSubcategoriaSelecionada(null);
                }
              }}
              style={{
                ...styles.botaoCategoria,
                backgroundColor:
                  categoriaSelecionada === cat.nome.toLowerCase()
                    ? "#4a5a87"
                    : "#d9d9d9",
                color:
                  categoriaSelecionada === cat.nome.toLowerCase()
                    ? "#fff"
                    : "#000",
              }}
            >
              {cat.icon}
            </button>
          ))}
        </div>

        {/* Subcategorias */}
        <AnimatePresence>
          {categoriaSelecionada && (
            <motion.div
              key={categoriaSelecionada}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={styles.subcategoriasWrapper}
            >
              <div style={styles.subcategorias}>
                {categorias
                  .find((cat) => cat.nome.toLowerCase() === categoriaSelecionada)
                  ?.subcategorias.map((sub) => (
                    <button
                      key={sub.nome}
                      onClick={() => {
                        setSubcategoriaSelecionada(sub.type);
                        navigate("/mapa", {
                          state: {
                            categoria: sub.type,
                            keyword: sub.keyword,
                          },
                        });
                      }}
                      style={{
                        ...styles.botaoSubcategoria,
                        backgroundColor:
                          subcategoriaSelecionada === sub.type
                            ? "#4a5a87"
                            : "#d9d9d9",
                        color:
                          subcategoriaSelecionada === sub.type ? "#fff" : "#000",
                      }}
                    >
                      {sub.nome}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    fontFamily: "Segoe UI, sans-serif",
    overflow: "hidden",
  },
  main: { flex: 1, backgroundColor: "#f5f5f5", padding: 50, paddingLeft: 100 },
  logoWrapper: { display: "flex", alignItems: "center", gap: 10 },
  logo: { margin: 0, fontSize: 26, color: "#4a5a87" },
  subtitulo: { fontSize: 14, color: "#777", marginBottom: 20 },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: "0 15px",
    border: "1px solid #ccc",
    marginBottom: 20,
  },
  search: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 10px",
    fontSize: 14,
  },
  searchIcon: { color: "#555", fontSize: 24, cursor: "pointer", marginLeft: 8 },
  categorias: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
    marginRight: 210,
  },
  subcategoriasWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
    marginBottom: 20,
  },
  subcategorias: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  botaoCategoria: {
    width: 80,
    height: 80,
    borderRadius: 15,
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 40,
    fontWeight: "bold",
  },
  botaoSubcategoria: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#777",
  },
};

export default Home;
