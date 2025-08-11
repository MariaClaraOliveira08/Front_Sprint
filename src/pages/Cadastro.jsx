import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import api from "../axios/axios";

function Cadastro() {
  const [user, setUser] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Atualizar estado (captura mudanças)
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };

  async function cadastro() {
    try {
      const response = await api.postCadastro(user);
      console.log(response);
      alert(response.data.message);
      navigate("/"); // Cadastro bem-sucedido, navega para login
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Erro ao cadastrar");
    }
  }

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >

      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 10,
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 2,
        }}
      >
        <CssBaseline />

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            component="h1"
            variant="h5"
            style={{ color: "#d40000", fontWeight: "bold", marginBottom: 10 }}
          >
            CRIE SUA CONTA
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome"
              type="text"
              name="name"
              value={user.name}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="CPF"
              type="text"
              name="cpf"
              value={user.cpf}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="E-mail"
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              style={{ backgroundColor: "#f9f9f9", borderRadius: 5 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#d40000",
                color: "white",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Cadastrar
            </Button>

            <Box textAlign="center" mt={2}>
              <Link to="/" style={{ color: "red", textDecoration: "none", fontWeight: "bold" }}>
                JÁ TEM UMA CONTA? FAÇA LOGIN
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Cadastro;
