import React, { useEffect, useState } from "react";
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
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // 🔹 você deve salvar o id do user no login

  const [user, setUser] = useState({
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    
  });

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Carregar dados do usuário
  useEffect(() => {
    async function fetchUsuario() {
      try {
        if (!userId) return;
        const response = await api.get(`/user/${userId}`);
        const userData = response.data.user;

        setUser({
          id: userData.id_usuario,
          nome: userData.nome || "",
          cpf: userData.cpf || "",
          email: userData.email || "",
          senha: "",
          
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
    fetchUsuario();
  }, [userId]);

  // Atualizar dados do usuário
  const handleUpdate = async () => {
    try {
      const response = await api.put(`/user`, {
        id: user.id,
        nome: user.nome,
        cpf: user.cpf,
        email: user.email,
        senha: user.senha,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      alert("Erro ao atualizar os dados do usuário.");
    }
  };

  // Confirmar logoff
  const handleConfirmLogout = () => {
    localStorage.clear();
    setOpenLogoutDialog(false);
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // Deletar conta
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir sua conta?"
    );
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/user/${user.id}`);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      alert("Erro ao excluir o usuário.");
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
        pt: 5,
        boxSizing: "border-box",
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          background: "#7681A1",
          position: "relative",
        }}
      >
        <Avatar
          src="/path/to/your/image.jpg"
          alt="Foto do perfil"
          sx={{
            width: 120,
            height: 120,
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid white",
          }}
        />
      </Box>

      {/* Formulário */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        <TextField
          label="Nome"
          name="nome"
          value={user.nome}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="CPF"
          name="cpf"
          value={user.cpf}
          onChange={onChange}
          fullWidth
          disabled
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Senha"
          name="senha"
          type="password"
          value={user.senha}
          onChange={onChange}
          fullWidth
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
