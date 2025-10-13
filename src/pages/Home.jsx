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
        // ALTERAÇÃO AQUI: Subcategoria única com um type que representa "restaurante"
        { nome: "Pizzarias / Hamburguerias", type: "restaurant" }, 
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
        { nome: "Parques Urbanos", type: "park" }, 
      ],
    },
  ];

  // Função para lidar com a abertura do Modal de Detalhes
  const handleOpenDetalhes = (lugar) => {
    const index = lugares.findIndex(item => item.place_id === lugar.place_id);
    if (index !== -1) {
      setEnderecoSelecionado(index);
      setOpenModal(true);
    }
  };

  // Função para lidar com a navegação para o Mapa
  const handleNavigateToMapa = (lugar, typeParaMapa) => {
    navigate("/mapa", {
      state: {
        lugares: lugaresFiltrados,
        lugar: lugar,
        categoriaType: typeParaMapa, 
      },
    });
  };


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

        // Determina o 'type' a ser enviado ao backend
        // O subcategoriaSelecionada agora é o 'type' da subcategoria (ex: "restaurant")
        const typeToSearch = subcategoriaSelecionada || categoria.type; 
        
        // Procura o nome correto da subcategoria (agora "Pizzarias/Hamburguerias")
        const subcategoriaObj = categorias
          .flatMap(c => c.subcategorias)
          .find(sub => sub.type === subcategoriaSelecionada);
        
        const categoryName = subcategoriaObj?.nome || categoria.nome;


        // Requisição API para buscar lugares em Franca/SP
        const response = await api.get("/buscar", {
          params: {
            location: "-20.5381,-47.4008", // Franca/SP
            radius: 17000, // Raio de 17km
            type: typeToSearch, 
            // O categoryName vai para o backend como "Pizzarias/Hamburguerias"
            // O backend (que você não forneceu) deve usar esse nome para 
            // refinar a busca para "pizza" E "hamburguer" DENTRO do type "restaurant"
            categoryName: categoryName 
          },
        });

        // Mapeamento dos dados para o estado 'lugares' (código omitido, é o mesmo)
        const dados = (response.data.estabelecimentos || []).map((item) => ({
          nome: item.nome || "Nome não disponível",
          endereco: item.endereco || "Não disponível",
          categoria: categoryName, 
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

  // Filtra lugares pelo termo de busca (código omitido, é o mesmo)
  const lugaresFiltrados = lugares.filter((lugar) =>
    (lugar.nome || "").toLowerCase().includes(termoBusca.toLowerCase())
  );

  // Determina o 'type' exato para ser passado ao Mapa (código omitido, é o mesmo)
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

        {/* Campo de busca (código omitido, é o mesmo) */}
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

        {/* Categorias Pai (código omitido, é o mesmo) */}
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
                  // Usa o 'type' (agora "restaurant" ou "bar") para a seleção
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
                  {/* Usa o nome do objeto (agora "Pizzarias/Hamburguerias") para o texto */}
                  {sub.nome} 
                </button>
              ))}
          </div>
        )}

        {/* Lista de lugares - NOVO LAYOUT DE AÇÃO (código omitido, é o mesmo) */}
        <div style={styles.lugares}>
          {lugaresFiltrados.map((lugar, index) => (
            <div
              key={lugar.place_id || index}
              style={styles.lugar}
            >
              <div style={styles.lugarNome}>
                {lugar.nome}
              </div>

              <div style={styles.lugarBotoes}>
                {/* Botão para Detalhes (abre Modal) */}
                <button
                  onClick={() => handleOpenDetalhes(lugar)}
                  style={{ ...styles.botaoAcao, backgroundColor: '#5c6c9e' }}
                >
                  Detalhes
                </button>

                {/* Botão para Ver no Mapa (navega) */}
                <button
                  onClick={() => handleNavigateToMapa(lugar, typeParaMapa)}
                  style={{ ...styles.botaoAcao, backgroundColor: '#4a5a87' }}
                >
                  Ver no Mapa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalhes (código omitido, é o mesmo) */}
      <DetalhesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        lugar={
          enderecoSelecionado !== null && enderecoSelecionado < lugares.length 
            ? lugares[enderecoSelecionado] 
            : null
        }
      />
    </div>
  );
};

// ... (Restante do styles é o mesmo)
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
    cursor: "default", // Não é mais clicável como um todo
    backgroundColor: "#fff",
    color: "#333",
    display: 'flex', // NOVO: Container flex para nome e botões
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: "0.2s",
  },
  lugarNome: { // NOVO: Estilo para o nome do lugar
    fontWeight: 'bold',
    fontSize: 16,
    flexGrow: 1, // Permite que o nome use o espaço restante
  },
  lugarBotoes: { // NOVO: Container para os botões de ação
    display: 'flex',
    gap: 10,
  },
  botaoAcao: { // NOVO: Estilo para os botões Detalhes/Mapa
    padding: '8px 15px',
    borderRadius: 8,
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 14,
    minWidth: 100,
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