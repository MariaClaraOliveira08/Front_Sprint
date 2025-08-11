import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import api from "../axios/axios";

function Login() {
  const [user, setUser] = useState({
    cpf: "",
    password: "",
  });

  const navigate = useNavigate();

  //atualiza o estado de um objeto (captura as mudanças)
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    //processa os dados inseridos
    event.preventDefault(); //previne que a página não recarregue
    login();
  };

  async function login() {
    try {
      const response = await api.postLogin(user);

      console.log("Conteúdo do usuário:", response.data.user);

      const userId = response.data.user?.id_usuario;

      if (!userId) {
        console.error("userId não encontrado na resposta.");
        return;
      }

      alert(response.data.message);

      localStorage.setItem("userId", userId);

      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("authenticated", true);

      navigate("/Home");
    } catch (error) {
      console.error(error.response.data.error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Erro na conexão com o servidor.");
      }
    }
  }

  return (
    //estlização da imagem de fundo
    <div
      style={{
        backgroundImage: "url('/Imagem_de_fundo.jpg')",
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
          padding: 20, //espaçamento interno
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)", //sombra ao redor do elemento
        }}
      >
        {/*evita que os navegadores façam ajustes próprios no estilo padrão*/}
        <CssBaseline />

        {/*estilização da box de login*/}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            component="h1" //renderizado como uma tag h1
            variant="h5" //estilo da atg h5
            style={{ color: "#d40000", fontWeight: "bold", marginBottom: 10 }}
          >
            LOGIN
          </Typography>

          {/*estilização do formulario*/}
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
              ENTRAR
            </Button>

            <Button
              component={Link}
              to="/cadastro"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#d40000",
                color: "white",
                fontWeight: "bold",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              CADASTRE-SE
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
