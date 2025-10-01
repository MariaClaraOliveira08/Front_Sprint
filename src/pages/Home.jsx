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
        { nome: "Pizzarias", type: "pizzeria" },
        { nome: "Hamburguerias", type: "burger" },
        { nome: "Bares", type: "bar" },
      ],
    },
    {
      nome: "Lojas",
      type: "store",
      icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        { nome: "Mercados", type: "supermarket" },
        { nome: "Shopping", type: "shopping_mall" },
        { nome: "Farmácias", type: "pharmacy" },
      ],
    },
    {
      nome: "Parques",
      type: "park",
      icon: <ParkIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        { nome: "Jardins Botânicos", type: "botanical_garden" },
        { nome: "Parques Urbanos", type: "city_park" },
      ],
    },
  ];

  useEffect(() => {
    const fetchEstabelecimentos = async () => {
      if (!categoriaSelecionada) return;
      setLoading(true);

      try {
        const categoria = categorias.find(
          (cat) => cat.nome.toLowerCase() === categoriaSelecionada
        );
        if (!categoria) return;

        const response = await api.get("/buscar", {
          params: {
            location: "-20.5381,-47.4008",
            radius: 17000,
            type: subcategoriaSelecionada || categoria.type,
          },
        });

        const dados = (response.data.estabelecimentos || []).map((item) => ({
          nome: item.nome || "Nome não disponível",
          endereco: item.endereco || "Não disponível",
          categoria: subcategoriaSelecionada || categoria.nome,
          telefone: item.telefone || "Não disponível",
          horarios: item.horarios || "Não disponível",
          avaliacao: item.avaliacao || "Não disponível",
          place_id: item.place_id,
          lat: item.latitude,
          lng: item.longitude,
          comentarios: item.comentarios || [],
          photos: item.photos || [],
        }));

        setLugares(dados);
      } catch (error) {
        console.error("Erro ao carregar estabelecimentos:", error);
        setLugares([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEstabelecimentos();
  }, [categoriaSelecionada, subcategoriaSelecionada]);

  const lugaresFiltrados = lugares.filter((lugar) =>
    (lugar.nome || "").toLowerCase().includes(termoBusca.toLowerCase())
  );

  if (loading)
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
                setCategoriaSelecionada(cat.nome.toLowerCase());
                setSubcategoriaSelecionada(null);
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
        {categoriaSelecionada && (
          <div style={styles.subcategorias}>
            {categorias
              .find((cat) => cat.nome.toLowerCase() === categoriaSelecionada)
              ?.subcategorias.map((sub) => (
                <button
                  key={sub.nome}
                  onClick={() => setSubcategoriaSelecionada(sub.type)}
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
        )}

        {/* Lista de lugares */}
        <div style={styles.lugares}>
          {lugaresFiltrados.map((lugar, index) => (
            <div
              key={lugar.place_id || index}
              onClick={() => {
                setEnderecoSelecionado(index);
                setOpenModal(true);
                navigate("/mapa", {
                  state: {
                    lugares: lugaresFiltrados,
                    lugar: lugar,
                    categoria: subcategoriaSelecionada || categoriaSelecionada,
                  },
                });
              }}
              style={styles.lugar}
            >
              {lugar.nome}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalhes */}
      <DetalhesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        lugar={
          enderecoSelecionado !== null ? lugares[enderecoSelecionado] : null
        }
      />
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
  main: { flex: 1, backgroundColor: "#f5f5f5", padding: 50, paddingLeft: 200 },
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
    marginBottom: 40,
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
    marginBottom: 20,
    marginRight: 210,
  },
  subcategorias: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
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
  lugares: { display: "flex", flexDirection: "column", gap: 15 },
  lugar: {
    padding: "15px 20px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#fff",
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