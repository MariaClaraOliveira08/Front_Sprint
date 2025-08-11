import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sheets from "../axios/axios";

export default function Auth() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [loading, setLoading] = useState(false);

  // Verifica se já tem token no localStorage para redirecionar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/ListagemSalas");
    }
  }, [navigate]);

  const handleCadastro = async () => {
    setMensagem("");
    setLoading(true);
    try {
      const usuario = {
        nome: nome,
        cpf,
        email,
        senha,
      };

      const response = await sheets.postCadastro(usuario);

      alert(response.data.message || "Cadastro realizado com sucesso!");

      // Se retornar token, guarda
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Redireciona para listagem de salas
      navigate("/ListagemSalas");
    } catch (err) {
      setMensagem("Erro ao cadastrar: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Estilos conforme seu protótipo
  const styles = {
    container: {
      maxWidth: 400,
      width: "90%",
      padding: 20,
      backgroundColor: "#dcdede",
      borderRadius: 8,
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#000",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 4,
      gap: 8,
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 24,
      fontWeight: 400,
      letterSpacing: 0.3,
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      marginBottom: 16,
      borderRadius: 12,
      border: "none",
      backgroundColor: "#9ca8c9",
      color: "#000",
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      width: "50%",
      padding: 12,
      borderRadius: 12,
      border: "none",
      backgroundColor: "#5e758f",
      color: "#fff",
      fontSize: 16,
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#4b5c75",
    },
    footerBar: {
      position: "fixed",
      left: 0,
      right: 0,
      height: 32,
      backgroundColor: "#5e758f",
      bottom: 0,
    },
    headerBar: {
      position: "fixed",
      left: 0,
      right: 0,
      height: 32,
      backgroundColor: "#5e758f",
      top: 0,
    },
    icon: {
      width: 20,
      height: 20,
      fill: "#000",
    },
    mensagem: {
      marginTop: 12,
      color: "red",
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  return (
    <>
      <div style={styles.headerBar} />
      <div style={styles.container}>
        <div style={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={styles.icon}
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z" />
          </svg>
          Glimp
        </div>
        <div style={styles.subtitle}>Grandes Lugares Inspiram Momentos Perfeitos.</div>

        <input
          style={styles.input}
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          disabled={loading}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={loading}
        />

        <button
          style={btnHover && !loading ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onClick={handleCadastro}
          onMouseEnter={() => !loading && setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
      </div>
      <div style={styles.footerBar} />
    </>
  );
}
