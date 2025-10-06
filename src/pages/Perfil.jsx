import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import HamburgerDrawer from "../components/HamburgerDrawer";
import SuccessDeleteDialog from "../components/SuccessDeleteDialog";
import SuccessUpdateSnackbar from "../components/SuccessUpdateSnackbar";

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
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openUpdateSnackbar, setOpenUpdateSnackbar] = useState(false);

  // Carrega dados do usuário
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
        );
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
    fetchUsuario();
  }, [userId]);

  // Alterar imagem do avatar
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

  // Atualizar dados do perfil
  const handleUpdate = async () => {
    if (user.senha && user.senha !== user.confirmarSenha) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", user.nome);
      formData.append("email", user.email);
      if (user.senha) formData.append("senha", user.senha);
      if (user.imagem) formData.append("imagem", user.imagem);

      await api.put("/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOpenUpdateSnackbar(true);

      setAvatarPreview(
        `${api.defaults.baseURL}user/${userId}/imagem?${Date.now()}`
      );
      setUser((prev) => ({ ...prev, senha: "", confirmarSenha: "", imagem: null }));
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  };

  // Logout confirmado
  const handleConfirmLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");
    sessionStorage.clear();

    setOpenLogoutDialog(false);
    setOpenSnackbar(true);

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  };

  // Exclusão confirmada
  const handleDelete = async () => {
    try {
      await api.deleteUsuario(user.id_usuario);
      setOpenDeleteConfirm(false);
      setOpenDeleteSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
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
      <HamburgerDrawer />

      {/* Cabeçalho com avatar */}
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
            sx={{ backgroundColor: "red", flex: 1 }}
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
            onClick={() => setOpenDeleteConfirm(true)}
          >
            Excluir conta
          </Button>
        </Box>
      </Box>

      {/* MODAL DE LOGOUT */}
      {openLogoutDialog && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.titulo}>Encerrar sessão</h3>
            <p style={styles.texto}>Você realmente deseja sair da sua conta?</p>
            <div style={styles.botoes}>
              <button
                style={styles.botaoCancelar}
                onClick={() => setOpenLogoutDialog(false)}
              >
                Cancelar
              </button>
              <button style={styles.botaoConfirmar} onClick={handleConfirmLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {openDeleteConfirm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.titulo}>Excluir conta</h3>
            <p style={styles.texto}>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
            </p>
            <div style={styles.botoes}>
              <button
                style={styles.botaoCancelar}
                onClick={() => setOpenDeleteConfirm(false)}
              >
                Cancelar
              </button>
              <button style={styles.botaoConfirmar} onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SUCESSO EXCLUSÃO */}
      <SuccessDeleteDialog
        open={openDeleteSuccess}
        onClose={() => setOpenDeleteSuccess(false)}
      />

      {/* SNACKBARS */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Sessão encerrada com sucesso!
        </Alert>
      </Snackbar>

      <SuccessUpdateSnackbar
        open={openUpdateSnackbar}
        onClose={() => setOpenUpdateSnackbar(false)}
      />
    </Box>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    borderRadius: 10,
    width: 350,
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  titulo: { margin: 0, marginBottom: 10, fontSize: 20, fontWeight: "bold", color: "#333" },
  texto: { fontSize: 14, color: "#555", marginBottom: 20 },
  botoes: { display: "flex", justifyContent: "space-between", gap: 15 },
  botaoCancelar: {
    flex: 1,
    padding: "10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
    fontWeight: "bold",
  },
  botaoConfirmar: {
    flex: 1,
    padding: "10px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Perfil;
