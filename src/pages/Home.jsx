import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Logoff from "../components/Logoff"; // importa o componente de sair

const Home = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("praia");
  const [lugarSelecionado, setLugarSelecionado] = useState(1);

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
    <div style={styles.container}>
      {/* MENU LATERAL */}
      <div style={styles.sidebar}>
        <div style={styles.perfil}>
          <FaUser size={18} />
          <span style={styles.sidebarText}>Perfil</span>
        </div>
        <div style={styles.menu}>
          <span style={styles.menuItem}>Início</span>
          <span style={styles.menuItem}>Sobre nós</span>
          <div style={styles.menuItemSair}>
            <FiLogOut size={16} />
            <Logoff />
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={styles.main}>
        <h2 style={styles.logo}>Glimp</h2>
        <p style={styles.subtitulo}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </p>

        {/* BARRA DE PESQUISA */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Pesquisar..."
            style={styles.search}
          />
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

// ESTILOS
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Segoe UI, sans-serif",
    overflow: "hidden",
    marginLeft: -55 
  },
  sidebar: {
    width: 180,
    backgroundColor: "#e6e6e6",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 65,
    color: "#333"
  },
  perfil: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: "bold",
    fontSize: 16
  },
  sidebarText: {
    fontSize: 16,
    color: "#222"
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    fontSize: 16
  },
  menuItem: {
    cursor: "pointer",
    color: "#333"
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
    backgroundColor: "#f3f4f6",
    padding: 55,
    overflow: "hidden"
  },
  logo: {
    margin: 0,
    fontSize: 24
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20
  },
  search: {
    width: "60%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14
  },
  categorias: {
    display: "flex",
    gap: 20,
    marginBottom: 30
  },
  botaoCategoria: {
    width: 70,
    height: 70,
    borderRadius: 10,
    border: "none",
    fontSize: 30,
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
    transition: "0.2s"
  }
};

export default Home;
