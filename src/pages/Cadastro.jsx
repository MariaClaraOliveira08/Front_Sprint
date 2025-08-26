import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Link as MuiLink,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import sheets from "../axios/axios";


export default function Cadastro() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/cadastro");
  }, [navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCadastro = async () => {
    setMensagem("");
    setLoading(true);

    try {
      // Objeto exato que o backend espera
      const usuario = {
        nome: user.nome,
        cpf: user.cpf,
        email: user.email,
        senha: user.senha,
      };

      const response = await sheets.postCadastro(usuario);

      alert(response.data.message || "Cadastro realizado com sucesso!");

      // Se o backend retornar token, salvar
      if (response.data.token) localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (err) {
      setMensagem(
        "Erro ao cadastrar: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "#e5e5e5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          paddingTop: 2,
        }}
      >
        <CssBaseline />

        {/* Logo */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Glimp
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ mt: 0.5, fontSize: 15 }}>
            Grandes Lugares Inspiram Momentos Perfeitos.
          </Typography>
        </Box>

        {/* Formulário */}
        <Box
          component="form"
          sx={{
            width: "90%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleCadastro();
          }}
        >
          <TextField
            fullWidth
            required
            label="Nome"
            name="nome"
            value={user.nome}
            onChange={onChange}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" },
            }}
            InputLabelProps={{ sx: { color: "#000" } }}
            disabled={loading}
          />
          <TextField
            fullWidth
            required
            label="CPF"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" },
            }}
            InputLabelProps={{ sx: { color: "#000" } }}
            disabled={loading}
          />
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            value={user.email}
            onChange={onChange}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" },
            }}
            InputLabelProps={{ sx: { color: "#000" } }}
            disabled={loading}
          />
          <TextField
            fullWidth
            required
            label="Senha"
            name="senha"
            type="password"
            value={user.senha}
            onChange={onChange}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" },
            }}
            InputLabelProps={{ sx: { color: "#000" } }}
            disabled={loading}
          />

          <Typography variant="caption" sx={{ mt: 2, textAlign: "center" }}>
            Já possui cadastro?{" "}
            <MuiLink
              component={Link}
              to="/Login"
              sx={{ fontWeight: "bold", color: "#62798B" }}
            >
              Logar
            </MuiLink>
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          onClick={handleCadastro}
          onMouseEnter={() => !loading && setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          disabled={loading}
          sx={{
            bgcolor: btnHover ? "#4b5c75" : "#69819A",
            color: "#000",
            borderRadius: 2,
            py: 1,
            mt: 2,
            fontWeight: "bold",
            textTransform: "none",
            width: 150,
          }}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>

        {mensagem && (
          <Typography sx={{ mt: 1, color: "red", fontWeight: "bold" }}>
            {mensagem}
          </Typography>
        )}
      </Box>
      
    </>
  );
}