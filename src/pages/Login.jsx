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
import PasswordField from "../components/PasswordField";
import RedefinirSenhaModal from "../components/RedefinirSenhaModal"; // 🔹 Modal importado

function Login() {
  const [user, setUser] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  // 🔔 Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // 🔒 Modal redefinição
  const [openRedefinirModal, setOpenRedefinirModal] = useState(false);

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

      handleOpenSnackbar("Usuário logado com sucesso!", "success");
      setTimeout(() => navigate("/home"), 1500);
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
          pt: "40px",
          pb: "40px",
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

          <PasswordField
            label="Senha"
            name="senha"
            value={user.senha}
            onChange={onChange}
          />

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

          {/* 🔹 Esqueceu senha (agora acima do "Não possui login?") */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 1 }}
          >
            <MuiLink
              sx={{ color: "#62798B", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setOpenRedefinirModal(true)}
            >
              Esqueceu sua senha?
            </MuiLink>
          </Typography>

          <Typography variant="caption" sx={{ mt: 1, textAlign: "center" }}>
            Não possui login?{" "}
            <MuiLink
              component={Link}
              to="/cadastro"
              sx={{ fontWeight: "bold", color: "#62798B" }}
            >
              Cadastro
            </MuiLink>
          </Typography>
        </Box>

        {/* Snackbar */}
        <CustomSnackbar
          open={openSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />

        {/* 🧩 Modal redefinir senha */}
        <RedefinirSenhaModal
          open={openRedefinirModal}
          onClose={() => setOpenRedefinirModal(false)}
          onSuccess={() =>
            handleOpenSnackbar("Senha alterada com sucesso!", "success")
          }
        />
      </Box>
    </Box>
  );
}

export default Login;
