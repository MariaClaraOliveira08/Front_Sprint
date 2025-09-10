import React, { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";
import HamburgerDrawer from "../components/HamburgerDrawer";
import api from "../axios/axios";

const Home = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [lugarSelecionado, setLugarSelecionado] = useState(null);
  const [categorias] = useState([
    { nome: "Restaurante" },
    { nome: "Praia" },
    { nome: "Loja" },
  ]);
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mapeamento de nome da categoria para ícone do MUI
  const iconesCategoria = {
    restaurante: <RestaurantMenuIcon sx={{ fontSize: 40 }} />,
    praia: <BeachAccessIcon sx={{ fontSize: 40 }} />,
    loja: <StorefrontIcon sx={{ fontSize: 40 }} />,
  };

  useEffect(() => {
    const fetchEstabelecimentos = async () => {
      setLoading(true);
      try {
        const response = await api.get("/buscar"); // Corrigido o método de chamada
        console.log(response); // Adicionado para depuração
        setLugares(response?.data || []); // Definindo lugares a partir da resposta
        if (response?.data?.length > 0) {
          setCategoriaSelecionada(response.data[0].categoria.toLowerCase());
        }
      } catch (error) {
        console.error("Erro ao carregar estabelecimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstabelecimentos();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <HamburgerDrawer />

      <div style={styles.main}>
        <div style={styles.logoWrapper}>
          <LocationOnOutlinedIcon
            sx={{ fontSize: 36, color: "#000", alignItems: "center" }}
          />
          <h2 style={styles.logo}>{"Glimp"}</h2>
        </div>
        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        <div style={styles.searchWrapper}>
          <input type="text" placeholder="Pesquisar..." style={styles.search} />
          <SearchIcon style={styles.searchIcon} />
        </div>

        <div style={styles.categorias}>
          {categorias.map((cat) => (
            <button
              key={cat.nome}
              onClick={() => setCategoriaSelecionada(cat.nome.toLowerCase())}
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
              aria-label={cat.nome}
            >
              {iconesCategoria[cat.nome.toLowerCase()] || "❓"}
            </button>
          ))}
        </div>

        {/* Lugares filtrados pela categoria selecionada */}
        <div style={styles.lugares}>
          {lugares
            .filter(
              (lugar) => lugar.categoria.toLowerCase() === categoriaSelecionada
            )
            .map((lugar, index) => (
              <div
                key={lugar.nome || lugar.id || index}
                onClick={() => setLugarSelecionado(index)}
                style={{
                  ...styles.lugar,
                  backgroundColor:
                    lugarSelecionado === index ? "#4a5a87" : "#fff",
                  color: lugarSelecionado === index ? "#fff" : "#000",
                }}
              >
                {lugar.nome}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    overflow: "auto",
  },
  main: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 50,
    paddingLeft: 200,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    margin: 0,
    fontSize: 26,
    color: "#4a5a87",
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: "0 15px",
    border: "1px solid #ccc",
    marginBottom: 40,
  },
  search: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 10px",
    fontSize: 14,
  },
  searchIcon: {
    color: "#555",
    fontSize: 24,
    cursor: "pointer",
    marginLeft: 8,
  },
  categorias: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 30,
    marginRight: 120,
  },
  botaoCategoria: {
    width: 80,
    height: 80,
    borderRadius: 15,
    border: "none",
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 40,
    fontWeight: "bold",
  },
  lugares: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  lugar: {
    padding: "15px 20px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    color: "#333",
    transition: "0.2s",
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
