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
import sheets from "../axios/axios";
import ModalVerificarCodigo from "../components/ModalVerificarCodigo";
import CustomSnackbar from "../components/CustomSnackbar";
import PasswordField from "../components/PasswordField";

export default function Cadastro() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [openModal, setOpenModal] = useState(false); // controla o modal

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCadastro = async () => {
    setMensagem("");
    setLoading(true);

    if (user.senha !== user.confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const usuario = {
        nome: user.nome,
        cpf: user.cpf.replace(/\D/g, ""),
        email: user.email,
        senha: user.senha,
        confirmarSenha: user.confirmarSenha,
      };

      const response = await sheets.post("/user", usuario);
      setSnackbar({
        open: true,
        message: response.data.message || "Código enviado para seu e-mail!",
        severity: "success",
      });

      // abre modal de confirmação
      setOpenModal(true);
    } catch (err) {
      console.error("Erro ao cadastrar:", err.response?.data || err.message);
      setSnackbar({
        open: true,
        message:
          "Erro ao cadastrar: " + (err.response?.data?.error || err.message),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#e5e5e5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
      }}
    >
      <CssBaseline />

      <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnOutlinedIcon sx={{ fontSize: 30, color: "#000" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Glimp
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ mt: 0.5, fontSize: 14 }}>
          Grandes Lugares Inspiram Momentos Perfeitos.
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: 450,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
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
        <PasswordField
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
        <PasswordField
          fullWidth
          required
          label="Confirmar Senha"
          name="confirmarSenha"
          type="password"
          value={user.confirmarSenha}
          onChange={onChange}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" },
          }}
          InputLabelProps={{ sx: { color: "#000" } }}
          disabled={loading}
        />

        <Typography variant="caption" sx={{ mt: 1, textAlign: "center" }}>
          Já possui cadastro?{" "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{ fontWeight: "bold", color: "#62798B" }}
          >
            Logar
          </MuiLink>
        </Typography>

        <Button
          type="submit"
          variant="contained"
          onMouseEnter={() => !loading && setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          disabled={loading}
          sx={{
            bgcolor: btnHover ? "#4b5c75" : "#69819A",
            color: "#000",
            borderRadius: 2,
            py: 1,
            mt: 1,
            fontWeight: "bold",
            textTransform: "none",
            width: 150,
            alignSelf: "center",
          }}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>

        {mensagem && (
          <Typography
            sx={{
              mt: 1,
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {mensagem}
          </Typography>
        )}
      </Box>

      {/* Snackbar */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      {/* Modal de verificação */}
      <ModalVerificarCodigo
        open={openModal}
        onClose={() => setOpenModal(false)}
        email={user.email}
        onSuccess={() => navigate("/login")}
      />
    </Box>
  );
}
