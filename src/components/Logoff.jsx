// src/components/Logoff.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logoff = () => {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleConfirmar = () => {
    const userId = localStorage.getItem("userId");
    console.log("Usuário desconectado:", userId);

    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");

    // Garante que não fica nada na sessão
    sessionStorage.clear();

    // Fecha modal
    setMostrarModal(false);

    // Redireciona para o login
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* BOTÃO DE SAIR */}
      <span
        onClick={() => setMostrarModal(true)}
        style={{
          color: "red",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer",
        }}
      >
        Sair
      </span>

      {/* MODAL DE CONFIRMAÇÃO */}
      {mostrarModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.titulo}>Encerrar sessão</h3>
            <p style={styles.texto}>Você realmente deseja sair da sua conta?</p>

            <div style={styles.botoes}>
              <button style={styles.botaoCancelar} onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
              <button style={styles.botaoConfirmar} onClick={handleConfirmar}>
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ESTILOS
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    borderRadius: 10,
    width: 350,
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  titulo: {
    margin: 0,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  texto: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  botoes: {
    display: "flex",
    justifyContent: "space-between",
    gap: 15,
  },
  botaoCancelar: {
    flex: 1,
    padding: "10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
    fontWeight: "bold",
  },
  botaoConfirmar: {
    flex: 1,
    padding: "10px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Logoff;

