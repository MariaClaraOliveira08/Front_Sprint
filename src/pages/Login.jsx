import React, { useState } from "react";
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
import api from "../axios/axios";
import CustomSnackbar from "../components/CustomSnackbar";

function Login() {
  const [user, setUser] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  // 🔔 Estados do Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleOpenSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.postLogin(user);
      const userId = response.data.user.id_usuario;

      if (!userId) {
        handleOpenSnackbar("Usuário não encontrado.", "error");
        return;
      }

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authenticated", true);

      // ✅ Mostra mensagem antes de navegar
      handleOpenSnackbar("Usuário logado com sucesso!", "success");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      handleOpenSnackbar(
        error.response?.data?.error || "Erro ao fazer login.",
        "error"
      );
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "#e5e5e5" }}>
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: "40px", // padding para não ficar sob o header
          pb: "40px", // padding para não ficar sob o footer
          minHeight: "100vh",
        }}
      >
        {/* Logo e texto */}
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
          onSubmit={handleSubmit}
          sx={{
            width: "90%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            required
            name="email"
            label="Email"
            value={user.email}
            onChange={onChange}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" },
            }}
            InputLabelProps={{ sx: { color: "#000" } }}
          />
          <TextField
            fullWidth
            required
            name="senha"
            label="Senha"
            type="password"
            value={user.senha}
            onChange={onChange}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" },
            }}
            InputLabelProps={{ sx: { color: "#000" } }}
          />

          <Typography variant="caption" sx={{ mt: 2, textAlign: "center" }}>
            Não possui login?{" "}
            <MuiLink
              component={Link}
              to="/cadastro"
              sx={{ fontWeight: "bold", color: "#62798B" }}
            >
              Cadastro
            </MuiLink>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#69819A",
              color: "#000000",
              borderRadius: 2,
              py: 1,
              mt: 1,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Entrar
          </Button>
        </Box>

        {/* Snackbar */}
        <CustomSnackbar
          open={openSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </Box>
  );
}

export default Login;
