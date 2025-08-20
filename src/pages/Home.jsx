import React from "react";
import { FaUser, FaSignOutAlt, FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.perfil}>
          <FaUser size={24} />
          <span style={styles.text}>Perfil</span>
        </div>
        <nav style={styles.nav}>
          <span style={styles.menuItem}>início</span>
          <span style={styles.menuItem}>Sobre nós</span>
        </nav>
        <div style={styles.logout}>
          <FaSignOutAlt color="red" />
          <span style={styles.sair}>Sair</span>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Header azul topo */}
        <div style={styles.header}></div>

        {/* Conteúdo central */}
        <div style={styles.content}>
          {/* Logo + slogan */}
          <h1 style={styles.logo}>🗺️ Glimp</h1>
          <p style={styles.slogan}>Grandes Lugares Inspiram Momentos Perfeitos.</p>

          {/* Barra de pesquisa */}
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Pesquisar..."
              style={styles.searchInput}
            />
            <FaSearch style={styles.searchIcon} />
          </div>

          {/* Ícones principais */}
          <div style={styles.iconsRow}>
            <div style={styles.iconBox}>🍴</div>
            <div style={styles.iconBox}>🏖️</div>
            <div style={styles.iconBox}>🏬</div>
          </div>

          {/* Lista de locais */}
          <div style={styles.list}>
            <div style={styles.listItem}>
              <div style={styles.listIcon}></div>
              <span>Restaurante Sabor da Casa</span>
            </div>
            <div style={styles.listItem}>
              <div style={{ ...styles.listIcon, backgroundColor: "#94a3b8" }}></div>
              <span>Pizzaria Brazetto</span>
            </div>
            <div style={styles.listItem}>
              <div style={styles.listIcon}></div>
              <span>Loja Do Osmar</span>
            </div>
            <div style={styles.listItem}>
              <div style={{ ...styles.listIcon, backgroundColor: "#94a3b8" }}></div>
              <span>Sesc</span>
            </div>
          </div>
        </div>

        {/* Rodapé azul */}
        <div style={styles.footer}></div>
      </main>
    </div>
  );
}

// Estilos
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    margin: 0,
    fontFamily: "Segoe UI, sans-serif",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#d1d5db",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 10px",
    boxSizing: "border-box",
  },
  perfil: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "40px",
  },
  menuItem: {
    fontSize: "16px",
  },
  logout: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sair: {
    color: "red",
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    height: "40px",
    backgroundColor: "#62798B",
  },
  footer: {
    height: "40px",
    backgroundColor: "#62798B",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
  },
  logo: {
    margin: 0,
    fontSize: "28px",
  },
  slogan: {
    margin: "5px 0 20px",
    fontSize: "12px",
    color: "#333",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "5px 10px",
    width: "60%",
    marginBottom: "20px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "8px",
    fontSize: "14px",
    backgroundColor: "transparent",
  },
  searchIcon: {
    color: "#555",
  },
  iconsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "30px",
  },
  iconBox: {
    width: "80px",
    height: "80px",
    backgroundColor: "#94a3b8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    fontSize: "30px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "80%",
    maxWidth: "500px",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "12px 16px",
    gap: "12px",
    fontSize: "16px",
    fontWeight: "500",
  },
  listIcon: {
    width: "30px",
    height: "30px",
    backgroundColor: "#64748b",
    borderRadius: "6px",
  },
};

