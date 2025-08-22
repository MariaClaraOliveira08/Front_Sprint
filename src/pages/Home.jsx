import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Logoff from "../components/Logoff"; // importa o componente de sair
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"; // ícone de localização
import SearchIcon from "@mui/icons-material/Search"; // ícone lupa na barra de pesquisa
import { useNavigate } from "react-router-dom";
import { alignItems, justifyContent } from "@mui/system";



const Home = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("praia");
  const [lugarSelecionado, setLugarSelecionado] = useState(1);
  const navigate = useNavigate();


  const categorias = [
    { id: "comida", emoji: "🍽️" },
    { id: "praia", emoji: "🏖️" },
    { id: "shopping", emoji: "🏛️" }
  ];

  const lugares = [
    { id: 1, nome: "Restaurante Sabor da Casa" },
    { id: 2, nome: "Pizzaria Brazetto" },
    { id: 3, nome: "Loja Do Osmar" },
    { id: 4, nome: "Sesc" }
  ];

  return (
    <div style={styles.container}  >
      {/* MENU LATERAL */}
      <div style={styles.sidebar}>
        <div style={styles.perfil}
          onClick={() => navigate("/perfil")}>
          <FaUser size={18} />
          <span style={styles.sidebarText}>Perfil</span>
        </div>

        <div style={styles.line}></div>

        <div style={styles.menuItem}
          onClick={() => navigate("/")}>
          <span style={styles.menuItemInicio}>Início</span>
        </div>

        <div style={styles.menu}>
          <span style={styles.menuItem}>Sobre nós</span>
          <div style={styles.menuItemSair}>
            <FiLogOut size={16} />
            <Logoff />
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={styles.main}>
        <div style={styles.logoWrapper}>
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <h2 style={styles.logo}>{"Glimp"}</h2>

        </div>
        <p style={styles.subtitulo} >

          Grandes Lugares Inspiram Momentos Perfeitos.

        </p>

        {/* BARRA DE PESQUISA */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Pesquisar..."
            style={styles.search}
          />
          <SearchIcon style={styles.searchIcon} />
        </div>


        {/* CATEGORIAS */}
        <div style={styles.categorias}>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSelecionada(cat.id)}
              style={{
                ...styles.botaoCategoria,
                backgroundColor:
                  categoriaSelecionada === cat.id ? "#4a5a87" : "#d9d9d9",
                color: categoriaSelecionada === cat.id ? "#fff" : "#000"
              }}
            >
              {cat.emoji}
            </button>
          ))}
        </div>

        {/* LUGARES */}
        <div style={styles.lugares}>
          {lugares.map((lugar) => (
            <div
              key={lugar.id}
              onClick={() => setLugarSelecionado(lugar.id)}
              style={{
                ...styles.lugar,
                backgroundColor:
                  lugarSelecionado === lugar.id ? "#4a5a87" : "#fff",
                color: lugarSelecionado === lugar.id ? "#fff" : "#000"
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
    height: "100vh",
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    overflow: "hidden",
    marginLeft: -55
  },
  sidebar: {
    width: 200,
    backgroundColor: "#e6e6e6",  // Cor de fundo mais suave
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "60px 10px 10px 40px",  // Ajuste no padding
    color: "#333"
  },
  perfil: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Alinha horizontalmente os itens
    marginLeft: "-25px",  // Mover um pouco para a esquerda
    gap: 10,
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    color: "#4a5a87"  // Cor de destaque para o perfil
  },
  sidebarText: {
    fontSize: 16,
    color: "#4a5a87"
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    fontSize: 16
  },
  menuItem: {
    cursor: "pointer",
    color: "#333",
    gap: 10,
  },
  menuItemInicio: {
  cursor: "pointer",
  color: "#333",
  display: "flex",          // Garante que o conteúdo dentro do botão será alinhado corretamente
  alignItems: "center",     // Alinha verticalmente os itens
  justifyContent: "center", // Alinha horizontalmente os itens
  marginTop: "-220px",       // Ajuste para mover o botão para cima
},

  menuItemSair: {
    color: "red",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: 5,
    cursor: "pointer"
  },
  main: {
    flex: 1,
    backgroundColor: "#f5f5f5",  // Cor de fundo mais suave
    padding: 50,
    overflow: "hidden"
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,  // Espaço entre o ícone e o texto
  },
  logo: {
    margin: 0,
    fontSize: 26,
    color: "#4a5a87"  // Cor da logo mais próxima do protótipo
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 25,  // Borda arredondada da barra de pesquisa
    padding: "0 15px",
    border: "1px solid #ccc",
    marginBottom: 30
  },
  search: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 10px",  // Ajuste no padding
    fontSize: 14,
  },
  searchIcon: {
    color: "#555",
    fontSize: 24,
    cursor: "pointer",
    marginLeft: 8
  },
  categorias: {
    display: "flex",
    justifyContent: "space-between",  // Ajuste no alinhamento das categorias
    gap: 20,
    marginBottom: 30
  },
  botaoCategoria: {
    width: 80,
    height: 80,
    borderRadius: 15,
    border: "none",
    fontSize: 36,  // Ajuste no tamanho do ícone
    backgroundColor: "#f4f4f4",  // Fundo suave
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  lugares: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  },
  lugar: {
    padding: "15px 20px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",  // Fundo suave
    color: "#333",
    transition: "0.2s"
  }
};


export default Home;