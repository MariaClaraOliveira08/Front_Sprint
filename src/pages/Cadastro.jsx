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
import PasswordField from "../components/PasswordField";
import CustomSnackbar from "../components/CustomSnackbar";
import ValidacaoCodigo from "../components/ValidacaoCodigo"; 

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openModal, setOpenModal] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    // TODO: implementar validação real do CPF
    return true;
  };

  const handleCadastro = async () => {
    setLoading(true);

    // Validação local
    if (!user.nome || !user.cpf || !user.email || !user.senha || !user.confirmarSenha) {
      setSnackbar({ open: true, message: "Todos os campos são obrigatórios.", severity: "error" });
      setLoading(false);
      return;
    }

    if (!validarCPF(user.cpf)) {
      setSnackbar({ open: true, message: "CPF inválido.", severity: "error" });
      setLoading(false);
      return;
    }

    if (user.senha !== user.confirmarSenha) {
      setSnackbar({ open: true, message: "As senhas não coincidem.", severity: "error" });
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

      const response = await sheets.postCadastro(usuario);

      if (response.data.success) {
        setSnackbar({ open: true, message: response.data.message || "Cadastro realizado com sucesso!", severity: "success" });
        setOpenModal(true); // ✅ Abre o modal de validação de código
      } else {
        setSnackbar({ open: true, message: response.data.message || "Erro ao cadastrar.", severity: "error" });
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err.response?.data || err.message);
      setSnackbar({ open: true, message: "Erro ao cadastrar: " + (err.response?.data?.error || err.message), severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerificacaoSucesso = () => {
    setOpenModal(false);
    navigate("/login");
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#e5e5e5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 2 }}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnOutlinedIcon sx={{ fontSize: 30, color: "#000" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Glimp</Typography>
        </Box>
        <Typography variant="caption" sx={{ mt: 0.5, fontSize: 14 }}>Grandes Lugares Inspiram Momentos Perfeitos.</Typography>
      </Box>

      <Box component="form" sx={{ width: "100%", maxWidth: 450, display: "flex", flexDirection: "column", gap: 1.5 }}
        onSubmit={(e) => { e.preventDefault(); handleCadastro(); }}
      >
        <TextField fullWidth required label="Nome" name="nome" value={user.nome} onChange={onChange}
          variant="filled" InputProps={{ disableUnderline: true, sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" } }}
          InputLabelProps={{ sx: { color: "#000" } }} disabled={loading}
        />
        <TextField fullWidth required label="CPF" name="cpf" value={user.cpf} onChange={onChange}
          variant="filled" InputProps={{ disableUnderline: true, sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" } }}
          InputLabelProps={{ sx: { color: "#000" } }} disabled={loading}
        />
        <TextField fullWidth required label="Email" name="email" value={user.email} onChange={onChange}
          variant="filled" InputProps={{ disableUnderline: true, sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" } }}
          InputLabelProps={{ sx: { color: "#000" } }} disabled={loading}
        />
        <PasswordField fullWidth required label="Senha" name="senha" value={user.senha} onChange={onChange} variant="filled"
          InputProps={{ disableUnderline: true, sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" } }}
          InputLabelProps={{ sx: { color: "#000" } }} disabled={loading}
        />
        <PasswordField fullWidth required label="Confirmar Senha" name="confirmarSenha" value={user.confirmarSenha} onChange={onChange} variant="filled"
          InputProps={{ disableUnderline: true, sx: { bgcolor: "#A6B4CE", borderRadius: 2, color: "#000" } }}
          InputLabelProps={{ sx: { color: "#000" } }} disabled={loading}
        />

        <Typography variant="caption" sx={{ mt: 1, textAlign: "center" }}>
          Já possui cadastro?{" "}
          <MuiLink component={Link} to="/login" sx={{ fontWeight: "bold", color: "#62798B" }}>Logar</MuiLink>
        </Typography>

        <Button type="submit" variant="contained" disabled={loading}
          onMouseEnter={() => !loading && setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          sx={{ bgcolor: btnHover ? "#4b5c75" : "#69819A", color: "#000", borderRadius: 2, py: 1, mt: 1, fontWeight: "bold", textTransform: "none", width: 150, alignSelf: "center" }}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </Box>

      <CustomSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} />

      <ValidacaoCodigo open={openModal} onClose={() => setOpenModal(false)} email={user.email} onSuccess={handleVerificacaoSucesso} />
    </Box>
  );
}
