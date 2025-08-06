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
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  }

  return (
    <div
      style={{
        background: "linear-gradient(to right, #6C9BA5, #A8C4D9, #B2DDE3, #BAA8D1, #9CAEC9)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <CssBaseline />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: "#6C9BA5",
              fontWeight: "bold",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            CRIE SUA CONTA
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome"
              type="text"
              name="name"
              value={user.name}
              onChange={onChange}
              style={{ backgroundColor: "#F4F6FA", borderRadius: 5 }}
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
              style={{ backgroundColor: "#F4F6FA", borderRadius: 5 }}
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
              style={{ backgroundColor: "#F4F6FA", borderRadius: 5 }}
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
              style={{ backgroundColor: "#F4F6FA", borderRadius: 5 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                background: "linear-gradient(to right, #A8C4D9, #6C9BA5)",
                color: "white",
                fontWeight: "bold",
                marginTop: 15,
                borderRadius: 10,
              }}
            >
              Cadastrar
            </Button>

            <div style={{ textAlign: "center", marginTop: 10 }}>
              <Link
                to="/"
                style={{
                  color: "#6C9BA5",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                JÁ TEM UMA CONTA? FAÇA LOGIN
              </Link>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Cadastro;
