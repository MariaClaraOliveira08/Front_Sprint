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

  // Definição das Categorias e Subcategorias com seus 'types'
  const categorias = [
    {
      nome: "Restaurantes",
      type: "restaurant", // Tipo principal
      icon: <RestaurantMenuIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        // CORRIGIDO: Usando 'meal_takeaway' (entrega/para viagem) que é oficial e bom para Pizzarias.
        { nome: "Pizzarias", type: "meal_takeaway" }, 
        // CORRIGIDO: Usando 'food' (comida em geral) que é oficial, pois 'burger' não é.
        { nome: "Hamburguerias", type: "food" }, 
        { nome: "Bares", type: "bar" }, // Tipo oficial
      ],
    },
    {
      nome: "Lojas",
      type: "store", // Tipo principal
      icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        { nome: "Mercados", type: "supermarket" }, // Tipo oficial
        { nome: "Shopping", type: "shopping_mall" }, // Tipo oficial
        { nome: "Farmácias", type: "pharmacy" }, // Tipo oficial
      ],
    },
    {
      nome: "Parques",
      type: "park", // Tipo principal
      icon: <ParkIcon sx={{ fontSize: 40 }} />,
      subcategorias: [
        { nome: "Jardins Botânicos", type: "botanical_garden" }, // Tipo oficial
        { nome: "Parques Urbanos", type: "park" }, // Usando o type principal/oficial
      ],
    },
  ];

  // Efeito para buscar estabelecimentos quando a categoria ou subcategoria muda
  useEffect(() => {
    const fetchEstabelecimentos = async () => {
      if (!categoriaSelecionada) return;
      setLoading(true);

      try {
        const categoria = categorias.find(
          (cat) => cat.nome.toLowerCase() === categoriaSelecionada
        );
        if (!categoria) return;

        // Determina o 'type' para a busca: (Prioriza a subcategoria se selecionada)
        const typeToSearch = subcategoriaSelecionada || categoria.type;

        // Requisição API para buscar lugares em Franca/SP (coordenadas -20.5381,-47.4008)
        const response = await api.get("/buscar", {
          params: {
            location: "-20.5381,-47.4008", // Franca/SP
            radius: 17000, // Raio de 17km
            type: typeToSearch, // Tipo específico ou principal
          },
        });

        // Mapeamento dos dados para o estado 'lugares'
        const dados = (response.data.estabelecimentos || []).map((item) => ({
          nome: item.nome || "Nome não disponível",
          endereco: item.endereco || "Não disponível",
          // Usa o nome da subcategoria se selecionada, senão o nome da categoria principal
          categoria: 
            categorias.flatMap(c => c.subcategorias).find(sub => sub.type === subcategoriaSelecionada)?.nome 
            || categoria.nome,
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

  // Filtra lugares pelo termo de busca
  const lugaresFiltrados = lugares.filter((lugar) =>
    (lugar.nome || "").toLowerCase().includes(termoBusca.toLowerCase())
  );

  // Determina o 'type' exato para ser passado ao Mapa
  const categoriaAtiva = categorias.find(
    (cat) => cat.nome.toLowerCase() === categoriaSelecionada
  );
  const typeParaMapa = subcategoriaSelecionada || (categoriaAtiva ? categoriaAtiva.type : null);


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

        {/* Categorias Pai (Ícones) */}
        <div style={styles.categorias}>
          {categorias.map((cat) => (
            <button
              key={cat.nome}
              onClick={() => {
                setCategoriaSelecionada(cat.nome.toLowerCase());
                setSubcategoriaSelecionada(null); // Reseta a subcategoria
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

        {/* Subcategorias (Botões de texto) */}
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
                // ATENÇÃO: Envia 'categoriaType' (string) para o Mapa
                navigate("/mapa", {
                  state: {
                    lugares: lugaresFiltrados,
                    lugar: lugar,
                    categoriaType: typeParaMapa, // Passa o 'type' específico
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
    marginRight: 200,
    
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
  lugares: { 
    display: "flex", 
    flexDirection: "column", 
    gap: 15,
    marginRight: 200,
  },
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