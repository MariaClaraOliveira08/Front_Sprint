import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";

function Perfil() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({
    id_usuario: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    imagem: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // 📌 Carregar dados do usuário
  useEffect(() => {
    async function fetchUsuario() {
      try {
        if (!userId) return;
        const response = await api.getUsuarioById(userId);
        const userData = response.data.user;

        setUser((prev) => ({
          ...prev,
          id_usuario: userData.id_usuario,
          nome: userData.nome || "",
          cpf: userData.cpf || "",
          email: userData.email || "",
        }));

        setAvatarPreview(
          `${api.defaults.baseURL}user/${userId}/imagem?${Date.now()}`
        ); // força refresh da imagem
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
    fetchUsuario();
  }, [userId]);

  // 📤 Upload de nova imagem
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, imagem: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // ✏️ Atualizar dados e imagem
  const handleUpdate = async () => {
    if (user.senha && user.senha !== user.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", user.nome);
      formData.append("email", user.email);
      if (user.senha) formData.append("senha", user.senha);
      if (user.imagem) formData.append("imagem", user.imagem);

      const response = await api.put("/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "Perfil atualizado com sucesso!");

      // Atualiza avatar sem precisar recarregar
      setAvatarPreview(
        `${api.defaults.baseURL}user/${userId}/imagem?${Date.now()}`
      );
      setUser((prev) => ({ ...prev, senha: "", confirmarSenha: "", imagem: null }));
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      alert(
        error.response?.data?.error || "Erro ao atualizar os dados do usuário."
      );
    }
  };

  // 🚪 Confirmar logoff
  const handleConfirmLogout = () => {
    localStorage.clear();
    setOpenLogoutDialog(false);
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // 🗑️ Deletar conta
  const handleDelete = async () => {
    try {
      const response = await api.deleteUsuario(user.id_usuario);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      alert(error.response?.data?.error || "Erro ao excluir o usuário.");
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#E0E0E0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          width: "100%",
          height: 120,
          background: "#7681A1",
          position: "absolute",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "4px solid white",
            overflow: "hidden",
            cursor: "pointer",
            "&:hover .overlay": { opacity: 1 },
          }}
          onClick={handleAvatarClick}
        >
          <Avatar
            src={avatarPreview}
            alt="Foto do perfil"
            sx={{ width: "100%", height: "100%" }}
          />
          {/* Overlay */}
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0,
              transition: "opacity 0.3s",
              color: "white",
            }}
          >
            <CameraAltIcon />
          </Box>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </Box>
      </Box>

      {/* Formulário */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          mt: 25,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
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
        />

        <TextField
          fullWidth
          label="CPF"
          name="cpf"
          value={user.cpf}
          disabled
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
        />

        <PasswordField
          label="Nova Senha"
          name="senha"
          value={user.senha}
          onChange={onChange}
        />

        <PasswordField
          label="Confirmar Nova Senha"
          name="confirmarSenha"
          value={user.confirmarSenha}
          onChange={onChange}
        />

        {/* Botões */}
        <Box sx={{ display: "flex", gap: 2, width: "100%", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ backgroundColor: "#7681A1", flex: 1 }}
            onClick={handleUpdate}
          >
            Editar perfil
          </Button>
          <Button
            variant="contained"
            startIcon={<ExitToAppIcon />}
            sx={{ backgroundColor: "#7681A1", flex: 1 }}
            onClick={() => setOpenLogoutDialog(true)}
          >
            Sair
          </Button>
        </Box>

        <Box sx={{ width: "100%", mt: 3 }}>
          <Button
            variant="outlined"
            sx={{
              color: "red",
              borderColor: "red",
              width: "100%",
              padding: "12px",
              mt: -3,
            }}
            onClick={handleDelete}
          >
            Excluir conta
          </Button>
        </Box>
      </Box>

      {/* Modal de confirmação de logout */}
      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
      >
        <DialogTitle>Encerrar sessão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja encerrar sua sessão?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus>
            Sair
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Sessão encerrada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Perfil;
